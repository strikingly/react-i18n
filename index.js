'use strict'

import Jed from 'jed'
import _ from 'lodash'
import {_gettext, t as _t, tn, tct, setLocale, setDebug} from './src/i18n'

const init = (m) => setLocale(new Jed(m))

const removeNamespace = (message) => {
  if (_.isString(message)) {
    return message.replace(/^[^\s]*\|/, '')
  } else {
    return message
  }
}

const t = (message, values) => removeNamespace(gettext(message, values))

const __ = (message, values={}) => removeNamespace(interpolate(_gettext(message), values))

const interpolate = (message, values={}) =>
  _.template(message, {interpolate: /%\{([\s\S]+?)\}/})(values)

const gettext = (message, values={}) => {
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

const ngettext = tn
const translate = __

export {init, setDebug, translate, removeNamespace, gettext, ngettext, tct, tn, t, __}
