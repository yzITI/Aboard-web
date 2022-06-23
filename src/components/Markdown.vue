<script setup>
import { watch } from 'vue'
import { micromark } from 'micromark'
import { math, mathHtml } from 'micromark-extension-math'
import { draft } from '../plugins/state.js'
let md = $ref(micromark(draft.value, { extensions: [math()], htmlExtensions: [mathHtml()] }))

watch(draft, () => {
  md = micromark(draft.value, { extensions: [math()], htmlExtensions: [mathHtml()] })
})

</script>

<template>
  <div>
    <div class="prose lg:prose-xl" v-html="md"></div>
  </div>
</template>
