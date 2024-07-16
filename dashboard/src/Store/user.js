import { reactive } from "vue";

const userInitialState = {
  token: '',
  currentUser: {}
}

let state = reactive(userInitialState)

export default state

export function resetUserStore() {
  state = reactive(userInitialState)
}

export function userFromStorage() {
  return JSON.parse(window.localStorage.getItem('user'))
}

export function clearCurrentUser() {
  state.currentUser = {}
  state.token = ''

  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
}

export function setCurrentUser(user) {
  state.currentUser = user
  window.localStorage.setItem('user', JSON.stringify(user))
}

export function setToken(token) {
 state.token = token
 window.localStorage.setItem('token', token)
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey }
  state.currentUser = currentUser
 }