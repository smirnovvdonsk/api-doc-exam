<template>
  <div :id="DIV_ID"></div>
</template>

<script setup lang="ts">
import { SwaggerUIBundle } from 'swagger-ui-dist'
import 'swagger-ui/dist/swagger-ui.css'
import { onMounted } from 'vue'
import { useSiteData } from 'vuepress/client'

const DIV_ID = 'swagger-ui'

const siteData = useSiteData()

onMounted(() => {
  SwaggerUIBundle({
    dom_id: `#${DIV_ID}`,
    url: `${siteData.value.base}swagger.yaml`,
  })
})
</script>
