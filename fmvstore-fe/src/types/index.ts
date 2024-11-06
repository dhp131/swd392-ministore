export type User = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  number: number
  address: string
}

export type Category = {
  name: string
  description: string
  products: Product[]
}

export type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
  status: number
}
