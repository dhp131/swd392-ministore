import React from 'react'

const navigationItems = [
  { label: 'Giới thiệu', href: '#' },
  { label: 'Cửa hàng', href: '/products' },
  { label: 'Kiểm tra hóa đơn', href: '#' },
  { label: 'Tải ứng dụng', href: '#' },
]

const Navigation: React.FC = () => {
  return (
    <nav className="flex flex-wrap gap-10 items-center self-stretch my-auto text-base min-w-[240px] text-zinc-700 max-md:max-w-full">
      {navigationItems.map((item, index) => (
        <a key={index} href={item.href} className="self-stretch my-auto">
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export default Navigation
