# Start FastAPI (verba-api) + Vite (frontend) in two terminals
Write-Host "Starting FastAPI on http://localhost:8000 ..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd verba-api; .\.venv\Scripts\Activate.ps1; python -m uvicorn app.main:app --reload --port 8000'

Write-Host "Starting Vite on http://localhost:5173 ..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; npm run dev'
