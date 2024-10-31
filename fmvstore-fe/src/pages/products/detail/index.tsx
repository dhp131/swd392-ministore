import ProductDetailContainer from '@/containers/products/detail'
import { Helmet } from 'react-helmet'

const ProductDetailPage = () => {
  return (
    <div>
      <Helmet>
        <title>Product Detail Page</title>
      </Helmet>
      <ProductDetailContainer />
    </div>
  )
}

export default ProductDetailPage
