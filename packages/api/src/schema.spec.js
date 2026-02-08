import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { validateSarif, validateXccdf } from './schema.js'

const samplePath = fileURLToPath(new URL('../data/sample-sarif.json', import.meta.url))
const sampleXccdfPath = fileURLToPath(new URL('../data/sample-xccdf-ol9.xml', import.meta.url))

test('validateSarif accepts a valid SARIF file path', async () => {
  const result = await validateSarif(samplePath)
  assert.equal(result.valid, true)
})

test('validateSarif accepts a valid SARIF object', async () => {
  const data = JSON.parse(await readFile(samplePath, 'utf-8'))
  const result = await validateSarif(data)
  assert.equal(result.valid, true)
})

test('validateSarif rejects invalid SARIF data', async () => {
  const invalid = { version: '2.1.0' }
  const result = await validateSarif(invalid)
  assert.equal(result.valid, false)
  assert.ok(Array.isArray(result.errors))
  assert.ok(result.errors.every(err => typeof err === 'string'))
})

test('validateXccdf accepts a valid XCCDF file path', async () => {
  const result = await validateXccdf(sampleXccdfPath)
  assert.equal(result.valid, true)
  assert.equal(result.errors, null)
})

test('validateXccdf accepts a valid XCCDF Benchmark object', async () => {
  const benchmark = {
    id: 'xccdf_org.example_benchmark_demo',
    status: [{ status: 'draft' }],
    version: { value: '1.0' }
  }
  const result = await validateXccdf(benchmark)
  assert.equal(result.valid, true)
  assert.equal(result.errors, null)
})

test('validateXccdf rejects invalid XCCDF XML', async () => {
  const invalidXml = '<Benchmark xmlns="http://checklists.nist.gov/xccdf/1.2" id="invalid"></Benchmark>'
  const result = await validateXccdf(invalidXml)
  assert.equal(result.valid, false)
  assert.ok(Array.isArray(result.errors))
  assert.ok(result.errors.every(err => typeof err === 'string'))
})
