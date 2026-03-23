#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[setup] Project root: $ROOT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "[setup] Node.js not found."
  if command -v nvm >/dev/null 2>&1; then
    echo "[setup] Installing Node.js LTS with nvm..."
    nvm install --lts
    nvm use --lts
  else
    echo "[setup] Please install Node.js LTS (18+) first: https://nodejs.org"
    exit 1
  fi
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[setup] npm not found. Reinstall Node.js LTS: https://nodejs.org"
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[setup] Node.js version $(node -v) is too old. Need 18+."
  if command -v nvm >/dev/null 2>&1; then
    echo "[setup] Switching to latest LTS via nvm..."
    nvm install --lts
    nvm use --lts
  else
    exit 1
  fi
fi

if [ -f package-lock.json ]; then
  echo "[setup] Installing dependencies with npm ci..."
  npm ci
else
  echo "[setup] Installing dependencies with npm install..."
  npm install
fi

echo "[setup] Done."
