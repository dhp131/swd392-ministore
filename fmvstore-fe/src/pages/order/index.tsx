import OrderPageContainer from '@/containers/order'
import { Helmet } from 'react-helmet'

const OrderPage = () => {
  return (
    <div>
      <Helmet>
        <title>Order Page</title>
      </Helmet>
      <OrderPageContainer />
    </div>
  )
}

export default OrderPage
