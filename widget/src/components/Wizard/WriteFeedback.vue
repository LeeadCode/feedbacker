<template>
  <div class="flex flex-col gap-3 items-center justify-center w-full my-5">
    <textarea 
      v-model="feedback"
      class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"
    />
    <button
      :disabled="submitButtonIsDisabled"
      class="
        rounded-lg font-black flex flex-col justify-center
        items-center py-2 w-full cursor-pointer
        focus:outline-none transition-all duration-200
        "
      :class="{
        'opacity-50': isloading,
        'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
        'bg-brand-main text-white': !submitButtonIsDisabled
      }"
      @click="submitFeedback"
    >
      <Icon 
        name="loading" 
        class="animate-spin" 
        color="white"
        v-if="isloading"
      />
      <template v-else>
        Enviar feedback
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import useNavigation from '@/hooks/navigation'
import useStore from '@/hooks/store'
import Services from '@/Services';
import { setMessage } from '@/store';
import { computed, ref } from 'vue'
import Icon from '@/components/Icon/index.vue'

// state
const { setErrorState, setSuccesState } = useNavigation()
const store = useStore()
const feedback = ref('')
const isloading = ref(false)
const hasError = ref<Error | null>(null)

// computed
const submitButtonIsDisabled = computed<boolean>(() => {
  return !feedback.value.length
})

// fn
function handleError(error: Error) {
  hasError.value = error
  isloading.value = false
  setErrorState()
}

async function submitFeedback(): Promise<void> {
  setMessage(feedback.value)
  isloading.value = true
  try {
    const response = await Services.feedbacks.create({
      type: store.feedbackType,
      text: store.message,
      page: store.currentPage,
      apiKey: store.apiKey,
      device: window.navigator.userAgent,
      fingerprint: store.fingerprint
    })

    if(!response.error) {
      setSuccesState()
    } 
    else {
      setErrorState()
    }

    isloading.value = false

  } catch (e) {
    handleError(e as Error)
  }
}
</script>