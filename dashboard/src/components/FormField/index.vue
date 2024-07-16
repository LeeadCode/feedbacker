<template>
  <label class="block mt-4">
    <span class="text-lg font-medium text-gray-800">
      <slot />
    </span>
    <input 
      v-bind="$attrs" 
      v-model="modelValue" 
      class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 rounded"
      :class="[errorMessage ? 'border-brand-danger' : 'border-transparent']">
    <span v-if="!!errorMessage" class="block font-medium text-brand-danger">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

const registerinForm = inject('form')
const modelValue = defineModel()

const errorMessage = ref('')

const props = defineProps({
  validate: Function
})

function validateField() {
  if(props.validate) {
    errorMessage.value = props.validate(modelValue.value);
  }
}

onMounted(() => {
  registerinForm({validateField, errorMessage})
})
</script>