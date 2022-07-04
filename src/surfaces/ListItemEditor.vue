<script setup>
import { watchEffect } from 'vue'
import { state } from '../state.js'

state.draft.surface = { type: 'ListItem', title: '', author: state.user.name }

watchEffect(() => {
  state.editor.surfaceReady = state.draft.surface?.title?.match(/\S/)
})
</script>

<template>
  <input type="text" v-model="state.draft.surface.title" placeholder="标题" class="border-b-2 my-2 w-4/5 block px-2 py-1">
</template>