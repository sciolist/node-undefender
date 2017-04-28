"use strict";
const cp = require('child_process');

function run(path, args)  {
    return new Promise(function (resolve, reject) {
        let stdout = '', stderr = '';
        let proc = cp.spawn(path, args);
        proc.on('error', reject);
        proc.stdout.on('data', function (c) { stdout += c.toString(); });
        proc.stderr.on('data', function (c) { stderr += c.toString(); });
        proc.on('exit', function (code, signal) {
            if (code !== 0) reject(new Error(stderr || ('child process exited with error code ' + code)))
            resolve(stdout);
        })
    });
}

function runPS(cmd) {
    return run('powershell', [
        '-NonInteractive',
        '-ExecutionPolicy', 'Bypass',
        '-Command', cmd
    ]);
}

function runElevatedPS(cmd) {
    const innerPSArguments = ['-ExecutionPolicy', 'Bypass', '-NonInteractive', '-Command', cmd].map(e => quote(e, true));
    const psCommand = ['Exit', '(Start-Process', '-WindowStyle', 'Hidden', '-PassThru', '-Wait', 'powershell', '-Verb', 'runas', '-ArgumentList @(', innerPSArguments.join(','), ')).ExitCode'].join(' ');
    return runPS(psCommand);
}

function quote(s, quote) {
    let r = s.replace(/'/g, "''");
    return quote === true ? "'" + r + "'" : r;
}

module.exports = {
    quote: quote,
    run: runPS,
    runElevated: runElevatedPS
};
