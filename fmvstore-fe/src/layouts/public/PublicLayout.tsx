// import clsx from 'clsx'
import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

export const PublicLayout = () => {
  return (
    <>
      <div className="">
        <PublicHeader />
        <div className="flex-1">
          <Outlet />
        </div>
        <PublicFooter />
      </div>
    </>
  )
}
