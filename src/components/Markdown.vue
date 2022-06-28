<script setup>
import { watch } from 'vue'
import { micromark } from 'micromark'
import { state } from '../state.js'
let md = $ref(micromark(state.block.volume.value))

if (!state.block.volume) state.block.volume = { value: 'Loading...' }
watch(state.block.volume.value, () => {
  md = micromark(state.block.volume.value)
})

</script>

<template>
  <div class="prose lg:prose-xl" v-html="md" />
</template>
