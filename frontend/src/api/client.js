import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use(
  (config) => {
    try {
      const tokenJson = window.localStorage.getItem('sportiq_token')

      if (tokenJson) {
        const token = JSON.parse(tokenJson)

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch (error) {
      console.warn('Error reading token from localStorage', error)
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default client