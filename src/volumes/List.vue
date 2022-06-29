<script setup>
import { state, goto } from '../state.js'
import { surfaces } from '../blocks.js'
</script>

<template>
  <h1>This is a list: {{ JSON.stringify(state.block) }}</h1>
  <component v-for="(c, _id) in state.children" :key="_id" :_id="_id" :is="surfaces['ListItem']"></component>
</template>