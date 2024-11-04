import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineVerifiedUser,
} from 'react-icons/md'
import { LuUsers2 } from 'react-icons/lu'
import { TbBorderAll, TbTruckDelivery } from 'react-icons/tb'
import { RiCoupon2Line } from 'react-icons/ri'
import { TbTag } from 'react-icons/tb'
import { TbBriefcase, TbRuler, TbColorFilter } from 'react-icons/tb'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { RoleEnum } from '@/client'

export const navItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Users',
    url: '/users',
    icon: <MdOutlinePerson />,
  },
  {
    title: 'Products',
    url: '/products',
    icon: <MdOutlineShoppingCart />,
    role: [RoleEnum.ADMIN, RoleEnum.SUB_ADMIN],
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: <TbTag />,
    role: [RoleEnum.ADMIN, RoleEnum.SUB_ADMIN],
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: <TbTruckDelivery />,
    role: [RoleEnum.ADMIN, RoleEnum.SUB_ADMIN],
  },
  {
    title: 'Promotions',
    url: '/coupons',
    icon: <RiCoupon2Line />,
    role: [RoleEnum.ADMIN],
  },
  {
    title: 'Staff',
    url: '/staff',
    icon: <TbBriefcase />,
    role: [RoleEnum.ADMIN],
  },
]
