"use strict";
const exclusions = require('../exclusions');

module.exports = function list(opts) {
    return exclusions.list().then(function (list) {
        if (list.length) console.log(list.join('\n'));
    })
}
