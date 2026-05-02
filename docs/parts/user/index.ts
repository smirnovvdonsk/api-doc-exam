import type { RootChapterIndex } from '@/types'

const link = '/parts/user/'

const INDEX: RootChapterIndex = {
  prefix: link,
  link,
  collapsible: true,
  children: ['обзор', 'быстрый_старт', 'авторизация', 'справочник_api'],
}

export default INDEX
