<script setup>
import { PencilIcon, XIcon, EyeIcon, TrashIcon } from '@heroicons/vue/outline'
import Markdown from '../components/Markdown.vue'
const props = defineProps(['comment'])
const emits = defineEmits(['post'])
let showWrite = $ref(false), draft = $ref({ title: '', content: '' })
let showPreview = $ref(false)

let postReady = $computed(() => (props.comment || draft.title.match(/\S/)) && draft.content.match(/\S/))

function post () {
  if (!postReady) return
  emits('post', draft)
  draft = { title: '', content: '' }
  showWrite = false
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="showWrite" class="all-transition rounded-lg fixed z-10 bottom-0 sm:bottom-4 sm:right-4 border bg-white sm:shadow-md overflow-hidden w-full sm:w-2/3 lg:w-1/2"><!-- write window -->
      <div class="flex items-center justify-between bg-gray-800 text-white font-bold px-4 py-2">
        <h3>New Post</h3>
        <x-icon class="w-6 cursor-pointer" @click="showWrite = false" />
      </div>
      <input v-if="!props.comment" v-model="draft.title" class="block w-full p-2 font-bold" placeholder="Title">
      <hr>
      <markdown class="overflow-auto p-2 h-64 bg-blue-50" v-if="showPreview" :content="draft.content" />
      <textarea v-else v-model="draft.content" class="block w-full p-2" placeholder="Write something" rows="10" />
      <hr>
      <div class="flex items-center justify-between p-2">
        <button class="py-1 px-3 rounded text-white font-bold" :class="postReady ? 'bg-blue-500' : 'bg-gray-500'" @click="post">Post</button>
        <div class="flex items-center">
          <trash-icon class="w-6 mr-2 cursor-pointer text-gray-500" @click="draft = { title: '', content: '' }" />
          <eye-icon class="w-6 all-transition cursor-pointer" :class="showPreview ? 'text-blue-500' : 'text-gray-500'" @click="showPreview = !showPreview" />
        </div>
      </div>
    </div>
    <button v-else class="all-transition fixed bottom-8 right-8 p-4 z-10 rounded-full bg-blue-500 text-white shadow-md hover:shadow-xl" @click="showWrite = true">
      <pencil-icon class="w-6" />
    </button>
  </transition>
</template>