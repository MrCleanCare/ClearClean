# Stop on error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting deployment process..."

# Install dependencies
Write-Host "📦 Installing dependencies..."
npm ci

# Run linting
Write-Host "🔍 Running linter..."
npm run lint

# Build the application
Write-Host "🏗️ Building the application..."
npm run build

# Generate sitemap
Write-Host "🗺️ Generating sitemap..."
npm run postbuild

# Set environment variables
Write-Host "⚙️ Setting environment variables..."
$env:PORT = "3001"

# Kill any process using port 3001 (if exists)
Write-Host "🔄 Checking if port 3001 is in use..."
$processId = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($processId) {
    Write-Host "Port 3001 is in use. Stopping process..."
    Stop-Process -Id $processId -Force
}

# Start the application
Write-Host "🌟 Starting the application..."
npm run start 