'use strict'

import Jed from 'jed'
import _ from 'lodash'
import {t as _t, tn, tct, setLocale} from './src/i18n'

let _cache = {}

const init = (m) => setLocale(new Jed(m))

const translate = (message, values) => {
  if (values) {
    return removeNamespace(gettext(message, values))
  } else {
    return _cache[message] || (_cache[message] = removeNamespace(gettext(message)))
  }
}

const removeNamespace = (message) => {
  if (_.isString(message)) {
    return message.replace(/^[^\s]*\|/, '')
  } else {
    return message
  }
}

const interpolate = gettext

const gettext = (message, values = {}) => {
  if (typeof __SERVER_RENDERING__ !== 'undefined') {
    return message
  }
  try {
    return _t(message, values)
  } catch (e) {
    if (process.env.NODE_ENV != 'production') {
      throw e
    }
    if (Bugsnag) {
      Bugsnag.notifyException(e, "I18n.jed")
    }
    return ''
  }
}

const ngettext = (...args) => tn(...args)
const t = translate

export {init, translate, removeNamespace, interpolate, gettext, ngettext, tct, t}
