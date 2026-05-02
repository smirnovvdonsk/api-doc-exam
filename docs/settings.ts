///////////////////////////////////////////////////////////////////////////////////////////////
// ОБЩЕЕ:
///////////////////////////////////////////////////////////////////////////////////////////////
/** Название ПО (на главной, в левом верхнем углу, в названии вкладки браузера) */
export const PRODUCT_NAME: string = 'Название ПО'
/** Подпись под названием на главной */
export const PRODUCT_DESCRIPTION: string = 'Документация'
/** Глобальный основной язык. По его правилам будут расставляться переносы слов. */
export const LANG: string = 'ru-RU'
/** Различные строки в интерфейсе */
export const lastUpdatedText: string = 'Последнее изменение'
export const prev: string = 'Пред.'
export const next: string = 'След.'
export const backToHome: string = 'Вернуться на главную'
export const notFound: Array<string> = ['Ой, здесь ничего нет.']
export const search: string = 'Поиск'

///////////////////////////////////////////////////////////////////////////////////////////////
// ЛОГОТИПЫ:
//////////// (пути к файлам отсчитываются от `docs/public`)
///////////////////////////////////////////////////////////////////////////////////////////////
export const LOGO_NAVBAR: string = 'images/logo/logo.svg' // маленький в левом верхнем углу
export const LOGO_NAVBAR_DARK: string = LOGO_NAVBAR // то же для тёмного режима
export const LOGO_LARGE_ON_HOMEPAGE: string = LOGO_NAVBAR // большой на главной странице
export const LOGO_LARGE_ON_HOMEPAGE_DARK: string = LOGO_LARGE_ON_HOMEPAGE // то же для тёмного режима
export const LOGO_FAVICON: string = LOGO_NAVBAR // favicon
export const LOGO_FAVICON_DARK: string = LOGO_FAVICON // favicon для тёмного режима

///////////////////////////////////////////////////////////////////////////////////////////////
// ГЛАВНАЯ СТРАНИЦА:
///////////////////////////////////////////////////////////////////////////////////////////////
export const HOMEPAGE_TITLE: string = 'Главная' // на вкладке браузера и на автоматических ссылках
export const HOMEPAGE_FEATURES:
  | Array<{
      title: string
      details: string
    }>
  | undefined = [
  {
    title: 'Супер фича',
    details: 'У нас есть полезная фича, которая будет очень полезна.',
  },
  {
    title: 'Мега фича',
    details:
      'Эта фича изменит ваши представления о том, как нужно делать дела. С ней вы наделаете таких дел, которые ещё никто не делал.',
  },
  { title: 'Киллер фича', details: 'С ней вы забудете о конкурирующих продуктах.' },
]
export const HOMEPAGE_FOOTER: string | undefined = '© 2026 Название правообладателя/разработчика'
export const HOMEPAGE_ADDITIONAL_MARKDOWN_CONTENT: string | undefined = undefined

///////////////////////////////////////////////////////////////////////////////////////////////
// КОРНЕВЫЕ РАЗДЕЛЫ::
///////////////////////////////////////////////////////////////////////////////////////////////
export const PART_NAME_USER: string = 'Читать'
export const PART_NAME_ADMIN: string = 'Администратору'
export const PART_NAME_DEVELOPER: string = 'Разработчику'
