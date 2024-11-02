import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { formatCurrency } from '@/helper'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

type ProductCardProps = {
  id: number
  name: string
  price: number
  category: string
  image: string
  discount: number
  react: boolean
}

const ProductCard = ({ id, name, price, category, image, discount, react }: ProductCardProps) => {
  const navigate = useNavigate()
  const navigateToProductDetail = () => {
    navigate(`/products/${id}`)
  }
  return (
    <div
      key={id}
      onClick={navigateToProductDetail}
      className="relative flex flex-col justify-betweeb items-start p-4 border-[#FFFFFF] border cursor-pointer hover:border hover:border-[#FCA120] hover:rounded-lg gap-1 group"
    >
      <div className="absolute right-2 top-2 cursor-pointer">
        {react ? <HeartIconSolid className="w-8 h-8 text-[#FCA120]" /> : <HeartIconOutline className="w-8 h-8 " />}
      </div>

      {discount > 0 && (
        <div className="absolute left-2 top-2 w-fit bg-[#399C5A] text-[#FFFFFF] px-2 py-1">{discount}% OFF</div>
      )}
      <img src={image} alt={name} className="h-[170px] object-cover" />
      <div className="text-[#6B6565] text-[14px]">{category}</div>
      <div className="">{name}</div>
      <div className="text-[18px] font-semibold">{formatCurrency(price)}</div>
      <Button
        onClick={(event) => {
          event.stopPropagation()
          console.log('1231')
        }}
        variant={'custom'}
        className="bg-[#FCA120] text-[#FFFFFF] text-center w-full rounded-sm mt-2 !h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Thêm vào giỏ hàng
      </Button>
    </div>
  )
}

export default ProductCard
