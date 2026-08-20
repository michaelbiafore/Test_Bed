#!/usr/bin/env bash
# warn-if-audit-path.sh — SECONDARY, WSL/Git-Bash-only fallback for warn-if-audit-path.ps1.
# The Windows host runs the .ps1; this exists only for contributors on a POSIX shell.
# Same contract: stop-and-confirm on ask-tier paths, fail OPEN (exit 0) on any error.
set -euo pipefail

raw="$(cat || true)"
[ -z "$raw" ] && exit 0

# Requires jq; if absent, fail open rather than block.
command -v jq >/dev/null 2>&1 || exit 0

path="$(printf '%s' "$raw" | jq -r '.tool_input.file_path // .tool_input.path // empty')"
[ -z "$path" ] && exit 0

settings="$(dirname "$0")/../.claude/settings.json"
[ -f "$settings" ] || exit 0

norm="${path//\\//}"
while IFS= read -r glob; do
  [ -z "$glob" ] && continue
  # Translate glob -> regex: ** -> .*, * -> [^/]*
  # KNOWN LIMITATION (see warn-if-audit-path.ps1 and design.md D5; hardened in Phase 4):
  # unanchored match, leading `**/` treated as required, path not relativized. This .sh
  # is a secondary WSL fallback and its sed-based escaping may not be byte-identical to
  # the .ps1; the exact boundary is the native settings.json denies, not this hook.
  rx="$(printf '%s' "$glob" | sed -e 's/[.[\*^$()+?{|]/\\&/g')"
  rx="${rx//\\\*\\\*/.*}"
  rx="${rx//\\\*/[^/]*}"
  if printf '%s' "$norm" | grep -Eq "$rx"; then
    reason="Edit to '$path' matches ask-tier pattern '$glob' (High tier in RISK_TIERS.md). Confirm before proceeding."
    printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"%s"}}\n' "$reason"
    exit 0
  fi
done < <(jq -r '.permissions.ask[]? | capture("\\((?<g>.+)\\)$"; "") | .g' "$settings" 2>/dev/null | sort -u)

exit 0
