<template>
  <span
    :class="`bg-${classColor}`"
    class="p-2 text-xs font-black text-white uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const label = computed(() => {
  switch (props.type) {
    case 'ISSUE':
      return 'problema'
    case 'IDEA':
      return 'ideia' 
    default:
      return 'outros'
  }
})

const classColor = computed(() => {
  switch (props.type) {
    case 'ISSUE':
      return 'brand-danger'
    case 'IDEA':
      return 'brand-warning' 
    default:
      return 'brand-graydark'
  }
})
</script>