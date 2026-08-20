# warn-if-audit-path.ps1 — Claude Code PreToolUse guard (PLAN_ZZ_Upgrade_01.md, item R4).
# Stops and asks for human confirmation before an edit lands on an `ask`-tier / audit path.
# The ask-tier globs are read from the GENERATED .claude/settings.json, so RISK_TIERS.md stays
# the single source of truth (design.md D5). Fails OPEN (exit 0, no output) on any missing or
# malformed input, so it can never wedge the session — other gates remain responsible.

try {
  $raw = [Console]::In.ReadToEnd()
  if ([string]::IsNullOrWhiteSpace($raw)) { exit 0 }

  $payload = $raw | ConvertFrom-Json
  $path = $payload.tool_input.file_path
  if (-not $path) { $path = $payload.tool_input.path }
  if (-not $path) { exit 0 }

  $settingsPath = Join-Path $PSScriptRoot '..\.claude\settings.json'
  if (-not (Test-Path $settingsPath)) { exit 0 }
  $settings = Get-Content -Raw $settingsPath | ConvertFrom-Json
  $askEntries = $settings.permissions.ask
  if (-not $askEntries) { exit 0 }

  # Pull the glob out of each Edit(...)/Write(...) ask entry.
  $globs = @()
  foreach ($e in $askEntries) {
    if ($e -match '^\w+\((.+)\)$') { $globs += $Matches[1] }
  }
  $globs = $globs | Select-Object -Unique

  $norm = ($path -replace '\\', '/')
  foreach ($g in $globs) {
    # Translate the glob to a regex: ** -> .*, * -> [^/]*, everything else literal.
    # KNOWN LIMITATION (hardened + tested in upgrade Phase 4, when this hook becomes a
    # real gate): the match is unanchored, a leading `**/` is treated as a required
    # directory (so a root-level `**/*.audit.*` file is missed), and $path is not
    # relativized to the repo root. Today this is an inert ask-tier convenience; the
    # exact boundary is the native settings.json Read/Edit/Write denies. See design.md D5.
    $rx = [Regex]::Escape($g) -replace '\\\*\\\*', '.*' -replace '\\\*', '[^/]*'
    if ($norm -match $rx) {
      $reason = "Edit to '$path' matches ask-tier pattern '$g' (High tier in RISK_TIERS.md). " +
                "Confirm on the actual diff before proceeding -- no auto-merge."
      $out = @{
        hookSpecificOutput = @{
          hookEventName            = 'PreToolUse'
          permissionDecision       = 'ask'
          permissionDecisionReason = $reason
        }
      } | ConvertTo-Json -Compress -Depth 5
      Write-Output $out
      exit 0
    }
  }
  exit 0
}
catch {
  exit 0  # fail open — never block on our own error
}
