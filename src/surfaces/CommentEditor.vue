<script setup>
import { watchEffect } from 'vue'
import { state } from '../state.js'
import Markdown from '../components/Markdown.vue'
import { EyeIcon } from '@heroicons/vue/outline'

state.draft.surface = { type: 'Comment', content: '', author: state.user.name }
let showPreview = $ref(false)

watchEffect(() => {
  state.editor.surfaceReady = state.draft.surface?.content?.match(/\S/)
})
</script>

<template>
  <div class="relative">
    <eye-icon class="absolute right-2 top-2 w-5 z-20 cursor-pointer" :class="showPreview ? 'text-blue-500' : 'text-gray-500'" @click="showPreview = !showPreview" />
    <div v-if="showPreview" class="overflow-auto w-full p-2 h-80 bg-blue-50">
      <markdown :content="state.draft.surface.content" />
    </div>
    <textarea v-else v-model="state.draft.surface.content" class="block bg-gray-100 w-full p-2 text-sm" placeholder="写点什么吧！（支持markdown语法）" rows="15" />
  </div>
</template>