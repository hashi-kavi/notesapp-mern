# PowerShell script to test Notes API endpoints
# Replace YOUR_JWT_TOKEN with an actual token obtained from login

$baseUrl = "http://localhost:5000"
$token = "YOUR_JWT_TOKEN_HERE"  # Replace with actual JWT token

Write-Host "Testing Notes API Endpoints" -ForegroundColor Green
Write-Host "================================="

# 1. Register a user (if needed)
Write-Host "`n1. Registering a user..." -ForegroundColor Yellow
$registerBody = @{
    username = "testuser$(Get-Random)"
    password = "Testpass1"
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
Write-Host "Registration successful. User ID: $($registerResponse.userId)"

# 2. Login to get token
Write-Host "`n2. Logging in..." -ForegroundColor Yellow
$loginBody = @{
    username = $registerBody.username.Trim('"')
    password = "Testpass1"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $loginResponse.token
Write-Host "Login successful. Token: $($token.Substring(0,20))..."

# 3. Create a note
Write-Host "`n3. Creating a note..." -ForegroundColor Yellow
$noteBody = @{
    text = "Test note from PowerShell $(Get-Date)"
} | ConvertTo-Json

$createResponse = Invoke-RestMethod -Uri "$baseUrl/api/notes" -Method POST -Headers @{Authorization = "Bearer $token"} -Body $noteBody -ContentType "application/json"
Write-Host "Note created successfully. ID: $($createResponse._id), Text: $($createResponse.text)"

# 4. Get all notes
Write-Host "`n4. Getting all notes..." -ForegroundColor Yellow
$notesResponse = Invoke-RestMethod -Uri "$baseUrl/api/notes" -Method GET -Headers @{Authorization = "Bearer $token"}
Write-Host "Found $($notesResponse.Count) note(s):"
foreach ($note in $notesResponse) {
    Write-Host "  - ID: $($note._id), Text: $($note.text)"
}

# 5. Delete the created note
Write-Host "`n5. Deleting the created note..." -ForegroundColor Yellow
$noteId = $createResponse._id
Invoke-RestMethod -Uri "$baseUrl/api/notes/$noteId" -Method DELETE -Headers @{Authorization = "Bearer $token"}
Write-Host "Note deleted successfully."

# 6. Verify notes list is empty
Write-Host "`n6. Verifying notes list is empty..." -ForegroundColor Yellow
$finalNotesResponse = Invoke-RestMethod -Uri "$baseUrl/api/notes" -Method GET -Headers @{Authorization = "Bearer $token"}
Write-Host "Final notes count: $($finalNotesResponse.Count)"

Write-Host "`n✅ All API tests completed successfully!" -ForegroundColor Green
