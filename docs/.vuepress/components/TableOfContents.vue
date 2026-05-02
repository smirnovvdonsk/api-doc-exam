<template>
  <template v-if="props.chapterIndex">
    <ul v-if="aaaList.length">
      <li v-for="{ autoLink, justString, nestedTable, nestedPrefix } in aaaList">
        <span v-if="justString">{{ justString }}</span>
        <AutoLink v-if="autoLink" :config="autoLink" />
        <template v-if="nestedTable">
          <TableOfContents :chapterIndex="nestedTable" :nestedPrefix="nestedPrefix" />
        </template>
      </li>
    </ul>
    <div style="color: crimson" v-else>
      <div>Ошибка компонента TableOfContents!!!</div>
      <div>У этого раздела пустой состав</div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type {
  SidebarGroupOptions,
  SidebarItemOptions,
  SidebarLinkOptions,
} from '@vuepress/theme-default'
import type { ChapterIndex } from '../../types'
import { computed } from 'vue'
import { AutoLink, type AutoLinkConfig, resolveRoute, useRoute } from 'vuepress/client'

interface TableOfContentsProps {
  chapterIndex: ChapterIndex
  /** nestedPrefix - Только для рекурсии здесь. */
  nestedPrefix?: string
}

const props = defineProps<TableOfContentsProps>()

const route = useRoute()

const resultPrefix = computed(() => props.nestedPrefix ?? decodeURI(route.fullPath))

const aaaList = computed<
  Array<{
    justString?: string
    autoLink?: AutoLinkConfig
    nestedTable?: ChapterIndex
    nestedPrefix?: string
  }>
>(() =>
  props.chapterIndex.children.map((child: SidebarItemOptions) => {
    const item = getAutoLinkConfigOrString(child, resultPrefix.value)
    const isJustString = typeof item === 'string'
    const justString = isJustString ? item : undefined
    const autoLink = isJustString ? undefined : item
    if (typeof child === 'string') return { justString, autoLink }
    const { children, text, link, prefix } = <SidebarGroupOptions>child
    if (
      !Array.isArray(children) ||
      typeof text !== 'string' ||
      typeof link !== 'string' ||
      typeof prefix !== 'string'
    )
      return { justString, autoLink }
    const nestedTable = <ChapterIndex>child
    const nestedPrefix = `${resultPrefix.value}${(<ChapterIndex>child).prefix}`
    return { justString, autoLink, nestedTable, nestedPrefix }
  }),
)

function getAutoLinkConfigOrString(
  child: SidebarItemOptions,
  prefix?: string,
): AutoLinkConfig | string {
  if (typeof child === 'string') {
    const link = prefix ? `${prefix}${child}` : child
    const text = resolveRoute(link).meta.title as string
    return { link, text }
  }
  if ((<SidebarGroupOptions>child).children) {
    const { text, link, prefix } = <SidebarGroupOptions>child
    if (!link || !prefix) return text
    return { link: `${resultPrefix.value}${link}`, text }
  }
  const { link, text } = <SidebarLinkOptions>child
  return { link, text }
}
</script>

<style lang="scss" scoped>
@media (width < 720px) {
  // Для мобильных - палец не должен задевать соседние ссылки
  li {
    $margin: 16px;
    margin-top: $margin;
    margin-bottom: $margin;
  }
}
</style>
