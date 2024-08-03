<template>
    <header class="header">
        <div class="header-group">
            <div class="flex items-center justify-between py-10">
              <div class="w-28 lg:w-36">
                <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
              </div>

              <HamburgerMenu 
                class="md:hidden"
                @toggle="toggleNav"
              />

            <div 
              class="
                absolute md:static bottom-0 top-24 h-0 md:h-auto gap-5 md:gap-0 
                px-5 md:px-0 right-0 w-3/6 md:w-auto flex flex-col md:flex-row
              "
              :class="{'hidden md:block': !navActive}"
            >
                <button 
                    id="header-login-button"
                    class="button bg-white text-brand-main"
                    @click="() => emit('login')"
                >
                    Entrar
                </button>
                <button 
                    id="header-create-account-button"
                    class="button text-white"
                    @click="() => emit('create-account')"
                >
                    Crie uma conta
                </button>
            </div>
        </div>

            <div class="flex flex-col mt-28">
                <h1 class="text-4xl font-black text-white">
                    Tenha um feedback. <br>
                    E faça seus clientes mais <br class="hidden lg:inline-block">    
                    felizes!
                </h1>
                <p class="text-lg font-medium text-white">
                    Receba ideias, reclamações e feedbacks com um simples widget na página.
                </p>
                <div>
                    <button 
											id="cta-create-account-button"
											class="button bg-white text-brand-main mt-10"
											@click="() => emit('create-account')"
                    >
                        Crie uma conta grátis
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
  
<script setup>
import { ref } from 'vue';
import HamburgerMenu from '@/components/HamburguerMenu'

const navActive = ref(false) 
const emit = defineEmits(['login', 'create-account'])

function toggleNav() {
  navActive.value = !navActive.value
}
</script>

<style lang="pcss" scoped>
.header{
    @apply bg-brand-main w-full flex justify-center;
    height: 700px;
}

.button{
    @apply px-6 py-2 font-bold rounded-full focus:outline-none;
}

.header-group{
    @apply flex flex-col w-5/6 md:w-4/5 max-w-6xl;
}

@media (min-width: 640px){
    .header-group {
        background-image: url(../../assets/images/blue_balloons.png);
        background-size: 628px;
        background-position: 90% 100%;
        background-repeat: no-repeat;
    }
}
</style>