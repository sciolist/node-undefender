#!/usr/bin/env node
"use strict";
const chalk = require('chalk');

if (process.platform !== 'win32') {
    console.error(chalk.red('Unsupported platform'));
    process.exit(1);
}

try {
    const options = require('./options');
    let opts = options.read();
    require('./request-' + (opts.request) + '.js')(opts).catch(handleError);
} catch(ex) { handleError(ex); }

function handleError(ex) {
    if (ex) console.error(chalk.red(ex));
    process.exit(1);
};
