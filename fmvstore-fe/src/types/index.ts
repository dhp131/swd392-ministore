export type User = {
  username: string
}

export type Category = {
  name: string
  description: string
  products: Product[]
}

export type Product = {
  name: string
  price: number
  imageUrl: string
  status: number
}
