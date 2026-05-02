import type { SidebarGroupOptions } from '@vuepress/theme-default'

export type ChapterIndex = SidebarGroupOptions &
  Required<Pick<SidebarGroupOptions, 'link' | 'prefix'>>

export type RootChapterIndex = Omit<ChapterIndex, 'text'>
