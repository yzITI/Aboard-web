<template>
  <div class="rounded-lg bg-slate-50 m-2 cursor-pointer p-1 transition-all ease-in-out duration-300 hover:scale-x-105" @click="detail(info._id)">
    <h1 class="subtitle m-2"><b>{{ info.surface.type === 'comment'? info.surface.value: info.surface.title }}</b></h1>
    <p class="p-2" style="color: #757575;">{{ info.surface.author }} &#8287; {{parseDate(info.time) }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

import { state, send } from '../state'

const tzoffset = (new Date()).getTimezoneOffset() * 60000
const { info } = defineProps(['info'])
const router = useRouter()

const parseDate = (timestamp) => {
  if (!timestamp || typeof (timestamp) === 'undefined') return
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
}

const detail = (id) => {
  router.push('/discuss/' + id)
}
</script>
