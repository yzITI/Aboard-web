<script setup>
import { defineProps, watch } from 'vue'
import { micromark } from 'micromark'
import { draft } from '../state.js'
const { content } = defineProps(['content'])
let md = $ref(micromark(content || draft.block.volume.value))
watch(() => draft.block.volume.value, () => {
  md = micromark(draft.block.volume.value)
})

</script>

<template>
  <div>
    <div class="prose lg:prose-xl" v-html="md" />
  </div>
</template>
