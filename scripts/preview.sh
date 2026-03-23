#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${1:-4173}"

if [ ! -d node_modules ]; then
  echo "[preview] node_modules not found. Running setup first..."
  bash scripts/setup.sh
fi

if [ ! -d dist ]; then
  echo "[preview] dist/ not found. Building first..."
  bash scripts/build.sh
fi

echo "[preview] Starting preview server on 0.0.0.0:${PORT}"
npm run preview -- --host 0.0.0.0 --port "$PORT"
