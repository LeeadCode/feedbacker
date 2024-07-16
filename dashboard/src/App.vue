<template>
  <modal-factory/>
  <router-view/>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue'
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