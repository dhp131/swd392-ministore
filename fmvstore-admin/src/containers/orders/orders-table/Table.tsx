'use client'

import * as React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  OrderIndexEntity,
  OrderLineIndexEntity,
  OrderStatusEnum,
} from '@/client'
import { formatAmount } from '@/helpers/formatAmount'
import {
  ORDER_METHODS,
  ORDER_STATUS_OPTIONS,
  statusOrder,
} from '@/constants/orders'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import Typography from '@/components/ui/typography'
import { getImageUrlFromS3Key } from '@/helpers/getImageUrl'

type OrdersTableProps = {
  data?: OrderIndexEntity[]
  onValueChange: (id: OrderIndexEntity['id'], status: OrderStatusEnum) => void
}

export default function OrdersTable({ data, onValueChange }: OrdersTableProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [current, setCurrent] = React.useState<OrderIndexEntity | undefined>()
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Order Code</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order) => (
            <TableRow
              key={order.id}
              className="!appearance-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              <TableCell width={'50px'}>
                <Button
                  onClick={() => {
                    setCurrent(order)
                    setIsOpen(true)
                  }}
                  size="sm"
                  variant="outline"
                >
                  Detail
                </Button>
              </TableCell>
              <TableCell>{order.orderCode}</TableCell>
              <TableCell>{order.user}</TableCell>
              <TableCell>{format(new Date(order.orderDate), 'PPP')}</TableCell>
              <TableCell>{formatAmount(order.orderTotal)}</TableCell>
              <TableCell>
                {ORDER_METHODS.find((i) => i.value === order.paymentMethod)
                  ?.label ?? 'Unknown'}
              </TableCell>
              <TableCell>
                <Select
                  value={order.orderStatus}
                  onValueChange={(value) =>
                    onValueChange(order.id, value as OrderStatusEnum)
                  }
                  disabled={
                    statusOrder[order.orderStatus] >=
                    statusOrder[OrderStatusEnum.CANCELLED]
                  }
                >
                  <SelectTrigger className="capitalize md:col-span-2">
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>

                  <SelectContent>
                    {ORDER_STATUS_OPTIONS.filter(
                      (item) =>
                        statusOrder[item.value] >=
                        statusOrder[order.orderStatus],
                    ).map((method) => (
                      <SelectItem
                        value={method.value}
                        key={method.value}
                        className={cn('capitalize', {
                          'text-red-700':
                            method.value === OrderStatusEnum.CANCELLED,
                        })}
                      >
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild />
        <SheetContent className="w-full md:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>{current?.orderCode}</SheetTitle>
            {/* <SheetDescription>
              {"Order detail here"}
            </SheetDescription> */}
          </SheetHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {current?.orderLines.map((item) => (
              <Card className="flex gap-4 w-full flex-wrap" key={item.id}>
                <div className="border-solid border-[1px] border-[lightgray] rounded-[4px] overflow-hidden">
                  <Image
                    src={getImageUrlFromS3Key(item.image)}
                    alt={`${item.name}'s image`}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-1">
                  <Typography variant="h3" className="mb-3">
                    {item.name}
                  </Typography>
                  <div className="mb-1">
                    {item.color && (
                      <Typography className="p-1 border-solid border-[1px] border-[lightgray] rounded-[4px] mr-3">
                        {item.color}
                      </Typography>
                    )}
                    {item.size && (
                      <Typography className="p-1 border-solid border-[1px] border-[lightgray] rounded-[4px]">
                        {item.size}
                      </Typography>
                    )}
                  </div>
                  <div className="text-[1.5rem] text-end w-full text-primary">
                    <Typography className="mr-2">{item.quantity}</Typography>x
                    <Typography className="ml-2">
                      {formatAmount(item.price)}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}