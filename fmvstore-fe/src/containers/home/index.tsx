import LorealPromotion from './LorealPromotion'
import NewProduct from './NewProduct'
import Promotion from './Promotion'
import Sponsors from './Sponsors'

const HomePageContainer = () => {
  return (
    <div className=" flex justify-center flex-col items-center w-full">
      <div className="w-[1280px] flex flex-col gap-20">
        <Promotion />
        <Sponsors />
      </div>
      <LorealPromotion />
      <div className="bg-[#F5F5F5] w-full flex  flex-col justify-center items-center">
        <div className="w-[1280px] flex flex-col">
          <NewProduct />
        </div>
      </div>
    </div>
  )
}

export default HomePageContainer
