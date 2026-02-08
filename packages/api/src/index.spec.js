import { test } from 'node:test'
import assert from 'node:assert'
import { convert } from './index.js'

test('convert should return an object', () => {
  const result = convert({})
  assert.strictEqual(typeof result, 'object')
})
