import { say } from 'helpers'
import values from 'values'
import i18n from 'locales'

import css from './styles.scss'

say(i18n[values.locale].hello)
