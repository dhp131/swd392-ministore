import { Ratings } from '@/components/ui/rating'
import { formatCurrency } from '@/helper'
import React from 'react'

type Product = {
  name: string
  rating: number
  review: number
  price: number
  image: string
}

type ProductProps = {
  product: Product
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="flex flex-col font-medium max-w-[336px] text-zinc-700 bg-[#FFFFFF] rounded-[10px] py-6 px-8">
      <img
        loading="lazy"
        src={product.image}
        alt={product.name}
        className="object-contain self-center w-full aspect-[1.27] max-w-[290px]"
      />
      <div className="flex mt-3 text-xl">
        <h2 className="grow shrink w-[222px]">{product.name}</h2>
        {/* <StarRating src={ratingImageSrc} /> */}
      </div>
      <p className="self-start mt-6 text-xs">({product.review}) Customer Reviews</p>
      <div className="flex items-center justify-between mt-6">
        <p className="self-start text-2xl tracking-tight leading-none">{formatCurrency(product.price)}</p>
        <Ratings rating={product.rating} color="#FCA120" />
      </div>
    </div>
  )
}

export default ProductCard
