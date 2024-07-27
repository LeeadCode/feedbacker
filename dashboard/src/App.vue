<template>
  <modal-factory/>
  <router-view/>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue'
import ModalFactory from './components/ModalFactory'
import Services from './Services';
import { clearCurrentUser, setCurrentUser } from './Store/user';

const router = useRouter()
const route = useRoute()

async function reloadUser(onError) {
  const token = window.localStorage.getItem('token')

  if(token){
    const {data, errors} = await Services.users.getMe()

    if(errors && (errors.status === 401 || errors.status === 404 || errors.status === 403)){
      clearCurrentUser()

      // Chama CallBack
      if(onError)
        onError()
    }

    setCurrentUser(data)
  }
}

onMounted(() => {
  let FeedbackWidget = document.createElement('script')
  FeedbackWidget.setAttribute('defer', '')
  FeedbackWidget.setAttribute('async', '')
  FeedbackWidget.setAttribute('onload', "init('fcd5015c-10d3-4e9c-b395-ec7ed8850165')")
  FeedbackWidget.setAttribute('src', 'https://feedbackeer-widget.netlify.app/init.js')

  document.body.appendChild(FeedbackWidget)
})

watch(() => route.path, async () => {
  if(route.meta.hasAuth) {
    const token = window.localStorage.getItem('token')

    if(!token){
      router.push('/')
      return
    }

    await reloadUser(() => {
      router.push('/')
    })
  }
})
</script>