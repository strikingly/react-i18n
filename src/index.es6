'use strict'

import {setDebug, I18n} from './i18n'

const createI18n = m => new I18n(m)

const debug = setDebug

let _i18n = new I18n()

const init = function(options) {
    return _i18n.init(options)
}

const t = function(string, value) {
    return _i18n.t(string, value)
}

const tct = function(...arg) {
    return _i18n.tct(arg[0], arg[1])
}

const tn = function(singular, plural, values) {
    return _i18n.tn(singular, plural, values)
}



export {init, createI18n, debug, t, tct, tn}

export default _i18n
