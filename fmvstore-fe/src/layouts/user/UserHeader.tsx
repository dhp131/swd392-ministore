import Logo from '@/components/common/Logo'
import Navigation from './Navigation'
import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, UsersIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'

const UserHeader = () => {
  const cartItem = 1

  return (
    <header className="flex flex-col items-center my-12">
      <div className="flex flex-wrap gap-10 justify-between items-center max-w-full w-[1280px]">
        <Logo />
        <Navigation />
        <div className="flex gap-8">
          <MagnifyingGlassIcon className="w-[28px] cursor-pointer" />
          <div className="relative w-[28px] h-[28px] flex justify-center items-center cursor-pointer">
            <ShoppingCartIcon className="w-[28px] absolute" />
            <div className="absolute -top-2 -right-2 bg-zinc-700 text-[10px] text-white rounded-full w-[16px] h-[16px] flex justify-center items-center">
              {cartItem}
            </div>
          </div>
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
