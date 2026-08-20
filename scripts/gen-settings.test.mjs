import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  parseTierTable,
  buildPermissions,
  generateSettings,
  serialize,
} from './gen-settings.mjs';

// A fixture RISK_TIERS.md — one row per permission class plus the two Off-limits
// examples that must also produce Read()/Bash() boundaries. Includes the "four
// tiers" reference table above it to prove the parser only reads Path assignments.
const FIXTURE = `# RISK_TIERS.md

## The four tiers

| Tier | Examples | Handling | \`settings.json\` class |
|------|----------|----------|-----------------------|
| **Low** | UI copy | AI edits directly | \`allow\` |
| **Off-limits** | Secrets | AI must not touch | \`deny\` |

## Path assignments (fill in per project)

| Path / glob | Tier |
|-------------|------|
| \`src/ui/**\` | Low |
| \`src/flows/**\` | Medium |
| \`src/rules/**\` | High |
| \`secrets/**\` | Off-limits |
| \`**/prod_data/**\` | Off-limits |
| \`.env*\` | Off-limits |

> This note line must be ignored by the parser.
`;

test('parseTierTable reads only the Path assignments table', () => {
  const rows = parseTierTable(FIXTURE);
  assert.deepEqual(rows, [
    { glob: 'src/ui/**', tier: 'Low' },
    { glob: 'src/flows/**', tier: 'Medium' },
    { glob: 'src/rules/**', tier: 'High' },
    { glob: 'secrets/**', tier: 'Off-limits' },
    { glob: '**/prod_data/**', tier: 'Off-limits' },
    { glob: '.env*', tier: 'Off-limits' },
  ]);
});

test('buildPermissions maps each tier to its class with Off-limits boundaries', () => {
  const perms = buildPermissions(parseTierTable(FIXTURE));
  assert.deepEqual(perms, {
    allow: [
      'Edit(src/flows/**)',
      'Edit(src/ui/**)',
      'Write(src/flows/**)',
      'Write(src/ui/**)',
    ],
    ask: ['Edit(src/rules/**)', 'Write(src/rules/**)'],
    deny: [
      'Bash(*.env*)',
      'Bash(*prod_data*)',
      'Bash(*secrets*)',
      'Edit(**/prod_data/**)',
      'Edit(.env*)',
      'Edit(secrets/**)',
      'Read(**/prod_data/**)',
      'Read(.env*)',
      'Read(secrets/**)',
      'Write(**/prod_data/**)',
      'Write(.env*)',
      'Write(secrets/**)',
    ],
  });
});

test('unknown tier fails loud, naming the row', () => {
  const bad = `## Path assignments

| Path / glob | Tier |
|-------------|------|
| \`src/x/**\` | Bogus |
`;
  const rows = parseTierTable(bad); // parseTierTable does not validate; buildPermissions does
  assert.throws(() => buildPermissions(rows), /Bogus/);
});

test('missing "## Path assignments" section fails loud', () => {
  assert.throws(() => parseTierTable('# RISK_TIERS.md\n\nno table here\n'), /Path assignments/);
});

test('Off-limits glob with no literal segment emits no Bash boundary (documented silent skip)', () => {
  const md = `## Path assignments

| Path / glob | Tier |
|-------------|------|
| \`**\` | Off-limits |
`;
  const perms = buildPermissions(parseTierTable(md));
  assert.deepEqual(perms.deny, ['Edit(**)', 'Read(**)', 'Write(**)']);
  assert.ok(!perms.deny.some((e) => e.startsWith('Bash(')), 'no Bash entry when token is empty');
});

test('round-trip is idempotent: regenerating from prior output yields no change', () => {
  const first = generateSettings(FIXTURE, { hooks: { PreToolUse: [{ matcher: 'Edit' }] } });
  const reparsed = JSON.parse(serialize(first));
  const second = generateSettings(FIXTURE, reparsed);
  assert.equal(serialize(first), serialize(second));
  assert.deepEqual(second.hooks, first.hooks, 'hooks survive a second round-trip');
});

test('generateSettings preserves other keys and never invents them', () => {
  const existing = { hooks: { PreToolUse: [{ matcher: 'Edit' }] }, extra: 1 };
  const out = generateSettings(FIXTURE, existing);
  assert.deepEqual(out.hooks, existing.hooks, 'hooks preserved');
  assert.equal(out.extra, 1, 'unrelated keys preserved');
  assert.ok(out.permissions.deny.includes('Read(secrets/**)'));
});

test('serialize is idempotent for the same input', () => {
  const a = serialize(generateSettings(FIXTURE, {}));
  const b = serialize(generateSettings(FIXTURE, {}));
  assert.equal(a, b);
  assert.ok(a.endsWith('\n'), 'trailing newline');
});
