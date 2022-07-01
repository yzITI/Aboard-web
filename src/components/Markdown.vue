<script setup>
import { micromark } from 'micromark'
const { content } = defineProps(['content'])
let md = $computed(() => micromark(content))
</script>

<template>
  <div class="prose" v-html="md" />
</template>
