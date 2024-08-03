<template>
  <div>
    <button 
      class="relative"
      @click="handleClick"
    >
      <div class="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-lg">
        <div class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
          <div 
            class="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left"
            :class="{'translate-x-10': active}"
          />
          <div 
            class="bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75" 
            :class="{'translate-x-10': active}"
          />
          <div 
            class="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150" 
            :class="{'translate-x-10': active}"
          />

          <div 
            class="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 flex w-0"
            :class="{'w-12 translate-x-0': active}"
          >
            <div 
              class="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300" 
              :class="{'rotate-45': active}"
            />
            <div 
              class="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300" 
              :class="{'-rotate-45': active}"
            />
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggle'])
const active = ref(false)

function handleClick() {
  emit('toggle')
  active.value = !active.value
}
</script>

<style>
</style>
