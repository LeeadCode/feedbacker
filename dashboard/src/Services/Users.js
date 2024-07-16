export default httpClient => ({
  getMe: async () => {
    const response = await httpClient.get('/users/me')

    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },
  generateApiKey: async () => {
    const response = await httpClient.post('/users/me/apikey')

    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})