<template>
  <div class="flex justify-between items-center w-full my-5">
    <FeedbackType
       @click="() => handleClick('ISSUE')" 
       image="issue" 
       label="Problema"
    />
    <FeedbackType
       @click="() => handleClick('IDEA')" 
       image="lamp" 
       label="Ideia"
    />
    <FeedbackType
       @click="() => handleClick('OTHER')" 
       image="fire" 
       label="Outro" 
    />
  </div>
</template>

<script setup lang="ts">
import FeedbackType from './FeedbackType.vue' 

const emit = defineEmits(['select-feedback-type', 'next'])

function handleClick (type: string) {
  emit('select-feedback-type', type)
  emit('next')
}
</script>