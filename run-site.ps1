$node = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if (-not (Test-Path $node)) {
  Write-Host "Bundled Node was not found. Please install Node.js, then run: node serve-dist.mjs"
  exit 1
}

& $node "$PSScriptRoot\serve-dist.mjs"
