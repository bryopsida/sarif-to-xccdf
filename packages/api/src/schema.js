import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import xsdValidator from 'xsd-schema-validator'

/** @import {SarifLog, SarifValidateAsync, ValidationResult, XccdfBenchmark, XccdfValidateAsync} from '../types.d.ts' */

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
const schemaUrl = new URL('../schemas/sarif.schema.json', import.meta.url)
const xccdfSchemaPath = fileURLToPath(new URL('../schemas/xccdf.xsd', import.meta.url))

let validatePromise

async function getValidator () {
  if (!validatePromise) {
    validatePromise = (async () => {
      const schemaText = await readFile(schemaUrl, 'utf-8')
      const schema = JSON.parse(schemaText)
      return ajv.compile(schema)
    })()
  }
  return validatePromise
}

function normalizeAjvErrors (errors) {
  if (!errors || errors.length === 0) return ['Schema validation failed']
  return errors.map(err => {
    const path = err.instancePath ? `${err.instancePath} ` : ''
    return `${path}${err.message ?? 'Schema validation failed'}`.trim()
  })
}

function escapeXml (value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildXccdfBenchmarkXml (benchmark) {
  if (!benchmark?.id || !benchmark?.status?.length || !benchmark?.version?.value) {
    throw new Error('XccdfBenchmark must include id, status, and version')
  }

  const attrs = [
    'xmlns="http://checklists.nist.gov/xccdf/1.2"',
    `id="${escapeXml(benchmark.id)}"`
  ]
  if (benchmark.Id) attrs.push(`Id="${escapeXml(benchmark.Id)}"`)
  if (typeof benchmark.resolved === 'boolean') attrs.push(`resolved="${benchmark.resolved ? 'true' : 'false'}"`)
  if (benchmark.style) attrs.push(`style="${escapeXml(benchmark.style)}"`)
  if (benchmark.styleHref) attrs.push(`style-href="${escapeXml(benchmark.styleHref)}"`)
  if (benchmark.lang) attrs.push(`xml:lang="${escapeXml(benchmark.lang)}"`)

  const statusXml = benchmark.status
    .map(s => `<status${s.date ? ` date="${escapeXml(s.date)}"` : ''}>${escapeXml(s.status)}</status>`)
    .join('')

  const versionAttrs = []
  if (benchmark.version.time) versionAttrs.push(`time="${escapeXml(benchmark.version.time)}"`)
  if (benchmark.version.update) versionAttrs.push(`update="${escapeXml(benchmark.version.update)}"`)

  const versionXml = `<version${versionAttrs.length ? ` ${versionAttrs.join(' ')}` : ''}>${escapeXml(benchmark.version.value)}</version>`

  return `<?xml version="1.0" encoding="UTF-8"?><Benchmark ${attrs.join(' ')}>${statusXml}${versionXml}</Benchmark>`
}

function normalizeXsdErrors (error, result) {
  const errors = []
  if (error) errors.push(error instanceof Error ? error.message : String(error))
  if (result?.messages?.length) errors.push(...result.messages.map(msg => String(msg)))
  if (errors.length === 0) errors.push('Schema validation failed')
  return errors
}

async function validateXccdfXml (xml) {
  const result = await xsdValidator.validateXML(xml, xccdfSchemaPath)
  return result
}

/**
 * Validate a SARIF log file path or object against the SARIF 2.1.0 schema.
 * @type {SarifValidateAsync}
 */
export async function validateSarif (input) {
  try {
    /** @type {SarifLog} */
    const data = typeof input === 'string'
      ? JSON.parse(await readFile(input, 'utf-8'))
      : input

    const validate = await getValidator()
    const valid = validate(data)

    /** @type {ValidationResult} */
    const result = valid
      ? { valid: true, errors: null }
      : { valid: false, errors: normalizeAjvErrors(validate.errors) }

    return result
  } catch (error) {
    /** @type {ValidationResult} */
    const result = {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)]
    }
    return result
  }
}

/**
 * Validate an XCCDF file path or Benchmark object against the XCCDF 1.2 schema.
 * @type {XccdfValidateAsync}
 */
export async function validateXccdf (input) {
  try {
    const xml = typeof input === 'string'
      ? (input.trim().startsWith('<') ? input : await readFile(input, 'utf-8'))
      : buildXccdfBenchmarkXml(input)

    return await validateXccdfXml(xml)
  } catch (error) {
    return {
      valid: false,
      errors: [error.message, ...error.messages || []].filter( err => err != null)
    }
  }
}
