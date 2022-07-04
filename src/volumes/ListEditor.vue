<script setup>
import { watchEffect } from 'vue'
import { state } from '../state.js'

state.draft.volume = { type: 'List', title: '' }

watchEffect(() => {
  state.editor.volumeReady = state.draft.volume?.title?.match(/\S/)
})
</script>

<template>
  <input type="text" v-model="state.draft.volume.title" placeholder="标题" class="border-b-2 my-2 w-4/5 block px-2 py-1">
</template>