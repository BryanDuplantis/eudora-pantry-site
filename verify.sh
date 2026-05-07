#!/usr/bin/env bash
# Universal project validation script
# Usage: bash verify.sh [--quick]
# --quick: type-check only (~2 sec), used by PostToolUse hooks
# Full mode: complete validation chain, used by /pre_commit

set -euo pipefail

QUICK=false
[[ "${1:-}" == "--quick" ]] && QUICK=true

# ---------------------------------------------------------------------------
# Auto-detect project type
# ---------------------------------------------------------------------------

if [[ -f "appsscript.json" ]]; then
  PROJECT_TYPE="gas"
elif [[ -f "package.json" ]]; then
  PROJECT_TYPE="node"
elif [[ -f "pyproject.toml" ]] || [[ -f "requirements.txt" ]]; then
  PROJECT_TYPE="python"
else
  echo "⚠ Unknown project type — skipping validation"
  exit 0
fi

echo "▸ Project type: $PROJECT_TYPE"

# ---------------------------------------------------------------------------
# Node / TypeScript
# ---------------------------------------------------------------------------

if [[ "$PROJECT_TYPE" == "node" ]]; then
  # Check if TypeScript is available
  if grep -q '"typescript"' package.json 2>/dev/null; then
    echo "▸ Type-checking..."
    npx tsc --noEmit
    echo "✓ Type-check passed"
  fi

  if [[ "$QUICK" == true ]]; then
    exit 0
  fi

  echo "▸ Building..."
  npm run build
  echo "✓ Build passed"

  if command -v npx &>/dev/null && grep -q '"eslint"' package.json 2>/dev/null; then
    echo "▸ Linting..."
    npx eslint . 2>&1 || true
    echo "✓ Lint complete"
  fi
fi

# ---------------------------------------------------------------------------
# Python
# ---------------------------------------------------------------------------

if [[ "$PROJECT_TYPE" == "python" ]]; then
  echo "▸ Syntax-checking Python files..."
  ERRORS=0
  for f in $(git diff --name-only --diff-filter=ACM HEAD 2>/dev/null | grep '\.py$' || find . -name '*.py' -not -path './.venv/*' -not -path './venv/*'); do
    python -m py_compile "$f" 2>&1 || ERRORS=$((ERRORS + 1))
  done
  if [[ $ERRORS -gt 0 ]]; then
    echo "✗ $ERRORS file(s) failed syntax check"
    exit 1
  fi
  echo "✓ Syntax check passed"

  if [[ "$QUICK" == true ]]; then
    exit 0
  fi

  if command -v ruff &>/dev/null; then
    echo "▸ Linting with ruff..."
    ruff check . || true
    echo "✓ Ruff complete"
  fi
fi

# ---------------------------------------------------------------------------
# Google Apps Script
# ---------------------------------------------------------------------------

if [[ "$PROJECT_TYPE" == "gas" ]]; then
  echo "▸ Syntax-checking .gs files..."
  ERRORS=0
  for f in *.gs; do
    node -c "require('fs').readFileSync('$f','utf8')" 2>/dev/null || {
      # Fallback: just check if it's valid-ish JS
      node -e "try { new Function(require('fs').readFileSync('$f','utf8')) } catch(e) { if(e instanceof SyntaxError) { console.error('$f:', e.message); process.exit(1) } }" 2>&1 || ERRORS=$((ERRORS + 1))
    }
  done
  if [[ $ERRORS -gt 0 ]]; then
    echo "✗ $ERRORS file(s) failed syntax check"
    exit 1
  fi
  echo "✓ Syntax check passed"
fi

# ---------------------------------------------------------------------------
# Security check (full mode only)
# ---------------------------------------------------------------------------

if [[ "$QUICK" == false ]] && [[ -f "scripts/security-check.sh" ]]; then
  echo "▸ Running security check..."
  bash scripts/security-check.sh
  echo "✓ Security check passed"
fi

echo "✓ All checks passed"
