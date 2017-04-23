Param([string]$path,[string]$entry)
$ErrorActionPreference = "Stop"
if (!$path) { $path = './node_modules'; }
$DIR=((Get-ChildItem $entry).Directory.FullName)
$fullpath=Resolve-Path $path
$current_prefs=Get-MpPreference
$paths=$current_prefs.ExclusionPath
$is_excluded=$paths -Contains $fullpath.Path

if (!$is_excluded) {
	$title = "Add Windows Defender Exclusion - $fullpath"
	$message = "Are you sure you want to add this path to your windows defender exclusion list?`nYou may be prompted to permit administrative access."
	$yes = New-Object System.Management.Automation.Host.ChoiceDescription "&Yes", "Add the folder to windows defenders list of exclusions"
	$no = New-Object System.Management.Automation.Host.ChoiceDescription "&No", "Do nothing"
	$options = [System.Management.Automation.Host.ChoiceDescription[]]($yes, $no)
	$result = $host.ui.PromptForChoice($title, $message, $options, 0) 
	if ($result -eq 0)
	{
		$ps1path='"' + ("$DIR\undefender-admin.ps1" -replace '"', '`"') + '"'
		$fullpath='"' + ($fullpath -replace '"', '`"') + '"'
		$proc=(Start-Process Powershell -WindowStyle Hidden -Verb runAs -ArgumentList "-File", $ps1path, $fullpath -PassThru -Wait)
		if (!($proc.ExitCode -eq 0)) {
			Write-Error "Exclusion could not be added!"
		}
	}
}
