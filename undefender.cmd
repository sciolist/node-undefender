@echo off
where powershell 2>nul >nul || (echo Could not locate powershell executable) && goto end
powershell -File %0\..\undefender-user.ps1 %* -entry %0
:end