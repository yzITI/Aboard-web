<script setup>
import moment from 'moment'
import { state } from '../state.js'
import Markdown from '../components/Markdown.vue'
const { _id } = defineProps(['_id'])
const B = $computed(() => state.children[_id])
const parseDate = t => moment(t).fromNow()
</script>

<template>
  <div class="py-2">
    <p class="text-xs text-gray-500">{{ parseDate(B.time) }}&nbsp;{{ (B.surface.author || '') }}</p>
    <markdown :content="B.surface.content" />
  </div>
</template>