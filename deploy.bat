@echo off
echo 🚀 Starting deployment process...

:: Install dependencies
echo 📦 Installing dependencies...
call npm ci
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

:: Run linting
echo 🔍 Running linter...
call npm run lint
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

:: Build the application
echo 🏗️ Building the application...
call npm run build
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

:: Generate sitemap
echo 🗺️ Generating sitemap...
call npm run postbuild
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

:: Set environment variables
echo ⚙️ Setting environment variables...
set PORT=3000

:: Start the application
echo 🌟 Starting the application...
call npm run start
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL% 