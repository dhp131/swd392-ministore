import Logo from '@/components/common/Logo'
import Navigation from './Navigation'
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UsersIcon,
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
import { ListOrderedIcon, LogOutIcon, PyramidIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helper'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/stores/user'
import { useNavigate } from 'react-router-dom'
import { cartAtom, updateItemCart } from '@/stores/cart'
import { useState } from 'react'

const UserHeader = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const setUser = useSetAtom(userAtom)
  const navigate = useNavigate()

  const logout = () => {
    setUser(null)
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  const navigateToAccountPage = () => {
    navigate('/account')
  }

  const navigateToOrderPage = () => {
    navigate('/order')
  }

  const navigateToPaymentPage = () => {
    navigate('/payment')
  }

  const cartItem = useAtomValue(cartAtom)

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }
  const totalPrice = cartItem?.reduce((acc, item) => acc + item.item.price * item.quantity, 0) ?? 0

  return (
    <header className="flex flex-col items-center my-12">
      <div className="flex flex-wrap gap-10 justify-between items-center max-w-full w-[1280px]">
        <Logo />
        <Navigation />
        <div className="flex gap-8">
          <MagnifyingGlassIcon className="w-[28px] cursor-pointer" />
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger>
              <div className="relative w-[28px] h-[28px] flex justify-center items-center cursor-pointer">
                <ShoppingCartIcon className="w-[28px] absolute" />
                <div className="absolute -top-2 -right-2 bg-zinc-700 text-[10px] text-white rounded-full w-[16px] h-[16px] flex justify-center items-center">
                  {cartItem?.length ?? 0}
                </div>
              </div>
            </SheetTrigger>
            <SheetContent style={{ maxWidth: '60vw' }} className="p-12 overflow-scroll">
              <SheetHeader>
                <SheetTitle className="flex justify-between gap-4">
                  <div className="text-4xl">Cập nhật giỏ hàng</div>
                  <Button className="w-[240px]" onClick={handleCloseCart}>
                    Tiếp tục mua sắm
                  </Button>
                  <Button
                    className="w-[240px] bg-[#FFD470] text-[#000000]"
                    variant={'custom'}
                    onClick={() => {
                      setIsCartOpen(false)
                      navigate('/checkout')
                    }}
                  >
                    Thanh toán
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {cartItem?.map((product) => (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={product.item?.imageUrl}
                          alt={product.item?.name}
                          className="h-[170px] mr-12 object-cover"
                        />
                        <div className="flex flex-col">
                          <div className="text-[#6B6565] text-[14px]">{'Product Category'}</div>
                          <div className="font-bold text-2xl">{product.item?.name}</div>
                          <div className="">Số lượng: {product?.quantity}</div>
                        </div>
                      </div>
                      <div className="flex gap-12">
                        <div className="flex items-center gap-3">
                          <Button onClick={() => updateItemCart(product.item, -1)} variant={'ghost'}>
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          {product.quantity}
                          <Button onClick={() => updateItemCart(product.item, 1)} variant={'ghost'}>
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-[18px] font-semibold">
                            {formatCurrency(product.item?.price * product.quantity)}
                          </div>
                          <Button
                            onClick={() => updateItemCart(product.item, 0)}
                            variant={'ghost'}
                            className="flex items-center gap-2"
                          >
                            <TrashIcon className="w-4 h-4" />
                            <div className="text-[#FF5252]">Remove</div>
                          </Button>
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
                <div>{cartItem?.length} món hàng</div>
                <div className="grid grid-cols-2 gap-x-12">
                  <div className="text-right">Subtotal</div>
                  <div>{formatCurrency(totalPrice)}</div>
                  <div className="text-right">Shipping</div>
                  <div>{formatCurrency(0)}</div>
                  <div className="text-right">Discounts & Coupons</div>
                  <div>{formatCurrency(0)}</div>
                  <div className="text-right font-bold">Total</div>
                  <div className="font-bold">{formatCurrency(totalPrice)}</div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserIcon className="w-[28px] cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={navigateToAccountPage}>
                  <UsersIcon className="mr-2 h-4 w-4" />
                  <span>Thông tin cá nhân</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={navigateToOrderPage}>
                  <ListOrderedIcon className="mr-2 h-4 w-4" />
                  <span>Lịch sử mua hàng</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={navigateToPaymentPage}>
                  <PyramidIcon className="mr-2 h-4 w-4" />
                  <span>Nạp tiền</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuLabel>Hoạt động</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOutIcon className="w-4 h-4 mr-2 cursor-pointer" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default UserHeader
