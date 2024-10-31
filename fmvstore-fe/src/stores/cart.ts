import { Product } from '@/types'
import { atomWithStorage } from 'jotai/utils'
import { getDefaultStore } from 'jotai'

type CartItem = {
  item: Product
  quantity: number
}

const cartAtom = atomWithStorage<CartItem[] | null>('cart', null)

const addItemToCart = (product: Product) => {
  const store = getDefaultStore()
  const cart = store.get(cartAtom)
  let newCart: CartItem[]

  if (cart) {
    const existingItemIndex = cart.findIndex((item) => item.item.name === product.name) //fix with id later
    if (existingItemIndex !== -1) {
      newCart = cart.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      newCart = [...cart, { item: product, quantity: 1 }]
    }
  } else {
    newCart = [{ item: product, quantity: 1 }]
  }

  store.set(cartAtom, newCart)
}

export { cartAtom, addItemToCart }
