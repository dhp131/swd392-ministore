import { axiosInstance } from './axios'

export const orderService = {
  checkout: async (promotionCode?: string) => {
    let response: any
    // if (promotionCode) {
    //   response = await axiosInstance.post('/orders/checkout', {
    //     promotionCode,
    //   })
    // } else {
    //   response = await axiosInstance.post('/orders/checkout')
    // }
    response = await axiosInstance.post('/orders/checkout')
    console.log('🚀 ~ checkout: ~ response:', response)
    return response.data
  },
  getOrders: async () => {
    const response = await axiosInstance.get('/orders')
    console.log('🚀 ~ getOrders: ~ response:', response)
    return response.data
  },
  rejectOrder: async (orderId: string) => {
    const response = await axiosInstance.post(`/orders/reject?orderId=${orderId}`)
    console.log('🚀 ~ rejectOrder: ~ response:', response)
    return response.data
  },
}
