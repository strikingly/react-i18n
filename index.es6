'use strict'

import Jed from 'jed'
import _ from 'lodash'
import {setLocale, setDebug, tct, tn, t} from './src/i18n'

const init = (m) => setLocale(new Jed(m))
const debug = setDebug

export {init, debug, tct, tn, t}
