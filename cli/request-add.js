"use strict";
const exclusions = require('../exclusions');
const read = require('./utils').read;
const chalk = require('chalk');

module.exports = function add(opts) {
    return exclusions.list().then(function (list) {
        let toProcess = [];
        for (let i=0; i<opts.resolvedPaths.length; ++i) {
            let found = list.find(function (ep) {
                return ep.toLowerCase() === String(opts.resolvedPaths[i]).toLowerCase();
            });
            if (!found) toProcess.push(opts.resolvedPaths[i]);
        }
        if (toProcess.length === 0) {
            if (opts.quiet) return;
            console.log('Paths already excluded from Windows Defender');
            return;
        }
        if (opts.confirm === false) {
            return exclusions.add(toProcess);
        }
        const prompt = (
            'Windows Undefender\n' +
            'The following paths will be ' + chalk.red('added') +' to your exclusion list:\n  ' +
            chalk.yellow(toProcess.join('\n  ')) +
            '\n\nAre you sure you want to continue?' +
            ' (' + chalk.yellow('Y') + '/N)'
        );
        return read({ prompt: prompt }).then(function (res) {
            if (!res || /^Y/i.test(res)) return exclusions.add(toProcess);
            else console.log(chalk.red('User cancelled'))
        });
    })
}