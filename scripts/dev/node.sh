#!/usr/bin/env bash
#
# Runs Node 24 or newer with the given arguments. The build, tests and checks
# are TypeScript run by Node's built-in type stripping, so there is nothing to
# install, but an older default `node` (e.g. a system Node 18) cannot run them.
#
set -euo pipefail

is_new_enough() {
  "$1" -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 24 ? 0 : 1)' 2>/dev/null
}

if command -v node >/dev/null 2>&1 && is_new_enough node; then
  exec node "$@"
fi

for candidate in "$HOME"/.nvm/versions/node/v*/bin/node /opt/homebrew/bin/node /usr/local/bin/node; do
  if [ -x "$candidate" ] && is_new_enough "$candidate"; then
    exec "$candidate" "$@"
  fi
done

echo "Node 24 or newer is required (found: $(node --version 2>/dev/null || echo none))." >&2
echo "Install it, or run 'nvm use' (this repo has an .nvmrc)." >&2
exit 1
