<template>
  <div 
    class="flex flex-col items-start rounded"
  >
    <ContentLoader 
      class="mt-3 rounded"
      width="90%"
      height="30px"
      animationDuration="2s"
    />

    <ContentLoader 
      class="mt-3 rounded"
      width="80%"
      height="30px"
      animationDuration="2.3s"
    />

    <ContentLoader 
      class="mt-3 rounded"
      width="80%"
      height="30px"
      animationDuration="2.7s"
    />

    <ContentLoader 
      class="mt-3 rounded"
      width="70%"
      height="30px"
      animationDuration="2.7s"
    />
  </div>
</template>

<script setup>
import ContentLoader from '@/components/ContentLoader'
</script>