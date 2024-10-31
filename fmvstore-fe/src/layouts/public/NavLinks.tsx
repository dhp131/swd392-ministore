import React from 'react'

const navItems = ['Support Center', 'Invoicing', 'Contract', 'Careers', 'Blog', "FAQ's"]

const NavLinks: React.FC = () => {
  return (
    <nav className="flex flex-wrap gap-10 items-center self-stretch my-auto text-base min-w-[240px] text-zinc-700 max-md:max-w-full">
      {navItems.map((item, index) => (
        <a key={index} href="#" className="self-stretch my-auto">
          {item}
        </a>
      ))}
    </nav>
  )
}

export default NavLinks
