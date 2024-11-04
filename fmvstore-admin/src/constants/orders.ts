import { OrderStatusEnum, PaymentMethodEnum } from '@/client'

export const ORDER_STATUS_OPTIONS = [
  {
    label: 'Pending',
    value: OrderStatusEnum.PENDING,
  },
  {
    label: 'Processing',
    value: OrderStatusEnum.PROCESSING,
  },
  {
    label: 'Delivering',
    value: OrderStatusEnum.SHIPPED,
  },
  {
    label: 'Delivered',
    value: OrderStatusEnum.DELIVERED,
  },
  {
    label: 'Cancelled',
    value: OrderStatusEnum.CANCELLED,
  },
]

export const ORDER_METHODS = [
  {
    label: 'Cash',
    value: PaymentMethodEnum.CASH,
  },
  {
    label: 'Card',
    value: PaymentMethodEnum.CARD,
  },
  {
    label: 'Credit',
    value: PaymentMethodEnum.STRIPE,
  },
]

export const statusOrder = {
  [OrderStatusEnum.PENDING]: 1,
  [OrderStatusEnum.PROCESSING]: 2,
  [OrderStatusEnum.SHIPPED]: 3,
  [OrderStatusEnum.CANCELLED]: 4,
  [OrderStatusEnum.DELIVERED]: 5,
}

export const StatisticOptions = [
  {
    text: 'Daily',
    value: 'date',
  },
  {
    text: 'Monthly',
    value: 'month',
  },
  {
    text: 'Annually',
    value: 'year',
  },
]