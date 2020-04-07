'use strict'

import {setDebug, I18n} from './i18n'

const createI18n = m => new I18n(m)
const init = createI18n

const debug = setDebug

export {init, createI18n, debug }
