import { Category } from '@/types'
import { axiosInstance } from './axios'

const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/category')
    console.log(response.data)
    return response.data as Category[]
  } catch (error) {
    console.error(error)
  }
}

export const categoryService = {
  getAllCategories,
}
