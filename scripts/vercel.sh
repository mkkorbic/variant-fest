#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
exec "$PROJECT_DIR/.tools/node/bin/node" "$PROJECT_DIR/node_modules/vercel/dist/index.js" "$@"
