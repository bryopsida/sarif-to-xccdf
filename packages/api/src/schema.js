import { readFile } from 'node:fs/promises'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

/** @import {SarifLog, AjvSchemaValidationResult, SarifValidateAsync} from '../types.d.ts */

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
const schemaUrl = new URL('../schemas/sarif.schema.json', import.meta.url)

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

/**
 * Validate a SARIF log file path or object against the SARIF 2.1.0 schema.
 * @type {SarifValidateAsync}
 */
export async function validateSarif (input) {
  /** @type {SarifLog} */
  const data = typeof input === 'string'
    ? JSON.parse(await readFile(input, 'utf-8'))
    : input

  const validate = await getValidator()
  const valid = validate(data)

  /** @type {AjvSchemaValidationResult} */
  const result = {
    valid: Boolean(valid),
    errors: validate.errors ?? null
  }

  return result
}
