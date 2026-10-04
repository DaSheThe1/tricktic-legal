#!/usr/bin/env bash
#
# The local gate, run before every push by .githooks/pre-push and by
# `pnpm check`: docs/ must match a fresh build, and every test must pass.
#
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."

scripts/dev/node.sh src/build.ts --check
scripts/dev/node.sh --test "test/**/*.test.ts"
