"use strict";
const exclusions = require('../exclusions');
const read = require('./utils').read;
const chalk = require('chalk');

module.exports = function remove(opts) {
    return exclusions.list().then(function (list) {
        let toProcess = [];
        for (let i=0; i<opts.resolvedPaths.length; ++i) {
            let found = list.find(function (ep) {
                return ep.toLowerCase() === String(opts.resolvedPaths[i]).toLowerCase();
            });
            if (found) toProcess.push(opts.resolvedPaths[i]);
        }
        if (toProcess.length === 0) {
            if (opts.quiet) return;
            console.log('No paths were found to remove');
            return;
        }
        if (opts.confirm === false) {
            return exclusions.remove(toProcess);
        }
        const prompt = (
            'Windows Undefender\n' +
            'The following paths will be ' + chalk.red('removed') +' from your exclusion list:\n  ' +
            chalk.yellow(toProcess.join('\n  ')) +
            '\n\nAre you sure you want to continue?' +
            ' (' + chalk.yellow('Y') + '/N)'
        );
        return read({ prompt: prompt }).then(function (res) {
            if (!res || /^Y/i.test(res)) return exclusions.remove(toProcess);
            else console.log(chalk.red('User cancelled'))
        });
    })
}
