<script setup>
import { useRouter } from 'vue-router'
import { PencilIcon } from '@heroicons/vue/solid'
import DiscussCard from '../components/DiscussCard.vue'
import Bar from '../components/Bar.vue'
import InfiniteLoading from 'vue-infinite-loading'

import { send, state, auth } from '../state'
const router = useRouter()

setTimeout(() => {
  state.block._id = ''
  auth({})
  send('block.get', '')
}, 2000); 

function write () {
  router.push('/discuss/new')
}
async function load ($state) {
  // TODO
  return
}
</script>

<template>
  <div>
    <bar />
    <div class="list flex flex-col bg-slate-200">
      <button class="fixed bottom-8 right-8 w-16 h-16 z-50 flex flex-col justify-center items-center border-solid border-2 border-sky-500 rounded-full hover:scale-110 bg-slate-50" @click="write">
        <pencil-icon class="h-8 w-8 text-blue-500" />
      </button>
      <discuss-card v-for="n in state.children" :key="n._id" :info="n" />
      <!-- <infinite-loading :identifier="LS.getItem('name')" @infinite="load">
        <template v-slot:no-more>没有更多内容啦！</template>
        <template v-slot:no-results>暂时还没有内容呢</template>
      </infinite-loading> -->
    </div>
  </div>
</template>

<style scoped>
.list {
  min-height: 93vh;
  margin: 0;
  padding: 2vh 3%;
}
@media (max-width: 440px) {
  .list {
    padding: 8px 0px;
  }
}
</style>
