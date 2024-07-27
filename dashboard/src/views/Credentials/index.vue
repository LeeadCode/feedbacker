<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged/>
  </div>

  <SubHeader
    title="Credenciais"
    subTitle="Guia de instalação e geração de suas credenciais."
  />

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        instalação e configuração
      </h1>
      <p class="info-text mt-10">
        Esta aqui é a sua chave de api
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div 
        v-else
        class="flex justify-between py3 pl-5 mt-2 rounded items-center bg-brand-gray w-4/5 md:w-2/3 animate__animated animate__fadeIn animate__faster"
      >
        <span v-if="hasErrors">Erro ao carregar ApiKey</span>
        <span v-else id="apikey" class="">{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!hasErrors" class="flex gap-3 items-center mr-5">
          <Icon
            name="copy"
            :color="brandColors.darkgray"
            size="20"
            class="cursor-pointer"
            @click="handle Copy"
          />
          <Icon
            id="generate-apikey"
            name="loading"
            :color="brandColors.darkgray"
            size="20"
            class="cursor-pointer"
            @click="handleGenerate ApiKey"
          />
        </div>
      </div>

      <p class="info-text mt-5">
        Coloque o script abaixo no seu site para começar a receber FeedBacks😊
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div 
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-4/5 md:w-2/3 overflow-x-scroll animate__animated animate__fadeIn animate__faster"
      >
        <span v-if="hasErrors">Erro ao carregar Script</span>
        <pre v-else>&lt;script src="https://igorhalfeld-feedbacker-widget.netlify.app?api_key={{ store.User.currentUser.apiKey }}&gt;&lt;/script&gt;"</pre>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import HeaderLogged from '../../components/HeaderLogged'
import SubHeader from '@/components/SubHeader'
import ContentLoader from '@/components/ContentLoader'
import Icon from '@/components/Icon/'
import useStore from '@/hooks/useStore'
import palette from '../../../palette'
import { ref, watch } from 'vue'
import Services from '@/Services'
import { setApiKey } from '@/Store/user'

const brandColors = palette.brand
const store = useStore()

const isLoading = ref(false)
const hasErrors = ref(false)

async function handleGenerateApiKey() {
  try {
    isLoading.value = true

    const { data } = await Services.users.generateApiKey()
    setApiKey(data.apiKey)

    isLoading.value = false
  } catch (error) {
    handleErrors(error)
  }
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(store.User.currentUser.apiKey)
  } catch (error) {
    handleErrors(error)
  }
}

function handleErrors(e) {
  isLoading.value = false
  hasErrors.value = !!e
}

watch(() => store.User.currentUser, () => {
  if(!store.Global.isLoading && !store.User.currentUser.apiKey) {
    handleErrors(true)
  }
})

</script>

<style lang="pcss" scoped>
.info-text {
  @apply text-lg text-gray-800 font-regular;
}
</style>