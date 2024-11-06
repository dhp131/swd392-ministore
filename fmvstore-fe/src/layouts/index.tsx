import { userAtom } from '@/stores/user'
import { useAtomValue } from 'jotai'
import UserHeader from './user/UserHeader'
import PublicHeader from './public/PublicHeader'
import { Outlet } from 'react-router-dom'
import UserFooter from './user/UserFooter'
import PublicFooter from './public/PublicFooter'

const RootLayout = () => {
  const user = useAtomValue(userAtom)
  console.log('🚀 ~ RootLayout ~ user:', user)
  return (
    <>
      <div>
        {user ? <UserHeader /> : <PublicHeader />}
        <div className="flex-1">
          <Outlet />
        </div>
        {user ? <UserFooter /> : <PublicFooter />}
      </div>
    </>
  )
}

export default RootLayout
