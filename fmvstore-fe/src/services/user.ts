import { axiosInstance } from './axios'

export const userService = {
  me: async (uid: string) => {
    const response = await axiosInstance.get(`/users/${uid}`)
    return response.data
  },
  update: async (data: any) => {
    const response = await axiosInstance.put(`/users/${data.id}`, data)
    return response.data
  },
}
