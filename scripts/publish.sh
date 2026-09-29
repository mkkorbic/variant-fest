#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$PROJECT_DIR"

if [ -n "$(git status --porcelain)" ]; then
  MESSAGE=${1:-"Update VARIANT site"}
  git add --all
  git commit -m "$MESSAGE"
fi

git push origin main
