<script setup>
import { watch } from 'vue'
import { state, auth, goto } from '../state'
import { useRouter } from 'vue-router'
const router = useRouter()

auth('')

watch(() => state.user, v => {
  router.push('/')
  goto('') // goto root
})
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen text-slate-800 bg-slate-200">
    <h1 class="text-5xl">Aboard</h1>
    <p class="mt-3">Aboard is a board, not abroad.</p>
  </div>
</template>