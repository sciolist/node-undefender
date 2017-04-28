"use strict";
const exclusions = require('../exclusions');
const remove = require('./request-remove');

module.exports = function removeAll(opts) {
    return exclusions.list().then(function (list) {
        opts.paths = list;
        opts.resolvedPaths = list;
        return remove(opts);
    })
}
