import { shallowMount } from '@vue/test-utils'
import HeaderLogged from '.'
import { routes } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }
jest.mock('../../hooks/useStore', () => {
  return () => mockStore
})

async function customBeforeEach(fn) {
  router.push('/')
  await router.isReady()

  if(fn) fn()

  return(shallowMount(HeaderLogged, {
    global: {
      plugins: [router]
    }
  }))
}

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    const wrapper = await customBeforeEach()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render 3 dots when theres not user logged', async () => {
    const wrapper = await customBeforeEach()
    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('...')
  })

  it('should render a user name when user logged', async () => {
    const wrapper = await customBeforeEach(() => mockStore.currentUser.name = 'Igor')
    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('Igor (sair)')
  })
})