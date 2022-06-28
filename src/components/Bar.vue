<template>
  <div class="flex items-center justify-between m-0 rounded-b-lg bar border">
    <div class="flex items-center justify-center">
      <home-icon class="m-2 h-8 w-8 text-grey-500 cursor-pointer" @click="home" />
      <h1 class="text-xl p-2 rounded-lg inline-block">Aboard</h1>
    </div>
    <div style="display: flex; align-items: center;">
      <!-- <input class="mr-4 w-32 p-2 pr-3 pl-3 rounded transition-all ease-in-out duration-500 bg-gray-100" type="text" placeholder="搜索" onfocus="this.placeholder = '回车全文搜索'" onblur="this.placeholder = '搜索'"> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { HomeIcon } from '@heroicons/vue/outline'

const route = useRoute(), router = useRouter()

function home () {
  router.push('/')
}
</script>

<style scoped>
div.bar {
  height: 7vh;
}
input:focus {
  width: min(60vw, 320px);
}
</style>