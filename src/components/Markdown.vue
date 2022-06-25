<script setup>
import { defineProps, watch } from 'vue'
import { micromark } from 'micromark'
import { draft } from '../plugins/state.js'
let md = $ref(micromark(draft.value))

watch(draft, () => {
  md = micromark(draft.value)
})

</script>

<template>
  <div>
    <div class="prose lg:prose-xl" v-html="md"></div>
  </div>
</template>
