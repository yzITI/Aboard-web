<script setup>
import state from '../state.js'
import { volumes } from '../blocks.js'
import { useRouter } from 'vue-router'
const router = useRouter()
if (!state.user.id) router.push('/login')
</script>

<template>
  <component v-if="state.block.volume && volumes[state.block.volume.type]" :is="volumes[state.block.volume.type]"></component>
</template>
