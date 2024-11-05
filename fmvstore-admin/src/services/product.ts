import { axiosInstance } from './axios'

export const productService = {
  getProductDetail: async (id: string) => {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  },
}
