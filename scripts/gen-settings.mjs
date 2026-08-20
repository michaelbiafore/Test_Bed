#!/usr/bin/env node
// Generates the `permissions` block of .claude/settings.json from the
// "Path assignments" table in RISK_TIERS.md — the single source of truth for
// risk tiers (PLAN_ZZ_Upgrade_01.md, item A1). Do not hand-edit settings.json;
// edit RISK_TIERS.md and re-run `npm run gen:settings`.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const TIER_CLASS = {
  Low: 'allow',
  Medium: 'allow',
  High: 'ask',
  'Off-limits': 'deny',
};

/** Extract the rows of the "## Path assignments" table as {glob, tier}. */
export function parseTierTable(markdown) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => /^##\s+Path assignments/i.test(l));
  if (start === -1) throw new Error('RISK_TIERS.md: no "## Path assignments" section found');

  const rows = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^##\s/.test(line)) break; // next section ends the table
    if (!line.startsWith('|')) continue; // skip prose, notes (>), blanks
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 2) continue;
    const glob = cells[0].replace(/`/g, '').trim();
    const tier = cells[1].replace(/\*/g, '').trim();
    if (!glob || /^-+$/.test(glob)) continue; // separator row
    if (/^path/i.test(glob)) continue; // header row
    rows.push({ glob, tier });
  }
  return rows;
}

/**
 * Derive a Bash keyword token from a glob: the first path segment that has a literal,
 * with only the `*` wildcards stripped (dots/underscores kept). Keeping the dot makes
 * `.env*` -> `.env` (a specific boundary) instead of `env` (which would over-block
 * printenv / conda env / npm run env). NOTE: `Bash(*token*)` is best-effort
 * defense-in-depth only -- the real read/edit boundary is the Read()/Edit()/Write()
 * denies, which the native permission engine matches exactly.
 */
function bashToken(glob) {
  for (const seg of glob.split('/')) {
    const token = seg.replace(/\*/g, '').toLowerCase();
    if (/[a-z0-9]/.test(token)) return token;
  }
  return '';
}

/** Map tier rows to {allow, ask, deny} permission arrays (sorted, deduped). */
export function buildPermissions(rows) {
  const sets = { allow: new Set(), ask: new Set(), deny: new Set() };
  for (const { glob, tier } of rows) {
    const cls = TIER_CLASS[tier];
    if (!cls) throw new Error(`RISK_TIERS.md: unknown tier "${tier}" for path "${glob}"`);
    sets[cls].add(`Edit(${glob})`);
    sets[cls].add(`Write(${glob})`);
    if (cls === 'deny') {
      sets.deny.add(`Read(${glob})`);
      const token = bashToken(glob);
      if (token) sets.deny.add(`Bash(*${token}*)`);
    }
  }
  return {
    allow: [...sets.allow].sort(),
    ask: [...sets.ask].sort(),
    deny: [...sets.deny].sort(),
  };
}

/** Merge a freshly generated permissions block into existing settings, preserving other keys. */
export function generateSettings(markdown, existing = {}) {
  return { ...existing, permissions: buildPermissions(parseTierTable(markdown)) };
}

/** Stable JSON serialization with a trailing newline (idempotent). */
export function serialize(settings) {
  return JSON.stringify(settings, null, 2) + '\n';
}

// --- CLI: read RISK_TIERS.md, merge into .claude/settings.json, write it back ---
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
  const tiersPath = join(repoRoot, 'RISK_TIERS.md');
  const settingsPath = join(repoRoot, '.claude', 'settings.json');
  const markdown = readFileSync(tiersPath, 'utf8');
  const existing = existsSync(settingsPath) ? JSON.parse(readFileSync(settingsPath, 'utf8')) : {};
  writeFileSync(settingsPath, serialize(generateSettings(markdown, existing)));
  console.log(`Wrote ${settingsPath} from ${tiersPath}`);
}
