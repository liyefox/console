/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import moment from 'moment-mini'
import { locale } from '@kube-design/components'
import get from 'lodash/get'
import cookie from 'utils/cookie'
import { lazy, getBrowserLang } from 'utils'

const getLocales = {
  tc: lazy(() => import(/* webpackChunkName: "locales-tc" */ `../locales/tc`)),
  zh: lazy(() => import(/* webpackChunkName: "locales-zh" */ `../locales/zh`)),
  en: lazy(() => import(/* webpackChunkName: "locales-en" */ `../locales/en`)),
  es: lazy(() => import(/* webpackChunkName: "locales-es" */ `../locales/es`)),
}

const init = async () => {
  const supportLangs = globals.config.supportLangs.map(item => item.value)
  const userLang = get(globals.user, 'lang') || getBrowserLang()
  if (userLang && cookie('lang') !== userLang) {
    cookie('lang', userLang)
  }

  if (userLang === 'zh') {
    moment.locale('zh', {
      relativeTime: {
        s: '1秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年',
        past: '%s前',
        future: '在%s后',
      },
    })
  }

  const locales = {}

  await Promise.all(
    supportLangs.map(async item => {
      const modules = await getLocales[item]()
      locales[item] = Object.assign(
        {},
        ...modules.default.map(_item => _item.default)
      )
    })
  )

  return { locales }
}

const t = (key, options) => {
  let value = key && locale.get(key, options)

  if (options && options.defaultValue && value === key) {
    value = options.defaultValue
  }

  return value
}

t.html = (key, options) => key && locale.getHTML(key, options)

export default {
  init,
  t,
}
