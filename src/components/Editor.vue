<script setup>
import { watchEffect } from 'vue'
import { state, send } from '../state.js'
import { XIcon } from '@heroicons/vue/outline'
import { surfaces, volumes } from '../blocks.js'

const surfaceList = [], volumeList = []
for (const k in surfaces) {
  if (surfaces[k].editor) surfaceList.push(k)
}
for (const k in volumes) {
  if (volumes[k].editor) volumeList.push(k)
}

function init () {
  state.draft = { surface: {}, volume: {} }
}
init()

let ready = $computed(() => state.editor.surfaceReady && (surfaces[state.draft.surface.type]?.leaf || state.editor.volumeReady))

watchEffect(() => {
  if (!surfaces[state.draft.surface.type]) state.editor.surfaceReady = false
  if (!volumes[state.draft.volume.type]) state.editor.volumeReady = false
})

async function submit () {
  if (!ready) return
  send('block.put', {
    parent: state.block._id,
    ...state.draft
  })
  init()
  state.editor.show = false
}
</script>

<template>
  <transition name="fade">
    <div v-if="state.editor.show" @click="state.editor.show = false" class="fixed z-40 bg-black opacity-50 w-screen h-screen top-0 left-0" />
  </transition>
  <div class="all-transition fixed w-screen h-3/4 z-40 sm:w-3/4 lg:w-1/2 sm:h-screen bg-white shadow-lg bottom-0 right-0 overflow-y-auto" :class="!state.editor.show && 'hide'">
    <div class="p-2 sm:p-4 flex items-center justify-between">
      <h3 class="text-xl sm:text-2xl font-bold">编辑方块</h3>
      <x-icon class="w-6 cursor-pointer" @click="state.editor.show = false" />
    </div>
    <hr>
    <div style="min-height: 20%;">
      <div class="m-2 flex items-center">
        <select v-model="state.draft.surface.type" class="text-sm border rounded px-2 py-1">
          <option value="undefined">请选择表面组件类型</option>
          <option v-for="k in surfaceList" :key="k" :value="k">{{ surfaces[k].name }}</option>
        </select>
      </div>
      <div class="m-2" v-if="surfaces[state.draft.surface.type]">
        <component :is="surfaces[state.draft.surface.type].editor"></component>
      </div>
    </div>
    <div style="min-height: 20%;" v-if="surfaces[state.draft.surface.type] && !surfaces[state.draft.surface.type].leaf">
      <hr>
      <div class="m-2 flex items-center">
        <select v-model="state.draft.volume.type" class="text-sm border rounded px-2 py-1">
          <option value="undefined">请选择内容组件类型</option>
          <option v-for="k in volumeList" :key="k" :value="k">{{ volumes[k].name }}</option>
        </select>
      </div>
      <div class="m-2" v-if="volumes[state.draft.volume.type]">
        <component :is="volumes[state.draft.volume.type].editor"></component>
      </div>
    </div>
    <hr>
    <button class="font-bold px-6 py-1 rounded-full shadow all-transition hover:shadow-md text-white m-4" :class="ready ? 'bg-blue-500' : 'bg-gray-500'" @click="submit">提交</button>
  </div>
</template>

<style scoped>
.hide {
  right: -100vw;
}
@media (max-width: 640px) {
  .hide {
    right: 0;
    bottom: -100vh;
  }
}
</style>
