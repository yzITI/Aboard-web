<script setup>
import state from '../state.js'
const { _id } = defineProps(['_id'])
</script>

<template>
  <p>
    this is a list item with content<br> {{ JSON.stringify(state.children[_id]) }}
  </p>
</template>