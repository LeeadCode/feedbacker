<template>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      {{ title }}
    </h1>
    <p class="info-text text-center">
      {{ subTitle }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subTitle: String
})
</script>