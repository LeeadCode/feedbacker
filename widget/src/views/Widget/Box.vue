<template>
  <div class="box animate__animated animate__fadeInUp animate__faster">
    <div
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo
      }"
      class="relative w-full flex"
    >
      <button
          v-if="canShowAdditionalControlAndInfo"
          @click="back"
          :disabled="canGoBack"
          :class="{ 'invisible': canGoBack }"
          class="text-xl text-gray-800 focus:outline-none"
      >
        <Icon name="ArrowRight" :color="colors.gray['800']"/>
      </button>
      <p
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl font-black text-center text-brand-main"
      >
      {{ label }}
      </p>

      <button
        @click="() => emit('close-box')"
        class="text-xl text-gray-800 focus:outline-none"
      >
        <Icon name="Close" size="14" :color="colors.gray['800']"/>
      </button>
    </div>

    <Wizard />

    <div class="text-gray-800 text-sm flex items-center gap-1" v-if="canShowAdditionalControlAndInfo">
      <Icon name="Chat" :color="brandColors.graydark"/>
      Widget by
      <span class="font-bold">
        feedbackeer
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import colors from 'tailwindcss/colors'

import { brand as brandColors } from '../../../palette'
import useStore from '@/hooks/store'
import Icon from '@/components/Icon/index.vue'
import Wizard from '@/components/Wizard/index.vue'
import useNavigation from '@/hooks/navigation'

const emit = defineEmits(['close-box'])

const store = useStore()
const { back } = useNavigation()

const label = computed<string>(() => {
  switch(store.feedbackType) {
    case 'ISSUE':
      return 'Reporte um problema'

    case 'IDEA':
      return 'Nos fale a sua ideia'

    case 'OTHER':
      return 'Abra sua mente'
  }

  return 'O que você tem em mente?'
})

const canGoBack = computed<boolean>(() => {
  return store.currentComponent === 'SelectFeedbackType'
})

const canShowAdditionalControlAndInfo = computed<boolean>(() => {
  return store.currentComponent !== 'Success' && store.currentComponent !== 'Error'
})
</script>

<style scoped lang="pcss">
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 
    flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
