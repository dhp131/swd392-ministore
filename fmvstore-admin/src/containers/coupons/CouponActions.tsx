import { Plus } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { DiscountTypeEnum, PromotionsService } from '@/client'
import { toast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { promotionFormSchema } from './schemas'
import { z } from 'zod'

type PromotionActionsProps = {
  refresh: () => void
}

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

export default function CouponActions({ refresh }: PromotionActionsProps) {
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
  const { run: createPromotion } = useFetch(
    PromotionsService.promotionsControllerCreatePromotion,
    {
      onSuccess: () => {
        refresh()
        toast({
          title: 'Promotion created',
          variant: 'success',
        })
      },
      onError: (error) => {
        if ((error as any).body.message === 'Create promotion failed') {
          toast({
            title: 'Create promotion failed',
            variant: 'destructive',
          })
        }
      },
    },
  )

  const {
    handleSubmit,
    formState: { errors },
  } = form

  function onSubmit(values: z.infer<typeof promotionFormSchema>) {
    console.log('🚀 ~ onSubmit ~ values:', values)
    createPromotion({
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

  return (
    <Card className="mb-5">
      <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0"
              >
                <Plus className="mr-2 size-4" /> Add Coupons
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Coupons</DialogTitle>
                <DialogDescription>
                  {
                    " Make changes to your profile here. Click save when you're done."
                  }
                </DialogDescription>
              </DialogHeader>
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
                              <Input
                                type="text"
                                placeholder="Code"
                                {...field}
                              />
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
                    <DialogClose asChild>
                      <Button type="submit" className="w-full" size="lg">
                        Create
                      </Button>
                    </DialogClose>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  )
}
