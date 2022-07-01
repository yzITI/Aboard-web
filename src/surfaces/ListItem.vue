<script setup>
import moment from 'moment'
import { state, goto } from '../state.js'
const { _id } = defineProps(['_id'])
const B = $computed(() => state.children[_id])
const parseDate = t => moment(t).fromNow()
const short = (s, l = 32) => s.length > l ? (s.substring(0, l - 2) + '...') : s
</script>

<template>
  <div class="w-11/12 sm:w-5/6 rounded-lg bg-white m-2 cursor-pointer p-2 all-transition shadow hover:shadow-md" @click="goto(_id)">
    <h1 class="mx-2 font-bold">{{ short(B.surface.title) }}</h1>
    <p class="px-2 text-xs text-gray-500">{{ parseDate(B.time) }}&nbsp;{{ (B.surface.author || '') }}</p>
  </div>
</template>