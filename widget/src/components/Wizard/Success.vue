<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <Icon 
      name="Check"
      :color="palette.brand.success"
      size="70"
    />

    <p class="text-xl font-black text-center w-full mt-2">
      Obrigado! Recebemos o seu feedback.
    </p>

    <div>
      <button 
      @click="goBack" 
      class="
        rounded-full font-regular text-sm flex-col justify-center bg-brand-gray
        items-center py-2 px-5 cursor-pointer focus:outline-none
      ">
        Envie Mais feedbacks
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon/index.vue'
import palette from '../../../palette.js'
import { resetStore } from '@/store';

function goBack() {
  resetStore()
}
</script>