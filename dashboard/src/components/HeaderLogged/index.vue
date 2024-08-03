<template>
  <div class="flex items-center justify-between w-5/6 md:w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="Logo Feedbacker">
    </div>

    <HamburgerMenu 
      class="md:hidden"
      @toggle="toggleNav"
    />

    <div 
      class="
        absolute md:static bottom-0 left-0 top-24 h-0 md:h-auto md:gap-0 
        px-5 md:px-0 right-0 md:w-auto flex flex-col md:flex-row    
      "
      :class="{'hidden md:block': !navActive}"
    >
      <ul 
        class="
          flex flex-col md:flex-row list-none bg-brand-main gap-2 md:gap-0
          rounded-xl p-2 md:p-0 items-center
        "
      >
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
import HamburgerMenu from '@/components/HamburguerMenu'
import useStore from '@/hooks/useStore'
import { clearCurrentUser } from '@/Store/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const navActive = ref(false) 
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

function toggleNav() {
  navActive.value = !navActive.value
}

</script>

<style lang="pcss" scoped>
.links{
    @apply px-6 py-2 font-bold focus:outline-none rounded-full cursor-pointer;
}
</style>