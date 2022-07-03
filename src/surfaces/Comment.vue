<script setup>
import { TrashIcon } from '@heroicons/vue/outline'
import { state, send } from '../state.js'
import Markdown from '../components/Markdown.vue'

const { _id } = defineProps(['_id'])
const B = $computed(() => state.children[_id])
const parseDate = t => moment(t).fromNow()

async function del () {
  const { isConfirmed } = await Swal.fire('Delete?', '', 'warning')
  if (!isConfirmed) return
  send('block.del', _id)
}
</script>

<template>
  <div class="py-2">
    <p class="text-xs text-gray-500">{{ (B.surface.author || '') }}&nbsp;/&nbsp;{{ parseDate(B.time) }}<trash-icon v-if="B.user === state.user.id" class="w-4 inline ml-2 text-red-500 cursor-pointer" @click.stop="del" /></p>
    <markdown :content="B.surface.content" />
  </div>
</template>