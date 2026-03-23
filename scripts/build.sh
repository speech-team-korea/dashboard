#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -d node_modules ]; then
  echo "[build] node_modules not found. Running setup first..."
  bash scripts/setup.sh
fi

echo "[build] Building production bundle..."
npm run build
echo "[build] Done. Output: dist/"
