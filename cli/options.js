"use strict";
const chalk = require('chalk');
const path = require('path');

function showHelp(error) {
    const USAGE = require('fs').readFileSync(__dirname + '/usage.txt').toString()
    if (error && error.substr) {
        console.error(chalk.red(error));
    }
    console[error ? 'error' : 'log'](USAGE);
    process.exit(error ? 1 : 0);
}

function readOptions() {
    const opts = {
        pathsRequired: true,
        request: undefined,
        confirm: true,
        paths: [],
        resolvedPaths: []
    };

    for (var i=2; i<process.argv.length; ++i) {
        switch (process.argv[i]) {
            case '--add':
                if (opts.request) showHelp('Cannot use both --add and --' + (opts.request));
                opts.request = 'add';
                break;
            case '--list':
                if (opts.request) showHelp('Cannot use both --list and --' + (opts.request));
                opts.pathsRequired = false;
                opts.request = 'list';
                break;
            case '--remove':
                if (opts.request) showHelp('Cannot use both --remove and --' + (opts.request));
                opts.request = 'remove';
                break;
            case '--remove-all':
                if (opts.request) showHelp('Cannot use both --remove-all and --' + (opts.request));
                opts.pathsRequired = false;
                opts.request = 'remove-all';
                break;

            case '--yes':
            case '-y':
                opts.confirm = false;
                break;
            case '--quiet':
                opts.quiet = true;
                break;
            case '--help':
                showHelp(false);
                break;
            default:
                if (/^-/.test(process.argv[i])) {
                    showHelp("Unrecognized option: " + process.argv[i]);
                }
                let resolvedPath = path.resolve(process.argv[i]);
                if (opts.resolvedPaths.indexOf(resolvedPath) === -1) {
                    opts.paths.push(process.argv[i]);
                    opts.resolvedPaths.push(path.resolve(process.argv[i]));
                }
                break;
        }
    }
    if (!opts.request) opts.request = 'add';
    if (!opts.paths.length && opts.pathsRequired) {
        showHelp('<paths> option is required.');
    } else if (!opts.pathsRequired && opts.paths.length) {
        showHelp(opts.request + ' cannot be used with <paths> option.');
    }

    return opts;
}


module.exports = {
    read: readOptions,
    showHelp: showHelp
}