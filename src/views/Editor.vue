<script setup>
import { useRoute, useRouter } from 'vue-router'
import { BookOpenIcon, CheckIcon, ChatAltIcon, XIcon } from "@heroicons/vue/solid"

import Markdown from '../components/Markdown.vue'
import Bar from '../components/Bar.vue'
import DiscussCard from '../components/DiscussCard.vue'
import { state, send } from '../state'
import { onUnmounted } from '@vue/runtime-core'

const route = useRoute(), router = useRouter()
const id = route.params.id
const isNew = id === 'new'
const comment = $ref('')


if (isNew) {
  initBlock(false)
} else {
  initBlock()
}

if (!isNew && !state.block) {
  Swal.fire('讨论不存在', '', 'error')
    .then(() => router.push('/'))
}
let showPreview = $ref(false)
let showReceiver = $ref(false)
let isWide = $ref(window.innerWidth > 1024)
window.addEventListener('resize', () => isWide = window.innerWidth > 1024)

function initBlock (loading = true) {
  if (state.block.volume) return
  state.block = {
    user: 'test',
    parent: '',
    surface: { // all surface information
      title: 'Enter title here',
      type: 'block type',
      author: 'test',
      value: 'text or other kinds of value'
    },
    volume: { // longer content of block
      value: 'Loading contents...'
    }
  }
  if (loading) {
    state.block.surface.title = state.children[id].surface.title
    state.block._id = id
  }
}

function post () {
  send('block.put', state.block)
  initBlock()
  router.push('/')
}

function postComment () {
  send('block.put', {
    user: 'test',
    parent: id,
    surface: { // all surface information
      title: `${state.user}回复了${state.block.surface.author}`,
      type: 'comment',
      author: 'test',
      value: comment
    },
    volume: { // longer content of block
      value: comment
    }
  })
  showReceiver = false
}
onUnmounted(() => window.removeEventListener('resize', () => isWide = window.innerWidth > 1024))
</script>

<template>
  <bar />
  <span class="flex items-center absolute right-4 mt-2">
    <div v-if="!isWide" class="tooltipPreview">
      <book-open-icon class="w-8 cursor-pointer mr-2" :class="showPreview ? 'text-sky-400' : 'text-gray-400'" @click="showPreview = !showPreview" />
      <span class="tooltipTextPreview w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">预览</span>
    </div>
    <div class="tooltipCheck">
      <check-icon class="w-8 cursor-pointer mr-2 text-gray-400 hover:text-green-400" @click="post" />
      <span class="tooltipTextCheck w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">提交</span>
    </div>
    <div class="tooltipComment" v-if="!isNew">
      <chat-alt-icon class="w-8 cursor-pointer text-gray-400" @click="showReceiver = true"/>
      <span class="tooltipTextComment w-min invisible z-10 py-2 px-3 text-sm font-medium rounded-lg shadow-sm text-white transition-opacity duration-300 dark:bg-gray-700">评论</span>
    </div>
  </span>
  <input placeholder="Enter you title here" class="p-2 m-1" v-model="state.block.surface.title"/>
  <div v-if="showReceiver" class="absolute z-40 flex items-center justify-center h-5/6 w-screen bg-gray-600 opacity-75">
    <div class="relative md:w-1/2 w-5/6 h-3/4" type="receiver">
      <textarea class="w-full h-full bg-white rounded-md p-16 overflow-y-auto" v-model="comment"/>
      <check-icon class="w-8 cursor-pointer mr-2 text-gray-400 hover:text-green-400" @click="postComment" />
      <span class="absolute right-4 top-4 cursor-pointer" @click="showReceiver = false"><x-icon class="w-6 text-black"/></span>
    </div>
  </div>
  <div v-if="isWide" class="flex w-screen">
    <textarea class="h-5/6 w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="state.block.volume.value"/>
    <markdown class="h-5/6 w-1/2 p-16 overflow-y-auto bg-gray-100" type="draft"></markdown>
  </div>
  <div v-else class="flex w-screen">
    <markdown v-if="showPreview" class="h-5/6 w-1/2 p-16 overflow-y-auto" type="draft"></markdown>
    <textarea v-else class="h-5/6 w-1/2 overflow-y-auto bg-gray-100 p-8 border grow resize-none font-mono font-bold" placeholder="在这里写作..." rows="20" v-model="state.block.volume.value"/>
  </div>
  <discuss-card v-for="n in state.children" :key="n._id" :info="n" />
  <p v-if="state.children == {}" class="m-2">还没人发表评论，快来抢沙发吧～</p>
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