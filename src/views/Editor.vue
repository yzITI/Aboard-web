<script setup>
import { draft, receiver } from '../plugins/state.js'
import Markdown from '../components/Markdown.vue'
import { useRoute } from 'vue-router'
import { BookOpenIcon, CheckIcon, ChatAltIcon, XIcon } from "@heroicons/vue/solid"
const route = useRoute()
const r = route.params.receiver.split('$')

receiver.value = { type: r[0], id: r[1], content: '## test' }

let title = $ref('')
let showPreview = $ref(false)
let showReceiver = $ref(false)

const isWide = window.innerWidth > 1024

async function post () {

}

</script>

<template>
  <span class="flex items-center absolute right-4 top-4">
    <book-open-icon v-if="!isWide" class="w-8 cursor-pointer mr-2" :class="showPreview ? 'text-sky-400' : 'text-gray-400'" @click="showPreview = !showPreview"/>
    <chat-alt-icon class="w-8 cursor-pointer text-gray-400" @click="showReceiver = true"/>
  </span>
  <div v-if="showReceiver" class="absolute z-40 flex items-center justify-center h-screen w-screen bg-gray-600 opacity-75">
    <div class="relative md:w-1/2 w-5/6 h-5/6" type="receiver">
      <markdown class="w-full h-full bg-white rounded-md p-16 overflow-y-auto" type="receiver"/>
      <span class="absolute right-4 top-4 cursor-pointer" @click="showReceiver = false"><x-icon class="w-6 text-black"/></span>
    </div>
  </div>
  <div v-if="isWide" class="flex w-screen">
    <textarea class="h-screen w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="draft"/>
    <markdown class="h-screen w-1/2 p-16 overflow-y-auto" type="draft"></markdown>
  </div>
  <div v-else class="flex w-screen">
    <markdown v-if="showPreview" class="h-screen w-1/2 p-16 overflow-y-auto" type="draft"></markdown>
    <textarea v-else class="h-screen w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="draft"/>
  </div>
  <footer class="flex z-10 items-center justify-between p-2 absolute bottom-0 h-12 border border-2 border-gray-100 bg-white shadow-lg w-screen">
    <input v-if="topic == 'topic'" v-model="title" placeholder="在这里输入标题">
    <div class="flex items-center" v-else>
      回复:
      <div class="ml-1 font-mono bg-gray-100 p-1 text-gray-400">{{ receiver.type }} {{ receiver.id }}</div>
    </div>
    <span class="flex bg-green-400 text-white rounded-sm p-1 items-center cursor-pointer"><check-icon class="w-6"/>发布</span>
  </footer>
</template>
