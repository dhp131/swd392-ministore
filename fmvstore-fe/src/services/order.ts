import { axiosInstance } from './axios'

export const orderService = {
  checkout: async () => {
    const response = await axiosInstance.post('/orders/checkout')
    console.log('🚀 ~ checkout: ~ response:', response)
    return response.data
  },
}
