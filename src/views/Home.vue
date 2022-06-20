<template>
  <div class="flex flex-col justify-center items-center h-screen text-slate-800 bg-slate-200">
    <h1 style="margin-bottom: 50px; font-size: 3rem;">Aboard</h1>
     <span class="flex">
        <input class="border rounded-lg p-3 m-1" style="min-width: 300px" placeholder="Enter your name">
        <img :src="dice" class="w-12 m-3"/>
      </span>
  </div>
</template>

<script setup>
import dice from '../utils/dice.svg'
</script>
