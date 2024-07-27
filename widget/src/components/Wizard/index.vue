<template>
  <Component 
    :is="store.currentComponent"
    @selectFeedbackType="handleSelect"
    @next="next"
  />
</template>

<script setup lang="ts">
import useNavigation from '@/hooks/navigation'
import store, { setfeedbackType } from '@/store'
import SelectFeedbackType from './SelectFeedbackType.vue';
import WriteFeedback from './WriteFeedback.vue';
import ErrorState from './Error.vue';
import Success from './Success.vue';

// state
const { next } = useNavigation()

// fn
function handleSelect(type: string){
  setfeedbackType(type)
}

defineOptions({
  components: {
    SelectFeedbackType,
    WriteFeedback,
    Error: ErrorState,
    Success
  }
})
</script>