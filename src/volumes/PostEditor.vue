<script setup>
import { watchEffect } from 'vue'
import { state } from '../state.js'
import Markdown from '../components/Markdown.vue'
import { EyeIcon } from '@heroicons/vue/outline'

state.draft.volume = { type: 'Post', title: '', content: '', author: state.user.name }
let showPreview = $ref(false)

watchEffect(() => {
  const V = state.draft.volume
  state.editor.volumeReady = V?.content?.match(/\S/) && V?.title?.match(/\S/)
})
</script>

<template>
  <input type="text" v-model="state.draft.volume.title" placeholder="标题" class="border-b-2 my-2 w-4/5 block px-2 py-1">
  <div class="relative">
    <eye-icon class="absolute right-2 top-2 w-5 z-20 cursor-pointer" :class="showPreview ? 'text-blue-500' : 'text-gray-500'" @click="showPreview = !showPreview" />
    <div v-if="showPreview" class="overflow-auto w-full p-2 h-80 bg-blue-50">
      <markdown :content="state.draft.volume.content" />
    </div>
    <textarea v-else v-model="state.draft.volume.content" class="block bg-gray-100 w-full p-2 text-sm" placeholder="写点什么吧！（支持markdown语法）" rows="15" />
  </div>
</template>