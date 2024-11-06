'use client'
import PageTitle from '@/components/shared/PageTitle'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFetch } from '@/hooks/useFetch'
import {
  CategoriesService,
  DiscountTypeEnum,
  AdminProductsService,
  VariationsService,
} from '@/client'
import CKEditor from '@/components/shared/CKEditor'
import useGetMountStatus from '@/hooks/useGetMountStatus'
import UploadImageBox from './UploadImage'
import { Radio } from 'antd'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getImageUrlFromS3Key } from '@/helpers/getImageUrl'

const formSchema = z.object({
  name: z.string({ description: 'Please enter' }),
  category: z.string({ description: 'Please enter' }),
  subCategory: z.string({ description: 'Please enter' }),
  overview: z.string({ description: 'Please enter' }),
  description: z.string({ description: 'Please enter' }),
  detail: z.string({ description: 'Please enter' }),
  discount: z.string(),
  discountType: z.string(),
  productConfiguration: z.array(
    z.object({
      colorImage: z.string(),
      color: z.string(),
      size: z.string(),
      price: z.string(),
      quantity: z.string(),
      images: z.array(z.string()),
      isDefault: z.boolean(),
    }),
  ),
})

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

const CreateProductContainer = () => {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [colors, setColors] = useState<
    {
      label: string
      value: number
      image: string
    }[]
  >()
  const [sizes, setSizes] = useState<
    {
      label: string
      value: number
    }[]
  >()
  const [defaultItem, setDefaultItem] = useState(0)
  const mounted = useGetMountStatus()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      category: undefined,
      subCategory: undefined,
      overview: undefined,
      description: undefined,
      detail: undefined,
      discount: undefined,
      discountType: DiscountTypeEnum.PERCENTAGE,
    },
  })

  const { handleSubmit, watch, control, setValue } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productConfiguration',
  })

  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProduct({
      requestBody: {
        name: values.name,
        category: values.subCategory,
        overview: values.overview,
        description: values.description,
        detail: values.detail,
        discount: Number(values.discount),
        discountType: values.discountType as DiscountTypeEnum,
        productConfigurationData: values.productConfiguration.map((item) => {
          const defaultItemData = values.productConfiguration[defaultItem]
          return {
            colorId: Number(item.color),
            sizeId: Number(item.size),
            quantity: Number(item.quantity),
            price: Number(item.price),
            isDefault:
              item.color === defaultItemData.color &&
              item.size === defaultItemData.size,
            images: item.images.map((image, index) => {
              return {
                image: image,
                isDefault: index === 0,
              }
            }),
          }
        }),
      },
    })
  }

  const handleAppendProductItem = () => {
    const appendData = {
      colorImage: '',
      color: '',
      size: '',
      price: '0',
      quantity: '0',
      images: [],
      isDefault: fields?.length === 0,
    }
    append(appendData)
  }

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const { data: categories, run: fetchCategories } = useFetch(
    () =>
      CategoriesService.categoriesControllerGetSubCategoriesByCategory({
        category: watch('category'),
      }),
    {
      manual: true,
    },
  )

  const { data: mainCategories } = useFetch(() =>
    CategoriesService.categoriesControllerGetAllCategories({
      category: '',
    }),
  )

  const { data: variations } = useFetch(
    VariationsService.variationsControllerGetAllVariationOptions,
    {
      onSuccess: (data) => {
        const colorsData = data.items
          .filter((item) => item.variation === 'Color')
          .map((item) => ({
            label: item.value,
            value: item.id,
            image: item.image,
          }))

        setColors(colorsData)

        const sizesData = data.items
          .filter((item) => item.variation === 'Size')
          .map((item) => ({
            label: item.value,
            value: item.id,
          }))
        setSizes(sizesData)
      },
    },
  )

  const { run: createProduct } = useFetch(
    AdminProductsService.productsAdminControllerCreateProduct,
    {
      manual: true,
      onSuccess: () => {
        toast({
          title: 'Product created successfully',
          variant: 'success',
        })
        router.push('/products')
      },
      onError: () => {
        toast({
          title: 'Product created failed',
          variant: 'destructive',
        })
      },
    },
  )
  return (
    <>
      <section>
        <PageTitle>Create Product</PageTitle>
      </section>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 mb-[120px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => {
                        field.onChange(value)
                        fetchCategories()
                      }}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>

                      <SelectContent>
                        {mainCategories?.items.map((category) => (
                          <SelectItem
                            value={category.name}
                            key={category.id}
                            className="capitalize"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>

                      <SelectContent>
                        {categories?.items.map((category) => (
                          <SelectItem
                            value={category.name}
                            key={category.id}
                            className="capitalize"
                          >
                            {category.name}
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
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter overview" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail</FormLabel>
                <FormControl>
                  <CKEditor
                    init={field.value}
                    Placeholder={{ placeholder: 'Detail ...' }}
                    name="description"
                    data={field.value}
                    onChange={(data) => {
                      field.onChange(data)
                    }}
                    editorLoaded={editorLoaded}
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
                    <Input
                      type="number"
                      placeholder="Enter discount"
                      {...field}
                    />
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
                      onValueChange={(value: string) => field.onChange(value)}
                      defaultValue={DiscountTypeEnum.PERCENTAGE}
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
          <div className="text-[#09090B] text-[14px] font-[500]">
            Variation Configuration
          </div>

          <Button type="button" onClick={handleAppendProductItem}>
            <Plus className="mr-2 size-4" /> Add product item
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Color</TableHead>
                <TableHead className="w-[15%]">Size</TableHead>
                <TableHead className="w-[10%]">Price</TableHead>
                <TableHead className="w-[10%]">Quantity</TableHead>
                <TableHead className="w-[30%]">Images</TableHead>
                <TableHead className="w-[10%]">Default</TableHead>
                <TableHead className="w-[10%]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((fieldArray, index) => (
                <TableRow key={fieldArray.id}>
                  <TableCell>
                    <div className="flex justify-center items-center gap-4">
                      <Controller
                        control={control}
                        name={`productConfiguration.${index}.colorImage`}
                        render={({ field }) => (
                          <>
                            {field.value ? (
                              <Image
                                src={field.value}
                                width={50}
                                height={50}
                                alt="color"
                              />
                            ) : null}
                          </>
                        )}
                      />
                      <Controller
                        control={control}
                        name={`productConfiguration.${index}.color`}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value)
                              const color = colors!.find(
                                (color) => color.value === Number(value),
                              )
                              setValue(
                                `productConfiguration.${index}.colorImage`,
                                getImageUrlFromS3Key(color?.image!),
                              )
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors!.map((color) => (
                                <SelectItem
                                  value={String(color.value)}
                                  key={color.value}
                                  className="capitalize"
                                >
                                  {color.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`productConfiguration.${index}.size`}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {sizes!.map((size) => (
                              <SelectItem
                                value={String(size.value)}
                                key={size.value}
                                className="capitalize"
                              >
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`productConfiguration.${index}.price`}
                      render={({ field }) => (
                        <Input className="" type="number" {...field} />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`productConfiguration.${index}.quantity`}
                      render={({ field }) => (
                        <Input className="" type="number" {...field} />
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Controller
                      control={control}
                      name={`productConfiguration.${index}.images`}
                      render={({ field }) => (
                        <UploadImageBox
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`productConfiguration.${index}.isDefault`}
                      render={({ field }) => (
                        <Radio
                          checked={index === defaultItem}
                          onChange={(e) => {
                            field.onChange(e.target.checked)
                            setDefaultItem(index)
                          }}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => remove(index)}
                          variant="ghost"
                          size="icon"
                          className="text-foreground"
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>Delete Product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-4 pt-6">
            <Button type="submit">Create</Button>
            <Button
              onClick={() => router.push('/products')}
              variant="secondary"
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CreateProductContainer
