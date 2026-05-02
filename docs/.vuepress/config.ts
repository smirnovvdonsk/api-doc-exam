import Dotenv from 'dotenv'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { createPage, defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from 'vuepress/utils'
import {
  LANG,
  LOGO_FAVICON,
  LOGO_FAVICON_DARK,
  LOGO_LARGE_ON_HOMEPAGE,
  LOGO_LARGE_ON_HOMEPAGE_DARK,
  LOGO_NAVBAR,
  LOGO_NAVBAR_DARK,
  HOMEPAGE_TITLE,
  HOMEPAGE_FEATURES,
  HOMEPAGE_ADDITIONAL_MARKDOWN_CONTENT,
  HOMEPAGE_FOOTER,
  PART_NAME_ADMIN,
  PART_NAME_DEVELOPER,
  PART_NAME_USER,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  backToHome,
  lastUpdatedText,
  next,
  notFound,
  prev,
  search,
} from '../settings'

import type { ChapterIndex } from '../types'
import USER_PART_INDEX from '../parts/user'
import ADMIN_PART_INDEX from '../parts/admin'
import DEVELOPER_PART_INDEX from '../parts/developer'

const mode =
  process.env.NODE_ENV && ['development', 'production'].includes(process.env.NODE_ENV)
    ? <'development' | 'production'>process.env.NODE_ENV
    : 'production'

const { VTRU_BASE = '/', VTRU_HIDE_DEVEL_PART = 'false' } =
  Dotenv.config({ path: `.env.${mode}` }).parsed ?? {}

const hideDeveloperPart: boolean = VTRU_HIDE_DEVEL_PART.toLowerCase() === 'true'

const BASE_REGEX = /^\/([\p{Letter}\p{Number}\-._~!\$&'\(\)\*\+,=;:%@]+\/)?$/u

if (!BASE_REGEX.test(VTRU_BASE)) throw Error('Переменная VTRU_BASE не прошла валидацию')

const DEFAULT_BASE = '/'

/** Базовый URL, на котором будет задеплоен сайт.
 * Он всегда должен начинаться и заканчиваться слэшем.
 *
 * Если сайт задеплоен в корне (`www.qwe.com`), то `const base = '/'`.
 *
 * Если во вложенном пути (`www.qwe.com/asd`), то `const base = '/asd/'`.
 *
 * Сейчас берётся из окружения */
const base: '/' | `/${string}/` = BASE_REGEX.test(VTRU_BASE)
  ? <'/' | `/${string}/`>VTRU_BASE
  : DEFAULT_BASE

/** Вычислить путь к папке, где лежит настоящий файл */
const __dirname = import.meta.dirname || getDirname(import.meta.url)

const HOME_PART_INDEX: ChapterIndex = {
  text: HOMEPAGE_TITLE,
  prefix: '/',
  link: '/',
  collapsible: true,
  children: [
    { ...USER_PART_INDEX, text: PART_NAME_USER },
    // { ...ADMIN_PART_INDEX, text: PART_NAME_ADMIN },
    // ...(hideDeveloperPart ? [] : [{ ...DEVELOPER_PART_INDEX, text: PART_NAME_DEVELOPER }]),
  ],
}

export default defineUserConfig({
  onInitialized: async (app) => {
    const homepage = await createPage(app, {
      path: '/',
      frontmatter: {
        home: true,
        title: HOMEPAGE_TITLE,
        heroImage: `/${LOGO_LARGE_ON_HOMEPAGE}`,
        heroImageDark: `/${LOGO_LARGE_ON_HOMEPAGE_DARK}`,
        actions: [
          { link: 'parts/user/', type: 'primary', text: PART_NAME_USER },
          // { link: 'parts/admin/', type: 'primary', text: PART_NAME_ADMIN },
          // ...(hideDeveloperPart
          //   ? []
          //   : [{ link: 'parts/developer/', type: 'primary', text: PART_NAME_DEVELOPER }]),
        ],
        features: HOMEPAGE_FEATURES,
        footer: HOMEPAGE_FOOTER,
      },
      content: HOMEPAGE_ADDITIONAL_MARKDOWN_CONTENT,
    })
    app.pages.push(homepage)
  },
  title: PRODUCT_NAME,
  description: PRODUCT_DESCRIPTION,
  lang: LANG,
  base,
  head: [
    /** Favicon */
    ['link', { rel: 'icon', href: `${base}${LOGO_FAVICON}` }],
    [
      'link',
      { rel: 'icon', href: `${base}${LOGO_FAVICON}`, media: '(prefers-color-scheme: light)' },
    ],
    [
      'link',
      { rel: 'icon', href: `${base}${LOGO_FAVICON_DARK}`, media: '(prefers-color-scheme: dark)' },
    ],
  ],
  theme: defaultTheme({
    /** Отображать ли список создателей руководства */
    contributors: false,
    logo: `/${LOGO_NAVBAR}`,
    logoDark: `/${LOGO_NAVBAR_DARK}`,
    lastUpdatedText,
    prev,
    next,
    backToHome,
    /** Состав навигационной панели сверху */
    navbar: (<Array<ChapterIndex>>[HOME_PART_INDEX, ...HOME_PART_INDEX.children]).map(
      ({ text, link }) => ({
        text,
        link,
      }),
    ),
    notFound,
    /** Состав боковой панели слева */
    sidebar: HOME_PART_INDEX.children,
  }),
  /** Куда класть билды */
  dest: 'dist',
  /** Папка со статическим содержимым. При деплое её состав копируется как есть в корень деплоя */
  public: './docs/public',
  bundler: viteBundler(),
  /** Порт для dev-сервера */
  port: 3000,
  /** Алиасы путей для использования в javascript внутри markdown */
  alias: {
    '@': path.resolve(__dirname, '../'),
  },
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: search,
        },
      },
      maxSuggestions: 5,
      hotKeys: ['s', '/'],
      isSearchable: (page) => true,
      getExtraFields: (page) => [],
    }),
    backToTopPlugin({
      /** Сколько пикселей надо проскроллить вниз от оначала страницы,
       * чтобы появилась кнопка Back-To-Top.
       * Default 100
       */
      threshold: 2048,
    }),
    markdownImagePlugin({
      figure: true,
      lazyload: true,
      mark: true,
      size: true,
    }),
    /** Этот плагин обеспечит автоматическое добавление в проект vue-компонентов, размещённых в указанной папке */
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    markdownIncludePlugin({
      // options
    }),
    markdownTabPlugin({
      // Enable code tabs
      codeTabs: true,
      // Enable tabs
      tabs: true,
    }),
    markdownMathPlugin({
      type: 'mathjax',
      output: 'chtml',
      chtml: {
        /** Масштаб шрифта формул, чтобы исправить несоответствие
         * размерных сеток основного шрифта и шрифта формул.
         */
        scale: 1.25,
        /** Какой шрифт использовать, если в формуле попадётся
         * символ, отсутствующий в шрифтах формул
         */
        unknownFamily: 'Noto Sans',
      },
    }),
  ],
})
