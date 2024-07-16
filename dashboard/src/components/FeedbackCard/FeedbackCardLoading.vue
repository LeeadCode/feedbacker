<template>
  <div
    class="flex flex-col items-center rounded"
  >
    <ContentLoader 
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2s"
    />

    <ContentLoader 
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2.3s"
    />

    <ContentLoader 
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2.7s"
    />
  </div>
</template>

<script setup>
import ContentLoader from '@/components/ContentLoader'
</script>

<style>
</style>
