import PageLayout from '@/components/common/PageLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import ProductImage1 from '@/assets/product-items/image1.png'
import ProductImage2 from '@/assets/product-items/image2.png'
import ProductImage3 from '@/assets/product-items/image3.png'
import ProductImage4 from '@/assets/product-items/image4.png'
import ProductImage5 from '@/assets/product-items/image5.png'
import ProductImage6 from '@/assets/product-items/image6.png'
import ProductImage7 from '@/assets/product-items/image7.png'
import ProductItem8 from '@/assets/product-items/image8.png'
import ProductItem9 from '@/assets/product-items/image9.png'
import ProductItem10 from '@/assets/product-items/image10.png'
import ProductItem11 from '@/assets/product-items/image11.png'
import ProductItem12 from '@/assets/product-items/image12.png'
import ProductItem13 from '@/assets/product-items/image13.png'
import ProductItem14 from '@/assets/product-items/image14.png'
import ProductItem15 from '@/assets/product-items/image15.png'
import ProductCard from '@/components/common/ProductCard'

const productItems = [
  {
    id: 1,
    name: 'Hành tây 500g',
    price: 23000,
    category: 'Rau tươi',
    image: ProductImage1,
    discount: 0,
    react: false,
  },
  {
    id: 2,
    name: 'Tỏi củ túi',
    price: 13000,
    category: 'Rau tươi',
    image: ProductImage2,
    discount: 0,
    react: false,
  },
  {
    id: 3,
    name: 'Chanh không hạt',
    price: 13000,
    category: 'Rau tươi',
    image: ProductImage3,
    discount: 50,
    react: true,
  },
  {
    id: 4,
    name: 'Cải thảo',
    price: 16000,
    category: 'Rau tươi',
    image: ProductImage4,
    discount: 16,
    react: false,
  },
  {
    id: 5,
    name: 'Dưa leo khổng lặc',
    price: 19000,
    category: 'Rau tươi',
    image: ProductImage5,
    discount: 25,
    react: false,
  },
  {
    id: 6,
    name: 'Bắp cải',
    price: 16000,
    category: 'Rau tươi',
    image: ProductImage6,
    discount: 40,
    react: true,
  },
  {
    id: 7,
    name: 'Bí đao',
    price: 16000,
    category: 'Rau tươi',
    image: ProductImage7,
    discount: 0,
    react: false,
  },
  {
    id: 8,
    name: 'Cà rốt',
    price: 20000,
    category: 'Rau tươi',
    image: ProductItem8,
    discount: 0,
    react: false,
  },
  {
    id: 9,
    name: 'Bắp mỹ',
    price: 24000,
    category: 'Rau tươi',
    image: ProductItem9,
    discount: 5,
    react: false,
  },
  {
    id: 10,
    name: 'Bắp nếp',
    price: 24000,
    category: 'Rau tươi',
    image: ProductItem10,
    discount: 0,
    react: false,
  },
  {
    id: 11,
    name: 'Đậu hủ',
    price: 3000,
    category: 'Rau tươi',
    image: ProductItem11,
    discount: 0,
    react: true,
  },
  {
    id: 12,
    name: 'Kim chi chichi',
    price: 55000,
    category: 'Rau tươi',
    image: ProductItem12,
    discount: 40,
    react: false,
  },
  {
    id: 13,
    name: 'Nấm kim châm hàn',
    price: 19000,
    category: 'Rau tươi',
    image: ProductItem13,
    discount: 0,
    react: false,
  },
  {
    id: 14,
    name: 'Nấm đùi gà',
    price: 40000,
    category: 'Rau tươi',
    image: ProductItem14,
    discount: 0,
    react: true,
  },
  {
    id: 15,
    name: 'Rong nho',
    price: 120000,
    category: 'Rau tươi',
    image: ProductItem15,
    discount: 0,
    react: false,
  },
]

const ProductsContainer = () => {
  return (
    <PageLayout>
      <div className="flex flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Cửa hàng</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Rau củ & Trái cây</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Rau tươi</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4 my-8">
          <div className="font-bold text-3xl">Rau Tươi</div>
          <div>(57)</div>
        </div>
      </div>
      <div className="bg-[#FCA120] flex justify-between h-[64px] rounded-lg p-6">
        <div className="flex gap-6">
          <div className="flex justify-center items-center gap-1 ">
            Giá giảm dần <ChevronDownIcon className="size-4" />
          </div>
          <div className="flex justify-center items-center gap-1">
            Kích thước <ChevronDownIcon className="size-4" />
          </div>
          <div className="flex justify-center items-center gap-1">
            Giảm giá <ChevronDownIcon className="size-4" />
          </div>
          <div className="flex justify-center items-center gap-1">
            Vườn <ChevronDownIcon className="size-4" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-1">
          Mới về <ChevronDownIcon className="size-4" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-8 py-4 px-2">
        {productItems.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </PageLayout>
  )
}

export default ProductsContainer
