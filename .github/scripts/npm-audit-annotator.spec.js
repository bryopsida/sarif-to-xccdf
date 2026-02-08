import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import run from './npm-audit-annotator.js'

test('creates a check run with annotations from audit.json', async () => {
  const cwd = process.cwd()
  const dir = await mkdtemp(join(tmpdir(), 'sarif-audit-'))
  process.chdir(dir)

  const audit = {
    vulnerabilities: {
      lodash: {
        name: 'lodash',
        severity: 'high',
        range: '<4.17.21',
        via: [{ title: 'Prototype Pollution' }]
      }
    }
  }

  await writeFile('audit.json', JSON.stringify(audit), 'utf8')

  let called = false
  const github = {
    rest: {
      checks: {
        create: async (payload) => {
          called = true
          assert.equal(payload.name, 'npm audit')
          assert.equal(payload.output.annotations.length, 1)
          assert.match(payload.output.annotations[0].message, /lodash/)
        }
      }
    }
  }

  const context = { repo: { owner: 'o', repo: 'r' }, sha: 'abc' }

  await run({ github, context })

  assert.equal(called, true)

  process.chdir(cwd)
})
