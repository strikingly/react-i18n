'use strict'

import Jed from 'jed'
import {setLocale, setDebug, tct, tn, t} from './i18n'

const init = m => setLocale(new Jed(m))
const debug = setDebug

export {init, debug, tct, tn, t}
