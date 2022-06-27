<script setup>
import { watch } from 'vue'
import { micromark } from 'micromark'
import { state } from '../state.js'
let md = $ref(micromark(state.block?.volume.value))

watch(state.block.volume, () => {
  md = micromark(state.block?.volume.value)
})

</script>

<template>
  <div>
    <div class="prose lg:prose-xl" v-html="md"></div>
  </div>
</template>
