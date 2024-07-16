<template>
  <div
    :style="{
      width: computedWidth,
      height
    }"
    class="opacity-75 content-loader"
  >
    <span :style="{ animationDuration }" class="content-loader--fx"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  maxWidth: {
    default: 100,
    type: Number
  },
  minWidth: {
    default: 80,
    type: Number
  },
  animationDuration: {
    default: '1.6s',
    type: String
  },
  height: {
    default: '1rem',
    type: String
  },
  width: {
    default: '1rem',
    type: String
  }
})

const computedWidth = computed(() => {
  const value = Math.random() * (props.width - props.minWidth)
  return props.width ?? `${Math.floor(value + props.minWidth)}%`
})
</script>

<style lang="pcss" scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.content-loader {
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: #f6f7f8;
}

.content-loader--fx {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-position: 0 0;
  background-size: 1000 100;
  animation: shimmer infinite alternate ease-in-out;
}
</style>