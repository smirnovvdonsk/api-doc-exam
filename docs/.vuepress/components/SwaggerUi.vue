<template>
  <div :id="DIV_ID"></div>
</template>

<script setup lang="ts">
import { SwaggerUIBundle } from 'swagger-ui-dist'
import 'swagger-ui/dist/swagger-ui.css'
import { onMounted } from 'vue'

const DIV_ID = 'swagger-ui'

onMounted(() => {
  SwaggerUIBundle({
    dom_id: `#${DIV_ID}`,
    url: '/swagger.yaml',
  })
})
</script>
