import useStore from "../hooks/useStore"
import {
  setCurrentUser,
  resetUserStore,
  setApiKey,
  clearCurrentUser
} from "./user"

describe('User Store', () => {
  let store

  beforeEach(() => {
    store = useStore()
  })

  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    setCurrentUser({ name: 'Igor' })
    expect(store.User.currentUser.name).toBe('Igor')
  })

  it('should set API Key on current user', () => {
    setApiKey('teste_apikey')
    expect(store.User.currentUser.apiKey).toBe('teste_apikey')
  })

  it('should clean current user', () => {
    setCurrentUser({ name: 'Igor' })
    expect(store.User.currentUser.name).toBe('Igor')

    clearCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})