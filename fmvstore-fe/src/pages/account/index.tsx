import AccountPageContainer from '@/containers/account'
import { Helmet } from 'react-helmet'

const AccountPage = () => {
  return (
    <div>
      <Helmet>
        <title>Account Page</title>
      </Helmet>
      <AccountPageContainer />
    </div>
  )
}

export default AccountPage
