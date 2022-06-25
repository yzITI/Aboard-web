<script setup>
import { useRoute, useRouter } from 'vue-router'
import { BookOpenIcon, CheckIcon, ChatAltIcon, XIcon } from "@heroicons/vue/solid"

import Markdown from '../components/Markdown.vue'
import Bar from '../components/Bar.vue'
import { receiver, topic } from '../plugins/state.js'
import ws from '../ws'

const route = useRoute(), router = useRouter()
const isNew = route.params.id === 'new'
const r = route.params.id.split('$')

if (!ws.ws.url) {
  Swal.fire('您还未登录', '', 'error')
    .then(() => router.push('/login'))
}

if (isNew) {
  initTopic
}

receiver.value = { type: r[0], id: r[1], content: '## test' }

let showPreview = $ref(false)
let showReceiver = $ref(false)


const isWide = window.innerWidth > 1024

function initTopic () {
  topic.value = {
    title: '',
    content: ''
  }
}
async function post () {
  ws.send(JSON.stringify({ o: 'topic.create', i: 'new', d: topic.value }))
  initTopic()
  router.push('/')
}

</script>

<template>
  <bar />
  <span class="flex items-center absolute right-4 mt-2">
    <div class="tooltipPreview">
      <book-open-icon v-if="!isWide" class="w-8 cursor-pointer mr-2" :class="showPreview ? 'text-sky-400' : 'text-gray-400'" @click="showPreview = !showPreview" />
      <span class="tooltipTextPreview w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">预览</span>
    </div>
    <div class="tooltipCheck">
      <check-icon v-if="!isWide" class="w-8 cursor-pointer mr-2" @click="post" />
      <span class="tooltipTextCheck w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">提交</span>
    </div>
    <chat-alt-icon v-if="!isNew" class="w-8 cursor-pointer text-gray-400" @click="showReceiver = true"/>
  </span>
  <div v-if="showReceiver" class="absolute z-40 flex items-center justify-center h-screen w-screen bg-gray-600 opacity-75">
    <div class="relative md:w-1/2 w-5/6 h-5/6" type="receiver">
      <markdown class="w-full h-full bg-white rounded-md p-16 overflow-y-auto" type="receiver"/>
      <span class="absolute right-4 top-4 cursor-pointer" @click="showReceiver = false"><x-icon class="w-6 text-black"/></span>
    </div>
  </div>
  <div v-if="isWide" class="flex w-screen">
    <textarea class="h-screen w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="topic.content"/>
    <markdown class="h-screen w-1/2 p-16 overflow-y-auto" type="draft"></markdown>
  </div>
  <div v-else class="flex w-screen">
    <markdown v-if="showPreview" class="h-screen w-1/2 p-16 overflow-y-auto" type="draft"></markdown>
    <textarea v-else class="h-screen w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="topic.content"/>
  </div>
  <footer class="flex z-10 items-center justify-between p-2 absolute bottom-0 h-12 border-2 border-gray-100 bg-white shadow-lg w-screen" v-if="!isNew">
    <div class="flex items-center">
      回复:
      <div class="ml-1 font-mono bg-gray-100 p-1 text-gray-400">{{ receiver.type }} {{ receiver.id }}</div>
    </div>
    <span class="flex bg-green-400 text-white rounded-sm p-1 pr-2 items-center cursor-pointer"><check-icon class="w-6"/>发布</span>
  </footer>
</template>

<style scoped>
.tooltipPreview:hover .tooltipTextPreview {
  visibility: visible;
}

.tooltipCheck:hover .tooltipTextCheck {
  visibility: visible;
}
</style>