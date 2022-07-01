<script setup>
import { state, goto, send } from '../state.js'
import { ArrowLeftIcon } from '@heroicons/vue/outline'
import { surfaces } from '../blocks.js'
import Editor from '../components/Editor.vue'

function post (draft) {
  send('block.put', {
    parent: state.block._id,
    surface: { type: 'ListItem', title: draft.title, author: state.user.name },
    volume: { type: 'Post', ...draft }
  })
}

let children = $computed(() => {
  const ids = Object.keys(state.children)
  return ids.sort((a, b) => state.children[b].time - state.children[a].time)
})
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-16">
    <div class="fixed top-0 left-0 w-screen flex items-center shadow font-bold w-full bg-white"><!-- bar -->
      <arrow-left-icon v-if="typeof state.block.parent !== 'undefined'" class="all-transition pl-2 pr-0 mx-2 w-7 text-grey-500 cursor-pointer hover:pr-2 hover:pl-0" @click="goto(state.block.parent)" />
      <h1 class="text-xl px-4 py-2">{{ state.block.surface.title }}</h1>
    </div>
    <component v-for="_id in children" :key="_id" :_id="_id" :is="surfaces['ListItem']"></component>
    <editor @post="post" />
  </div>  
</template>