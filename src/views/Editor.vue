<script setup>
import { draft } from '../plugins/state.js'
import Markdown from '../components/Markdown.vue'
import { useRoute } from 'vue-router'
import { BookOpenIcon, CheckIcon } from "@heroicons/vue/solid"
const route = useRoute()
const topic = route.params.id

let title = $ref('')
let showPreview = $ref(false)

const isWide = window.innerWidth > 1024

</script>

<template>
  <div v-if="isWide" class="flex w-screen">
    <textarea class="h-screen w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="draft"/>
    <markdown class="h-screen w-1/2 p-16 overflow-y-auto grow" :content="draft"></markdown>
  </div>
  <div v-else class="flex w-screen">
    <span v-if="!isWide" class="absolute right-4 top-4">
      <book-open-icon class="w-8 cursor-pointer" :class="showPreview ? 'text-sky-400' : 'text-gray-400'" @click="showPreview = !showPreview"/>
    </span>
    <markdown v-if="showPreview" class="h-screen w-1/2 p-16 overflow-y-auto grow"></markdown>
    <textarea v-else class="h-screen w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="draft"/>
  </div>
  <footer class="flex items-center justify-between p-2 absolute bottom-0 h-12 border border-2 border-gray-100 bg-white shadow-lg w-screen">
    <input v-if="topic == 'topic'" v-model="title" placeholder="在这里输入标题">
    <div class="flex items-center" v-else>
      回复:
      <div class="ml-1 font-mono bg-gray-100 p-1 text-gray-400">讨论{{ topic }}</div>
    </div>
    <span class="flex bg-green-400 text-white rounded-sm p-1 items-center cursor-pointer"><check-icon class="w-6"/>发布</span>
  </footer>
</template>
