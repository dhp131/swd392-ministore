import React from 'react'
import Logo from '@/components/common/Logo'
import Navigation from './Navigation'

const PublicHeader: React.FC = () => {
  return (
    <header className="flex flex-col items-center my-12">
      <div className="flex flex-wrap gap-10 justify-between items-center max-w-full w-[1280px]">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}

export default PublicHeader
