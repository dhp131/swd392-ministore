import PageLayout from '@/components/common/PageLayout'
import { orderService } from '@/services/order'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

const OrderPageContainer = () => {
  const { data: ordersData } = useQuery({
    queryKey: ['getOrders'],
    queryFn: () => orderService.getOrders(),
  })
  console.log('🚀 ~ OrderPageContainer ~ ordersData:', ordersData?.result)
  return (
    <PageLayout>
      <div className="flex flex-col gap-4">
        <div className="text-center w-full text-4xl font-bold">Order History</div>
        <div>
          {ordersData?.result?.map((order: any) => (
            <div key={order.id} className="flex flex-col gap-4">
              <div className="text-2xl font-bold">Order Date: {dayjs(order.orderDate).format('DD/MM/YYYY')}</div>
              <div>
                {order?.orderDetails.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.name} className="h-[170px] mr-12 object-cover" />
                      <div className="flex flex-col">
                        <div className="text-[#6B6565] text-[14px]">{item.category}</div>
                        <div className="font-bold text-2xl">{item.name}</div>
                        <div className="">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="flex gap-12">
                      <div className="flex items-center gap-3">
                        <div>{item.quantity}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-[18px] font-semibold">{item.price * item.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default OrderPageContainer
