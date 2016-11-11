'use strict'

import {setLocale, setDebug, tct, tn, t} from './i18n'

const init = m => setLocale(m)
const debug = setDebug

export {init, debug, tct, tn, t}
