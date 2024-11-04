'use client'
import PageTitle from '@/components/shared/PageTitle'
import CouponActions from './CouponActions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useFetch } from '@/hooks/useFetch'
import { PromotionsService } from '@/client/services.gen'
import { PromotionIndexEntity } from '@/client/types.gen'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Card, Input, Typography } from 'antd'
import TableSkeleton from '@/components/shared/TableSkeleton'
import { skeletonColumns } from './coupons-table/columns'
import TableError from '@/components/shared/TableError'
import DataTable from '@/components/shared/DataTable'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { PenSquare, Trash2 } from 'lucide-react'
import { DiscountTypeEnum } from '@/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { promotionFormSchema } from './schemas'
import { z } from 'zod'

type FormData = z.infer<typeof promotionFormSchema>

const discountTypeOptions = [
  {
    value: DiscountTypeEnum.PERCENTAGE,
    label: DiscountTypeEnum.PERCENTAGE,
  },
  {
    value: DiscountTypeEnum.AMOUNT,
    label: DiscountTypeEnum.AMOUNT,
  },
]

export default function Coupons() {
  const [rowSelection, setRowSelection] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      discount: '0',
      discountType: DiscountTypeEnum.PERCENTAGE,
      startDate: new Date()
        .toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-'),
      endDate: new Date()
        .toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-'),
    },
  })
  const [promotionId, SetPromotionId] = useState<number>(-1)
  const [promotionQueries, setPromotionQueries] = useQueryStates(
    {
      keyword: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    {
      clearOnDefault: true,
      shallow: false,
    },
  )

  const perPage = 10

  const {
    data: promotions,
    loading,
    error,
    refresh,
  } = useFetch(() =>
    PromotionsService.promotionsControllerGetPromotion({
      code: promotionQueries.keyword,
    }),
  )

  const { run: deletePromotion } = useFetch(
    PromotionsService.promotionsControllerDeletePromotion,
    {
      onSuccess: () => {
        refresh()
        toast({
          title: 'Promotion deleted',
          variant: 'success',
        })
      },
      onError: (error) => {
        if ((error as any).body.message === 'Promotion does not exist') {
          toast({
            title: 'Promotion does not exist',
            variant: 'destructive',
          })
        }
      },
    },
  )

  const { run: updatePromotion } = useFetch(
    PromotionsService.promotionsControllerUpdatePromotion,
    {
      onSuccess: () => {
        refresh()
        toast({
          title: 'Promotion updated',
          variant: 'success',
        })
      },
      onError: (error) => {
        if (
          (error as any).body.message === 'Promotion existed' ||
          (error as any).body.message === 'Update promotion failed'
        ) {
          toast({
            title: (error as any).body.message,
            variant: 'destructive',
          })
        }
      },
    },
  )

  const renderMetadata = () => {
    if (loading)
      return <TableSkeleton perPage={perPage} columns={skeletonColumns} />

    if (error || !promotions)
      return (
        <TableError
          errorMessage="Something went wrong while trying to fetch promotion."
          refetch={() => refresh()}
        />
      )
  }

  const handleDelete = (id: number) => {
    deletePromotion({
      id,
    })
  }

  const columns: ColumnDef<PromotionIndexEntity>[] = [
    {
      header: 'campaign name',
      cell: ({ row }) => row.original.name,
    },
    {
      header: 'code',
      cell: ({ row }) => row.original.code,
    },
    {
      header: 'discount',
      cell: ({ row }) => `${row.original.discount}%`,
    },
    {
      header: 'start date',
      cell: ({ row }) => new Date(row.original.startDate).toDateString(),
    },
    {
      header: 'endDate',
      cell: ({ row }) => new Date(row.original.endDate).toDateString(),
    },
    {
      header: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    setIsOpen(true)
                    SetPromotionId(row.original.id)
                    reset({
                      ...row.original,
                      discount: row.original.discount.toLocaleString(),
                      startDate: new Date(row.original.startDate)
                        .toLocaleDateString('en-GB')
                        .split('/')
                        .reverse()
                        .join('-'),
                      endDate: new Date(row.original.endDate)
                        .toLocaleDateString('en-GB')
                        .split('/')
                        .reverse()
                        .join('-'),
                      discountType: row.original
                        .discountType as DiscountTypeEnum,
                    })
                  }}
                  variant="ghost"
                  size="icon"
                  className="text-foreground"
                >
                  <PenSquare className="size-5" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>Edit Category</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground"
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Delete Promotion</p>
                </TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },
  ]

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  function onSubmit(values: z.infer<typeof promotionFormSchema>) {
    console.log('🚀 ~ onSubmit ~ values:', values)
    console.log('🚀 ~ onSubmit ~ values:', promotionId)

    updatePromotion({
      id: +promotionId,
      requestBody: {
        name: values.name,
        code: values.code,
        description: values.description,
        discount: Number(values.discount),
        discountType: values.discountType,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      },
    })
  }

  const table = useReactTable<PromotionIndexEntity>({
    data: promotions?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <section>
      <PageTitle>Coupons</PageTitle>
      <CouponActions refresh={refresh}></CouponActions>
      <Card className="mb-5">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <Input
            type="search"
            placeholder="Search by code"
            className="h-12 md:basis-1/2"
            value={promotionQueries.keyword}
            onChange={(e) => setPromotionQueries({ keyword: e.target.value })}
          />

          <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-1/2">
            <Button onClick={() => refresh()} size="lg" className="flex-grow">
              Filter
            </Button>
            <Button
              onClick={() => {
                setPromotionQueries({ keyword: '' })
                refresh()
              }}
              size="lg"
              variant="secondary"
              className="flex-grow"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>
      {renderMetadata()}
      <DataTable
        table={table}
        pagination={{
          current: promotionQueries.page,
          pages: Math.ceil(promotions?.total! / perPage),
          perPage,
          items: promotions?.total!,
          first: 1,
          last: Math.ceil(promotions?.total! / perPage),
          next:
            promotionQueries.page + 1 > Math.ceil(promotions?.total! / perPage)
              ? null
              : promotionQueries.page + 1,
          prev: promotionQueries.page - 1,
        }}
      />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Coupons</SheetTitle>
            <SheetDescription>
              {" Make changes to coupons here. Click save when you're done."}
            </SheetDescription>
          </SheetHeader>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Campain Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value: string) =>
                              field.onChange(value)
                            }
                            // defaultValue={DiscountTypeEnum.PERCENTAGE}
                          >
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder={field.value} />
                            </SelectTrigger>

                            <SelectContent>
                              {discountTypeOptions.map((type) => (
                                <SelectItem
                                  value={type.value}
                                  key={type.value}
                                  className="capitalize"
                                >
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SheetClose asChild>
                  <Button type="submit" className="w-full" size="lg">
                    Save
                  </Button>
                </SheetClose>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
