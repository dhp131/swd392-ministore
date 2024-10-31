import { axiosInstance } from './axios'

const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/token', data)
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const authService = {
  login,
}
