'use strict'

require("babel-register")

var Jed = require('jed')
var i18n = require('./src/i18n.es6')

exports.init = function (m) {
	return i18n.setLocale(new Jed(m))
}

exports.debug = i18n.setDebug
exports.tct = i18n.tct
exports.tn = i18n.tn
exports.t = i18n.t
