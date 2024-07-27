import { reactive, readonly } from "vue";

export const initialState = {
  currentComponent: 'SelectFeedbackType',
  message: '',
  feedbackType: '',
  fingerprint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<typeof initialState>({ ...initialState })

export function setCurrentComponent(component: string) {
  state.currentComponent = component
}

export function setMessage(message: string) {
  state.message = message
}

export function setfeedbackType(feedbackType: string) {
  state.feedbackType = feedbackType
}

export function setfingerPrint(fingerprint: string) {
  state.fingerprint = fingerprint
}

export function setApiKey(apiKey: string) {
  state.apiKey = apiKey
}

export function setcurrentPage(currentPage: string) {
  state.currentPage = currentPage
}

export function resetStore() {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setfeedbackType(initialState.feedbackType)
  setfingerPrint(initialState.fingerprint)
  setApiKey(initialState.apiKey)
  setcurrentPage(initialState.currentPage)
}

export default readonly(state)