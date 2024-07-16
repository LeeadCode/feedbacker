<template>
    <div class="flex justify-between" id="modal-login">
      <h1 class="text-4xl text-gray-600">
          Entre em sua conta
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
        id="email-login-field"
        v-model="state.email"
        name="email"  
        placeholder="cliente@gmail.com"
        type="email"
        :validate="validateEmptyAndEmail"
      >
      Email
      </form-field>

      <form-field
        id="password-login-field" 
        v-model="state.password"
        name="password"
        type="password"
        :validate="validateEmptyAndLength(3)"
      >
      Senha
      </form-field>

      <button
        id="submit-login-button" 
        @click.prevent="handleSubmit"
        type="submit"
        :disabled="state.isLoading"
        :class="{'opacity-50': state.isLoading}"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin"/>
        <span v-else>Entrar</span>
      </button>
    </CustomForm>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import useModal from '../../hooks/useModal'
import FormField from '../FormField'
import CustomForm from '../CustomForm'
import Icon from '../Icon'
import Services from '../../Services'
import {validateEmptyAndLength, validateEmptyAndEmail} from '../../utils/validators'
import { setToken } from '../../Store/user'

export default {
  components: {FormField, Icon, CustomForm},

  setup(){
    const router = useRouter()
    const modal = useModal()

    const validateForm = ref({})

    const state = reactive({
      isLoading: false,
      email: '',
      password: '',
    })

    async function handleSubmit() {
      // Trata Validacao
      if(!validateForm.value.validate()) {
        return
      }

      try {
        state.isLoading = true

        const {data, erros} = await Services.auth.login({
          email: state.email,
          password: state.password
        })

        if(!erros) {
          setToken(data.token);
          state.isLoading = false
          router.push({name:'Feedbacks'})
          modal.close()
          return
        }

        if(erros.status === 404){
          alert('email não encontrado') 
        }
        if(erros.status === 401){
          alert('email ou senha invalidos')
        }
        if(erros.status === 400){
          alert('erro generico')
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