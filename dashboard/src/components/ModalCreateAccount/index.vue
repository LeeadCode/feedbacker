<template>
  <div class="flex justify-between" id="modal-create-account">
    <h1 class="text-4xl text-gray-600">
      Crie uma conta
    </h1>
    <button 
      class="text-4xl text-gray-600 focus:outline-none" 
      @click="close"
    >
      &times;
    </button>
  </div>

  <div class="mt-6">
    <CustomForm ref="validateForm">
      <form-field 
        name="nome"
        placeholder="Seu nome" 
        type="text" 
        :validate="validateEmptyAndLength(3)" 
        v-model="state.name"
      >
        Nome
      </form-field>

      <form-field 
        name="email"
        placeholder="cliente@gmail.com" 
        type="email" 
        :validate="validateEmptyAndEmail" 
        v-model="state.email"
      >
        Email
      </form-field>

      <form-field 
        name="password"
        type="password" 
        :validate="validateEmptyAndLength(3)" 
        v-model="state.password"
      >
        Senha
      </form-field>

      <button 
        @click.prevent="handleSubmit"
        type="submit" 
        :disabled="state.isLoading" 
        :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Criar</span>
      </button>
    </CustomForm>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import useModal from '../../hooks/useModal'
import CustomForm from '../CustomForm'
import FormField from '../FormField'
import Icon from '../Icon'
import Services from '../../Services'
import { validateEmptyAndLength, validateEmptyAndEmail } from '../../utils/validators'
import { setCurrentUser, setToken } from '../../Store/user'

export default {
  components: { FormField, CustomForm, Icon },

  setup() {
    const router = useRouter()
    const modal = useModal()

    const validateForm = ref({})

    const state = reactive({
      hasErros: false,
      isLoading: false,
      name: '',
      email: '',
      password: ''
    })

    async function login({email, password}) {

      const {data, errors} = await Services.auth.login({
        email: email,
        password: password
      })

      if(!errors) {
        setToken(data.token);
        router.push({name:'Feedbacks'})
        modal.close()
      }

      state.isLoading = false
    }

    async function handleSubmit () {
      // Trata Validacao
      if(!validateForm.value.validate()) {
        return
      }

      try {
        state.isLoading = true

        const { errors } = await Services.auth.register({
          name: state.name,
          email: state.email,
          password: state.password
        })

        if (!errors) { 
          await login({
            email: state.email,
            password: state.password
          })
          return
        }

        if (errors.status === 400) {
          alert('Ocorreu um erro ao criar a conta')
        }

        state.isLoading = false
      } catch (error) {
        alert('erro interno do servidor, tente novamente mais tarde!')
        state.isLoading = false
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
      validateEmptyAndLength,
      validateEmptyAndEmail,
      validateForm
    }
  }
}
</script>