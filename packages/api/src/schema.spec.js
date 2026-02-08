import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { validateSarif } from './schema.js'

const samplePath = fileURLToPath(new URL('../data/sample-sarif.json', import.meta.url))

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
})
