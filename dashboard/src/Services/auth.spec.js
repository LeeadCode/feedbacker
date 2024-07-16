import mockAxios from 'axios'
import AuthService from './Auth'

jest.mock('axios');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token = 'teste.token'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({ email: 'igor@igor.me', password: '123' })
    expect(response.data).toHaveProperty('token')
  })

  it('should return an user when user register', async () => {
    const user = {
      name: 'Igor',
      password: '123',
      email: 'igor@igor.me'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({data: user})
    })

    const response = await AuthService(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
  })

  it('should throw an error when theres not network', async () => {
    const errors = {status: 404, statusText: 'Not Found'}

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({request: errors})
    })

    const response = await AuthService(mockAxios).login({ email: 'igor@igor.me', password: '123' })
    expect(response.erros).toHaveProperty('status')
    expect(response.erros).toHaveProperty('statusText')  
  })
})