<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged/>
  </div>

  <SubHeader
    title="Feedbacks"
    subTitle="Detalhes de todos os feedbacks recebidos."
  />

  <div class="flex justify-center w-full pb-20">
    <div class="md:grid md:grid-cols-4 w-full gap-2 py-10">
      <div class="px-8">
        <h1 class="text-3xl font-black text-brand-darkgray">
          Listagem
        </h1>
        <Suspense>
          <Filters 
            class="mt-8 animate__animated animate__fadeIn animate__faster"
            @select="changeFeedbackType"
          />
          <template #fallback>
            <FiltersLoading class="mt-8" />
          </template>
        </Suspense>
      </div>
      <div class="col-span-3 md:px-10 pt-10 md:pt-20">
        <p 
          v-if="hasErros"
          class="text-xl text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks🫣
        </p>

        <p 
          v-if="!feedbacks.length && !isLoading && !isLoadingFeedbacks && !hasErros"
          class="text-xl text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido🙄
        </p>
      
        <FeedbackCardLoading v-if="isLoading || isLoadingFeedbacks" />
        <FeedbackCard 
          v-else
          v-for="(feedback, index) in feedbacks" 
          :key="feedback.id"
          :isOpened="index === 0"
          :feedback="feedback"
          class="mb-8"
        /> 
        <FeedbackCardLoading v-if="isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { onErrorCaptured, onMounted, onUnmounted, ref } from 'vue'

import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import SubHeader from '@/components/SubHeader'
import HeaderLogged from '@/components/HeaderLogged'
import FeedbackCard from '@/components/FeedbackCard'
import FeedbackCardLoading from '@/components/FeedbackCard/FeedbackCardLoading'
import Services from '@/Services'

const feedbacks = ref([])
const hasErros = ref(false)
const isLoading = ref(false)
const isLoadingFeedbacks = ref(false)
const isLoadingMoreFeedbacks = ref(false)
const pagination = ref({
  limit: 5,
  offset: 0,
  total: 0
})
const currentFeedbackType = ref('')

function handleErrors(e) {
  isLoading.value = false
  isLoadingFeedbacks.value = false
  isLoadingMoreFeedbacks.value = false
  hasErros.value = !!e
}

async function handleScroll() {
  const isBottonOfWindow = Math.ceil(
    document.documentElement.scrollTop + window.innerHeight
  ) >= document.documentElement.scrollHeight

  // Trata condicoes
  if((isLoading.value || isLoadingMoreFeedbacks.value) || 
    (!isBottonOfWindow) || 
    (feedbacks.value.length >= pagination.value.total)) 
      return
  
  try {
    isLoadingMoreFeedbacks.value = true

    // Fetch
    const { data } = await Services.feedbacks.getAll({
      ...pagination.value,
      type: currentFeedbackType.value,
      offset: (pagination.offset + 5)
    })

    if(data.results.length > 0)
      feedbacks.value.push(...data.results)

    isLoadingMoreFeedbacks.value = false  
    pagination.value = data.pagination

  } catch (e) {
    handleErrors(e)
  }
}

async function changeFeedbackType (type) {
  try {
    // Reseta
    isLoadingFeedbacks.value = true
    pagination.value.limit = 5
    pagination.value.offset = 0
    currentFeedbackType.value = type

    // Fetch
    const { data } = await Services.feedbacks.getAll({
      ...pagination.value,
      type
    })
    feedbacks.value = data.results
    pagination.value = data.pagination

    isLoadingFeedbacks.value = false
  } catch (e) {
    handleErrors(e)
  }
}

onErrorCaptured(handleErrors)

onMounted(() => {
  fetchFeedbacks()
  window.addEventListener('scroll', handleScroll, false)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, false)
})

async function fetchFeedbacks() {
  try {
    isLoading.value = true

    const { data } = await Services.feedbacks.getAll({
      ...pagination.value,
      type: currentFeedbackType.value
    })

    feedbacks.value = data.results
    pagination.value = data.pagination

    isLoading.value = false
  } catch (e) {
    handleErrors(e)  
  } 
}
</script>