Param([string]$path)
$ErrorActionPreference = "Stop"
Add-MpPreference -ExclusionPath $path
