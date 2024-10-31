import HomePageContainer from '@/containers/home'
import { Helmet } from 'react-helmet'

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <HomePageContainer />
    </div>
  )
}

export default HomePage
