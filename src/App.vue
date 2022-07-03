<script setup>
import loading from './assets/loading.svg'
import { watch } from 'vue'
import { state, auth, goto } from './state.js'
import { volumes } from './blocks.js'

// auth
const SS = window.sessionStorage
const login = () => window.open('https://cn.aauth.link/#/launch/aboard', 'aauth', 'width=400,height=800,top=50,left=50')
if (!SS.token) login()
else auth(SS.token)
window.onmessage = e => {
  if (e.origin !== 'https://cn.aauth.link') return
  SS.token = e.data?.token || ''
  auth(SS.token)
}
watch(() => state.user, v => {
  if (v.id) goto('')
})

let showVolume = $computed(() => state.block.volume && volumes[state.block.volume.type])
</script>

<template>
  <component v-if="showVolume" :is="volumes[state.block.volume.type]"></component>
  <transition name="fade">
    <div v-if="!showVolume" class="fixed top-0 left-0 z-50 w-screen h-screen flex flex-col items-center justify-center">
      <img v-if="state.user.id" class="w-64" :src="loading">
      <div v-else class="text-center flex flex-col items-center">
        <h2 class="text-4xl font-bold">Aboard</h2>
        <p class="text-gray-500">Aboard is a board, not abroad.</p>
        <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white my-4" @click="login">前往登录</button>
      </div>
    </div>
  </transition>
</template>
