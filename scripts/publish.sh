#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$PROJECT_DIR"

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to publish."
  exit 0
fi

MESSAGE=${1:-"Update VARIANT site"}
git add --all
git commit -m "$MESSAGE"
git push origin main
