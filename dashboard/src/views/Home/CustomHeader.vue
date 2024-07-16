<template>
    <header class="header">
        <div class="header-group">
            <div class="flex items-center justify-between py-10">
                <div class="w-28 lg:w-36">
                <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
            </div>

            <div class="flex">
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
  
<script>
export default {
    setup(_, {emit}){
        return {emit}
    }
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
    @apply flex flex-col w-4/5 max-w-6xl;
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