import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const navigationItems = [
  { label: 'Giới thiệu', href: '#' },
  { label: 'Cửa hàng', href: '/products' },
  { label: 'Kiểm tra hóa đơn', href: '#' },
  { label: 'Đăng nhập', href: '/login' },
]

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  return (
    <nav className="flex flex-wrap gap-10 items-center self-stretch my-auto text-base min-w-[240px] text-zinc-700 max-md:max-w-full">
      {navigationItems.map((item, index) => (
        <a key={index} href={item.href} className="self-stretch my-auto">
          {item.label}
        </a>
      ))}
      <Button
        onClick={() => navigate('/register')}
        variant={'custom'}
        className="bg-[#FCA120] text-[#FFFFFF] px-[40px] py-[24px] shadow-[0_20px_35px_0px_rgba(0,0,0,0.15)]"
      >
        Đăng ký
      </Button>
    </nav>
  )
}

export default Navigation
