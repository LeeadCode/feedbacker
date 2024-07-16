<template>
  <div class="flex items-center justify-between w-full md:w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="Logo Feedbacker">
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({ name: 'Credentials' })"
          class="links text-white"
        >
          Credentials
        </li>

        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          class="links text-white"
        >
          Feedbacks
        </li>

        <li
          @click="handleLogout"
          class="links bg-white text-brand-main"
          id="logout-button"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import useStore from '@/hooks/useStore';
import { clearCurrentUser } from '@/Store/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore('User')

const logoutLabel = computed(() => {
  if(!store.currentUser.name){
    return '...'
  }

  return `${store.currentUser.name} (sair)`
})

function handleLogout () {
  clearCurrentUser()
  router.push({name: 'Home'})
}

</script>

<style lang="pcss" scoped>
.links{
    @apply px-6 py-2 font-bold focus:outline-none rounded-full cursor-pointer;
}
</style>