<template>
  <div>
    <bar />
    <div class="list flex flex-col bg-slate-200">
      <button class="fixed bottom-8 right-8 w-16 h-16 z-50 flex flex-col justify-center items-center border-solid border-2 border-sky-500 rounded-full hover:scale-110 bg-slate-50" @click="write">
        <pencil-icon class="h-8 w-8 text-blue-500" />
      </button>
      <discuss-card v-for="n in all" :key="n._id" :info="n" />
      <infinite-loading :identifier="LS.getItem('name')" @infinite="load">
        <template v-slot:no-more>没有更多内容啦！</template>
        <template v-slot:no-results>暂时还没有内容呢</template>
      </infinite-loading>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { PencilIcon } from '@heroicons/vue/solid'
import DiscussCard from '../components/DiscussCard.vue'
import Bar from '../components/Bar.vue'
import InfiniteLoading from 'vue-infinite-loading'

import ws from '../ws'
const LS = window.localStorage
const router = useRouter()
const all = [{
  pin: true,
  timestamp: Date.now(),
  _id: 'HOMEdfjhwljcw',
  tag: [],
  title: 'test',
  username: LS.getItem('name')
},
{
  pin: false,
  timestamp: Date.now(),
  _id: 'dchjwdcjk',
  tag: [],
  title: 'test1',
  username: LS.getItem('name')
}]
if (!ws.ws.url) {
  Swal.fire('请先登录', '', 'error')
    .then(() => router.push('login'))
}

async function load ($state) {
  // TODO
  return
}
</script>

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
