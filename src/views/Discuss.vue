<script setup>
import { state, send } from '../state'
import { useRoute, useRouter } from 'vue-router'
import Markdown from '../components/Markdown.vue'
import DiscussCard from '../components/DiscussCard.vue'
import Bar from '../components/Bar.vue'
const route = useRoute(), router = useRouter()
const id = route.params.id
state.block._id = id
state.children = {}
send('block.get', id)
</script>

<template>
  <bar />
  <div class="flex flex-col items-center px-10 py-8 min-h-screen bg-gray-100">
    <div class="w-full shadow-md p-4 bg-white">
      <div class="text-2xl">{{ state.block.surface.title }}</div>
      <markdown :content="state.block.volume.value" class="w-full" />
    </div>
    <discuss-card class="w-full" v-for="n in state.children" :key="n._id" :info="n" />
    <div class="absolute bottom-2 flex items-center justify-center w-11/12 border border-2 border-sky-400 rounded-lg p-1 text-sky-400 bg-white" @click="router.push('/post/' + id)">回复</div>
  </div>
</template>