import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

export default async function run ({ github, context }) {
  const p = 'audit.json'
  if (!existsSync(p)) return

  const data = JSON.parse(await readFile(p, 'utf8'))
  const advisories = data.vulnerabilities || {}
  const annotations = []

  for (const [name, v] of Object.entries(advisories)) {
    const via = (v.via || [])
      .map(x => (typeof x === 'string' ? x : x.title))
      .filter(Boolean)
      .join('; ')
    const severity = v.severity || 'moderate'
    const msg = `${name}@${v.range || 'unknown'} (${severity}) ${via}`.trim()
    annotations.push({
      path: 'package.json',
      start_line: 1,
      end_line: 1,
      annotation_level: 'warning',
      message: msg
    })
  }

  if (annotations.length === 0) return

  await github.rest.checks.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    name: 'npm audit',
    head_sha: context.sha,
    status: 'completed',
    conclusion: 'neutral',
    output: {
      title: 'npm audit (prod deps only)',
      summary: `${annotations.length} findings`,
      annotations: annotations.slice(0, 50)
    }
  })
}
