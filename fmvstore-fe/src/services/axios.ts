import axios from 'axios'

const accessToken = localStorage.getItem('access_token')
const headers: any = {
  'Content-Type': 'application/json',
}

if (accessToken) {
  headers.Authorization = 'Bearer ' + accessToken
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/store',
  headers: headers,
})

axiosInstance.interceptors.request.use(
  (config) => {
    // handle before request is sent
    return config
  },
  (error) => {
    // handle request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // handle response data
    return response
  },
  (error) => {
    // handle response un-authen error
    if (error.response.status === 401) {
      console.log('401')
    }
    return Promise.reject(error)
  }
)
