import { Outlet } from 'react-router-dom'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'

const UserLayout = () => {
  return (
    <>
      <div>
        <UserHeader />
        <div className="flex-1">
          <Outlet />
        </div>
        <UserFooter />
      </div>
    </>
  )
}

export default UserLayout
