import PaymentContainer from '@/containers/pyament'
import { Helmet } from 'react-helmet'

const PaymentPage = () => {
  return (
    <div>
      <Helmet>
        <title>Payment Page</title>
      </Helmet>
      <PaymentContainer />
    </div>
  )
}

export default PaymentPage
