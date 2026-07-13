@echo off
set "NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE%" (
  echo Bundled Node was not found. Please install Node.js, then run: node serve-dist.mjs
  exit /b 1
)

"%NODE%" "%~dp0serve-dist.mjs"
