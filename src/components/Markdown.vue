<script setup>
import { defineProps, watch } from 'vue'
import { micromark } from 'micromark'
import { math, mathHtml } from 'micromark-extension-math'
import { draft, receiver } from '../plugins/state.js'
const { type } = defineProps(['type'])
let md = $ref(micromark(type == 'draft' ? draft.value : receiver.value, { extensions: [math()], htmlExtensions: [mathHtml()] }))

watch(draft, () => {
  md = micromark(draft.value, { extensions: [math()], htmlExtensions: [mathHtml()] })
})

</script>

<template>
  <div>
    <div class="prose lg:prose-xl" v-html="md"></div>
  </div>
</template>
