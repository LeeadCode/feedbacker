<template>
  <div 
    @click="handleToggle"
    class="flex flex-col py-6 px-8 rounded cursor-pointer bg-brand-gray"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <Badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
          {{ feedback.text }}
    </div>

    <div
      :class="{
        'animate__fadeOut': isClosing
      }"
      class="flex flex-col gap-2 justify-between w-full mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="isOpen"
    >
      <div class="flex flex-col md:flex-row w-full gap-2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 uppercase select-none">
            Página
          </span>
          <div class="font-medium text-gray-700 uppercase select-none truncate">
            {{ feedback.page }}
          </div>
        </div>
 
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 uppercase select-none">
            Dispositivo
          </span>
          <span class="font-medium text-gray-700 uppercase select-none">
            {{ feedback.device }}
          </span>
        </div>
      </div>

      <div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 uppercase select-none">
            Usuário
          </span>
          <span class="font-medium text-gray-700 uppercase select-none">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>
    </div>

    <div 
        class="flex justify-end mt-8"
        v-if="!isOpen"
      >
        <Icon 
          name="chevron-down" 
          size="24" 
          :color="brandColors.graydark"
        />
      </div>
  </div>
</template>

<script setup>
import { getDiffTimeBetweenCurrentDate } from '@/utils/date';
import Badge from './Badge'
import Icon from '@/components/Icon'
import palette from '../../../palette'
import { ref } from 'vue';
import { wait } from '@/utils/timeout';

const props = defineProps({
  feedback: {
    type: Object,
    required: true
  },
  isOpened: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.isOpened)
const isClosing = ref(false)
const brandColors = palette.brand

async function handleToggle(){
  if(isOpen.value) {
    isClosing.value = true
    await wait(250)
    isClosing.value = false
  }

  isOpen.value = !isOpen.value
}
</script>

<style>
</style>
