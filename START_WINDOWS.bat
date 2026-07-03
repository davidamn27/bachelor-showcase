@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:5503/index.html"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server 5503
) else (
  python -m http.server 5503
)
