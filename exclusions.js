"use strict";
const PS = require('./powershell');

function list(requestPath) {
    if (process.platform !== 'win32') return [];
    return PS.run('(Get-MpPreference).ExclusionPath').then(function (stdout) {
        return stdout.split(/\r?\n/).filter(v => v);
    });
}

function add(requestPaths) {
    return PS.runElevated(requestPaths.map(function (path) {
        return ['Add-MpPreference', '-ExclusionPath', PS.quote(path, true) + ';'].join(' ');
    }).join(''));
}

function remove(requestPaths) {
    return PS.runElevated(requestPaths.map(function (path) {
        return ['Remove-MpPreference', '-ExclusionPath', PS.quote(path, true) + ';'].join(' ');
    }).join(''));
}

module.exports = {
    list: list,
    add: add,
    remove: remove
}