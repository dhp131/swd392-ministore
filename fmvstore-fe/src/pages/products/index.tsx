import ProductsPageContainer from '@/containers/products'
import { Helmet } from 'react-helmet'

const ProductsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <ProductsPageContainer />
    </div>
  )
}

export default ProductsPage
