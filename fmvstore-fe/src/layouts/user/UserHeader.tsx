import Logo from '@/components/common/Logo'
import Navigation from './Navigation'
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UsersIcon,
  CreditCardIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductImage1 from '@/assets/product-items/image1.png'
import ProductImage2 from '@/assets/product-items/image2.png'
import { formatCurrency } from '@/helper'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

const UserHeader = () => {
  const cartItem = 2
  const productItems = [
    {
      id: 1,
      name: 'Hành tây 500g',
      price: 23000,
      category: 'Rau tươi',
      image: ProductImage1,
      quantity: 5,
    },
    {
      id: 2,
      name: 'Tỏi củ túi',
      price: 13000,
      category: 'Rau tươi',
      image: ProductImage2,
      quantity: 4,
    },
  ]

  return (
    <header className="flex flex-col items-center my-12">
      <div className="flex flex-wrap gap-10 justify-between items-center max-w-full w-[1280px]">
        <Logo />
        <Navigation />
        <div className="flex gap-8">
          <MagnifyingGlassIcon className="w-[28px] cursor-pointer" />
          <Sheet>
            <SheetTrigger>
              <div className="relative w-[28px] h-[28px] flex justify-center items-center cursor-pointer">
                <ShoppingCartIcon className="w-[28px] absolute" />
                <div className="absolute -top-2 -right-2 bg-zinc-700 text-[10px] text-white rounded-full w-[16px] h-[16px] flex justify-center items-center">
                  {cartItem}
                </div>
              </div>
            </SheetTrigger>
            <SheetContent style={{ maxWidth: '60vw' }} className="p-12">
              <SheetHeader>
                <SheetTitle className="flex justify-between">
                  <div className="text-4xl">Cập nhật giỏ hàng</div>
                  <Button className="w-[240px]">Tiếp tục mua sắm</Button>
                  <Button className="w-[240px] bg-[#FFD470] text-[#000000]" variant={'custom'}>
                    Thanh toán
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {productItems.map((product) => (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="h-[170px] mr-12 object-cover" />
                        <div className="flex flex-col">
                          <div className="text-[#6B6565] text-[14px]">{product.category}</div>
                          <div className="font-bold text-2xl">{product.name}</div>
                          <div className="">Số lượng: {product.quantity}</div>
                        </div>
                      </div>
                      <div className="flex gap-12">
                        <div className="flex items-center gap-3">
                          <MinusIcon className="w-4 h-4" />
                          {product.quantity}
                          <PlusIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[18px] font-semibold">
                            {formatCurrency(product.price * product.quantity)}
                          </div>
                          <div className="flex items-center gap-2">
                            <TrashIcon className="w-4 h-4" />
                            <div className="text-[#FF5252]">Remove</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-2 h-0.5" />
                  </div>
                ))}
              </div>
              <Separator className="my-2 h-0.5 mt-[60px]" />
              <div className="flex gap-[120px] items-center my-8">
                <div>Mã giảm giá</div>
                <Input className="w-[300px]" />
              </div>
              <Separator className="my-2 h-0.5" />
              <div className="flex justify-between">
                <div>2 món hàng</div>
                <div className="grid grid-cols-2 gap-x-12">
                  <div className="text-right">Subtotal</div>
                  <div>{formatCurrency(167000)}</div>
                  <div className="text-right">Shipping</div>
                  <div>{formatCurrency(0)}</div>
                  <div className="text-right">Discounts & Coupons</div>
                  <div>{formatCurrency(0)}</div>
                  <div className="text-right font-bold">Total</div>
                  <div className="font-bold">{formatCurrency(167000)}</div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserIcon className="w-[28px] cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UsersIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default UserHeader
