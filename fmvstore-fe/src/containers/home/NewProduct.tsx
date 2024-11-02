import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Product1 from '@/assets/products/product-1.png'
import Product2 from '@/assets/products/product-2.png'
import Product3 from '@/assets/products/product-3.png'
import Product4 from '@/assets/products/product-4.png'
import Product5 from '@/assets/products/product-5.png'
import Product6 from '@/assets/products/product-6.png'
import ProductCard from './ProductCard'

const buttons = [
  {
    id: 1,
    title: 'Nước',
    isActive: false,
  },
  {
    id: 2,
    title: 'Thức ăn',
    isActive: true,
  },
  {
    id: 3,
    title: 'Dịch vụ tiện ích',
    isActive: false,
  },
  {
    id: 4,
    title: 'Đồ dùng',
    isActive: false,
  },
  {
    id: 5,
    title: 'Mỹ phẩm',
    isActive: false,
  },
]

const products = [
  {
    id: 1,
    name: 'OSTAR Khoai tây chiên vị trứng muối 56g',
    rating: 4,
    review: 4.1,
    price: 25000,
    image: Product1,
  },
  {
    id: 2,
    name: "C'est Bon Bánh bông lan gạo 90g",
    rating: 4,
    review: 4.1,
    price: 95500,
    image: Product2,
  },
  {
    id: 3,
    name: 'ORION Bánh Gạo An vị tảo biển 111.3g',
    rating: 4,
    review: 4.1,
    price: 55550,
    image: Product3,
  },
  {
    id: 4,
    name: 'OSTAR Khoai tây chiên vị kim chi 63g',
    rating: 4,
    review: 4.1,
    price: 22000,
    image: Product4,
  },
  {
    id: 5,
    name: 'SWING MAXX KTC vị bò nướng 108g',
    rating: 4,
    review: 4.1,
    price: 31000,
    image: Product5,
  },
  {
    id: 6,
    name: 'ORION Snack khoai tây bốn vị 150g',
    rating: 4,
    review: 4.1,
    price: 15000,
    image: Product6,
  },
]

const NewProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-20 ">
      <div className="text-4xl">Sản phẩm mới</div>
      <div className="text-[#8A8A8A]">
        Snack khoai tây vị kim chi Hàn Quốc o'star gói 63g giòn rụm thơm ngon với gia vị đậm đà hoàn hảo
      </div>
      <div className="flex px-10 justify-between w-full">
        {buttons.map((button) => (
          <Button
            variant={'custom'}
            size={'custom'}
            key={button.id}
            className={clsx('', {
              'bg-[#FCA120] text-[#FFFFFF]': button.isActive,
              'bg-[#e1f0e6] text-[#8A8A8A]': !button.isActive,
            })}
          >
            {button.title}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-[60px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Button variant={'custom'} size={'custom'} className="bg-[#FF0606]">
        Xem thêm
      </Button>
    </div>
  )
}

export default NewProduct
