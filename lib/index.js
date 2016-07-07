'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jed = require('jed');

var _jed2 = _interopRequireDefault(_jed);

var _i18n = require('./i18n');

var init = function init(m) {
  return (0, _i18n.setLocale)(new _jed2['default'](m));
};
var debug = _i18n.setDebug;

exports.init = init;
exports.debug = debug;
exports.tct = _i18n.tct;
exports.tn = _i18n.tn;
exports.t = _i18n.t;