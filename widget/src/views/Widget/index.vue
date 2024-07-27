<template>
  <teleport to='body'>
    <component
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
      :is="component" 
    />
  </teleport>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue';

import Standby from './Standby.vue'
import Box from './Box.vue'
import useIFrameControl from '@/hooks/iframe';
import useStore from '@/store';

const iframe = useIFrameControl()
const component = shallowRef(Standby) 
const store = useStore

function handleOpenBox() {
  iframe.notifyOpen()
  component.value = Box
}

function handleCloseBox() {
  iframe.notifyClose()
  component.value = Standby
}

watch(() => store.currentComponent, () => {
  iframe.updateCoreValuesOnStore()
})
</script>
