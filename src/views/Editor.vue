<script setup>
import { useRoute, useRouter } from 'vue-router'
import { BookOpenIcon, CheckIcon, ChatAltIcon, XIcon } from "@heroicons/vue/solid"

import Markdown from '../components/Markdown.vue'
import Bar from '../components/Bar.vue'
import DiscussCard from '../components/DiscussCard.vue'
import { state, send, draft } from '../state'
import { onUnmounted } from '@vue/runtime-core'

const route = useRoute(), router = useRouter()
const id = route.params.id
const isNew = id === 'new'


initDraft()

if (!isNew && !state.block) {
  Swal.fire('讨论不存在', '', 'error')
    .then(() => router.push('/'))
}
let showPreview = $ref(false)
let showReceiver = $ref(false)
let isWide = $ref(window.innerWidth > 1024)
window.addEventListener('resize', () => isWide = window.innerWidth > 1024)

function initDraft () {
  draft.block = {
    user: 'test',
    parent: isNew ? '' : id,
    surface: { // all surface information
      title: isNew ? 'Enter title here' : `${state.user}回复了${state.block.surface.author}`,
      type: 'block type',
      author: 'test',
      value: 'text or other kinds of value'
    },
    volume: { // longer content of block
      value: 'Loading contents...'
    }
  }
}

function post () {
  send('block.put', draft.block)
  draft.block = {}
  router.push(isNew ? '/' : '/discuss/' + id)
}
onUnmounted(() => window.removeEventListener('resize', () => isWide = window.innerWidth > 1024))
</script>

<template>
  <bar />
  <span class="flex items-center absolute right-2 mt-2">
    <div v-if="!isWide" class="tooltipPreview">
      <book-open-icon class="w-8 cursor-pointer mr-2" :class="showPreview ? 'text-sky-400' : 'text-gray-400'" @click="showPreview = !showPreview" />
      <span class="tooltipTextPreview w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">预览</span>
    </div>
    <div class="tooltipComment" v-if="!isNew">
      <chat-alt-icon class="w-8 cursor-pointer text-gray-400" @click="showReceiver = true"/>
      <span class="tooltipTextComment w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">原帖</span>
    </div>
    <div class="tooltipCheck">
      <check-icon class="w-8 cursor-pointer mr-2 text-gray-400 hover:text-green-400" @click="post" />
      <span class="tooltipTextCheck w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">提交</span>
    </div>
  </span>
  <div v-if="showReceiver" class="absolute z-40 flex items-center justify-center h-screen w-screen bg-gray-600 opacity-75">
    <div class="relative md:w-1/2 w-5/6 h-3/4">
      <markdown :content="state.block.volume.value" class="h-full w-full bg-white rounded-lg p-16" />
      <span class="absolute right-4 top-4 cursor-pointer" @click="showReceiver = false"><x-icon class="w-6 text-black"/></span>
    </div>
  </div>
  <input :disabled="!isNew" placeholder="Enter you title here" class="p-2 m-1" v-model="draft.block.surface.title"/>
  <div v-if="isWide" class="flex w-screen h-screen">
    <textarea class="h-full w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="draft.block.volume.value"/>
    <markdown class="h-full w-1/2 p-16 overflow-y-auto bg-gray-100"></markdown>
  </div>
  <div v-else class="flex w-screen h-screen">
    <markdown v-if="showPreview" class="h-full w-full p-16 overflow-y-auto"></markdown>
    <textarea v-else class="h-full w-full overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="draft.block.volume.value"/>
  </div>
</template>

<style scoped>
.tooltipPreview:hover .tooltipTextPreview {
  visibility: visible;
}

.tooltipCheck:hover .tooltipTextCheck {
  visibility: visible;
}

.tooltipComment:hover .tooltipTextComment{
  visibility: visible;
}
</style>