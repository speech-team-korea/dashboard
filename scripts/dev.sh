#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${1:-5173}"

if [ ! -d node_modules ]; then
  echo "[dev] node_modules not found. Running setup first..."
  bash scripts/setup.sh
fi

echo "[dev] Starting Vite dev server on 0.0.0.0:${PORT}"
npm run dev -- --host 0.0.0.0 --port "$PORT"
