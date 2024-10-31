import React from 'react'
import Logo from '@/components/common/Logo'
import FacebookIcon from '@/assets/facebook.svg'
import InstagramIcon from '@/assets/instagram.svg'
import YoutubeIcon from '@/assets/youtube.svg'
import TwitterIcon from '@/assets/twitter.svg'

const UserFooter: React.FC = () => {
  const companyInfo =
    'Founded in 2024, we focus on delivering the best item-driven products from world-renowned brands to accelerate your life and health growth.'
  const columns = [
    {
      title: 'Về chúng tôi',
      links: ['Tuyển dụng', 'Hợp tác đại lý', 'Terms & Conditions', 'Liên hệ chúng tôi'],
    },
    {
      title: 'Trợ giúp',
      links: ['FAQ', 'Quy định', 'Đặt hàng & ship lớn', 'Thanh toán'],
    },
    {
      title: 'Tài khoản',
      links: ['Profile', 'Phiếu giảm giá', 'Danh sách chờ', 'Thông báo'],
    },
  ]
  const socialLinks = [
    {
      name: 'Facebook',
      icon: FacebookIcon,
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
    },
    {
      name: 'Youtube',
      icon: YoutubeIcon,
    },
    {
      name: 'Twitter',
      icon: TwitterIcon,
    },
  ]
  return (
    <footer className="flex flex-col justify-center items-center px-20 py-12 bg-amber-500 bg-opacity-10 max-md:px-5">
      <div className="flex flex-wrap gap-10 justify-between items-center max-w-full w-[1280px]">
        <div className="flex gap-5 justify-between max-md:max-w-full">
          <div className="flex flex-col items-start mt-2.5 basis-[30%]">
            <Logo />
            <p className="mt-8 tracking-wide text-black">{companyInfo}</p>
          </div>
          {columns.map((column) => (
            <div className="flex flex-col items-start">
              <div className="text-2xl font-medium tracking-wide rotate-[8.478380524842559e-19rad]">{column.title}</div>
              {column.links.map((link, index) => (
                <a key={index} href="#" className={`${index === 0 ? 'mt-8' : 'mt-5'}`}>
                  {link}
                </a>
              ))}
            </div>
          ))}
          <div className="flex flex-col items-start tracking-wide text-black">
            <div className="self-stretch text-2xl font-medium tracking-wide rotate-[8.478380524842559e-19rad]">
              Theo dõi chúng tôi
            </div>
            {socialLinks.map((link) => (
              <div className="flex gap-3 mt-5 whitespace-nowrap justify-center items-center">
                <img
                  loading="lazy"
                  src={link.icon}
                  alt={`${link.name} icon`}
                  className="object-contain shrink-0 self-start mt-1.5 aspect-square w-[23px]"
                />
                <span>{link.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-between mt-24 w-full tracking-wide text-black">
          <p>@FMV 2024. All rights reserved</p>
          <div className="flex gap-5">
            <a href="#" className="grow">
              Privacy Policy
            </a>
            <div className="flex shrink-0 my-auto w-2 h-2 bg-black rounded-full" />
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default UserFooter
