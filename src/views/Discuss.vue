<script setup>
import { state, send } from '../state'
import { useRoute, useRouter } from 'vue-router'
import Markdown from '../components/Markdown.vue'
import DiscussCard from '../components/DiscussCard.vue'
const route = useRoute(), router = useRouter()
const id = route.params.id
state.block._id = id
state.children = {}
send('block.get', id)
</script>

<template>
  <div class="px-10 py-8 w-screen">
    <div class="text-2xl">{{ state.block.surface.title }}</div>
    <markdown :content="state.block.volume.value" class="w-full" />
  </div>
  <discuss-card v-for="n in state.children" :key="n._id" :info="n" />
  <div class="absolute bottom-2 flex items-center justify-center w-screen" @click="router.push('/post/' + id)">回复</div>
</template>