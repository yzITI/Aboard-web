<script setup>
import { state, goto, send } from '../state.js'
import { ArrowLeftIcon } from '@heroicons/vue/outline'
import { surfaces } from '../blocks.js'
import TextEditor from '../components/TextEditor.vue'
import Markdown from '../components/Markdown.vue'

const parseDate = t => moment(t).fromNow()
let children = $computed(() => {
  const ids = Object.keys(state.children)
  return ids.sort((a, b) => state.children[b].time - state.children[a].time)
})

function post (draft) {
  send('block.put', {
    parent: state.block._id,
    surface: { type: 'Comment', author: state.user.name, content: draft.content }
  })
}
</script>

<template>
  <div class="flex flex-col items-center p-4 sm:p-8 min-h-screen w-screen bg-gray-100">
    <div class="w-full shadow p-4 bg-white rounded">
      <p class="text-xs text-gray-500 flex items-center my-1">
        <arrow-left-icon v-if="typeof state.block.parent !== 'undefined'" class="all-transition pl-2 pr-0 mr-2 w-7 text-grey-500 cursor-pointer hover:pr-2 hover:pl-0" @click="goto(state.block.parent)" />
        {{ (state.block.volume.author || '') }}&nbsp;/&nbsp;{{ parseDate(state.block.time) }}
      </p>
      <div class="font-bold text-xl mx-2 my-2">{{ state.block.volume.title }}</div>
      <hr>
      <markdown class="p-2" :content="state.block.volume.content" />
    </div>
    <div v-if="children.length" class="w-full shadow px-4 my-6 bg-white rounded">
      <template v-for="(_id, i) in children" :key="_id">
        <hr v-if="i">
        <component :_id="_id" :is="surfaces['Comment'].component"></component>
      </template>
    </div>
    <text-editor comment="1" @post="post" />
  </div>
</template>