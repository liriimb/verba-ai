# Start FastAPI (verba-api) + Vite (frontend) in two terminals (Windows)

$Root = Split-Path -Parent $PSScriptRoot
Write-Host "Repo root: $Root"

Write-Host "Starting FastAPI on http://localhost:8000 ..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$Root\verba-api'; .\.venv\Scripts\Activate.ps1; python -m uvicorn app.main:app --reload --port 8000"

Write-Host "Starting Vite on http://localhost:5173 ..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$Root\frontend'; npm run dev"
