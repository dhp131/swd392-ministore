import CheckoutPageContainer from '@/containers/checkout'
import { Helmet } from 'react-helmet'

const CheckoutPage = () => {
  return (
    <div>
      <Helmet>
        <title>Checkout Page</title>
      </Helmet>
      <CheckoutPageContainer />
    </div>
  )
}

export default CheckoutPage
