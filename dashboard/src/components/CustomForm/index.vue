<template>
  <form>
    <slot/>
  </form>
</template>

<script setup>
import { ref, provide } from 'vue';

provide('form', register)

const inputsValidate = ref([])
 
function register(Inputvalidate){
  inputsValidate.value.push(Inputvalidate)  
}

function validate() {
  let isValid = true

  inputsValidate.value.forEach(inputvalidate => {
    inputvalidate.validateField()

    if(isValid) {
      isValid = inputvalidate.errorMessage.length === 0
    }
  });

  return isValid
}

defineExpose({'validate': validate})
</script>