<template>
  <div class="flex flex-col justify-center items-center h-screen text-slate-800 bg-slate-200">
    <h1 class="text-5xl">Aboard</h1>
    <p class="ml-32 mb-10 mt-3">Aboard is a board, not abroad.</p>
     <span class="flex">
        <input v-model="name" @keyup.enter="login" class="border rounded-lg p-3 m-1" style="min-width: 300px" placeholder="Enter your name">
        <img :src="dice" class="w-12 m-3"/>
      </span>
  </div>
</template>

<script setup>
import dice from '../assets/dice.svg'
import ws from '../ws'
import { useRouter } from 'vue-router'
const LS = window.localStorage
let name = $ref(LS.getItem('name'))
const router = useRouter()
const login = async() => {
  if (!name) {
    Swal.fire('请输入用户名')
    return
  }
  LS.setItem('name', name)
  ws.connect(name)
  router.push('/')
}
</script>
