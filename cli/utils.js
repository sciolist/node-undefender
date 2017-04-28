#!/usr/bin/env node
"use strict";
const _read = require('read');

function read(opts) {
    return new Promise((res, rej) => {
        _read(opts, function (error, result) {
            if (error) rej(error);
            else res(result);
        });
    });
}

module.exports = {
    read: read
};
