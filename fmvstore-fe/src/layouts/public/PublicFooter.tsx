import Logo from '@/components/common/Logo'
import React from 'react'
import NavLinks from './NavLinks'

const PublicFooter: React.FC = () => {
  return (
    <footer className="flex flex-col items-center">
      <div className="flex flex-wrap gap-10 justify-between items-center mt-8 max-w-full w-[1280px]">
        <Logo />
        <NavLinks />
      </div>
      <div className="mt-3.5 text-xs leading-7 text-center text-zinc-700">
        Copyright © 2024 TWEB . All Rights Reserved.
      </div>
    </footer>
  )
}

export default PublicFooter
