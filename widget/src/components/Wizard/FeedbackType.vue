<template>
  <button
    class="rounded-xl hover:bg-gray-100 bg-brand-gray 
    flex flex-col justify-center items-center gap-1  p-5 w-28 cursor-pointer focus:outline-none" 
  >
    <div class="w-12">
      <img 
        :src="require(`../../assets/images/${image}.png`)" 
        class="w-full"
      >
    </div>
    <p class="font-medium text-gray-800">{{ label }}</p>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string,
  label: string
}>()
</script>