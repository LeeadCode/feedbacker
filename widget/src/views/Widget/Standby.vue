<template>
  <div
    @click="() => emit('open-box')"
    id="widget-open-button"
    class="
      fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-brand-main rounded-full
      py-5 px-5 flex gap-3 items-center shadow-xl cursor-pointer select-none
      animate__animated animate__fadeInUp animate__faster
    "
  >
    <Icon 
      name="Chat"
      color="white"
      size="27"
    />
    <span class="font-black text-white text-xl">
      Deixe um feedback
    </span>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../components/Icon/index.vue';
const emit = defineEmits(['open-box'])

defineOptions({
  name: 'teste'
})
</script>
