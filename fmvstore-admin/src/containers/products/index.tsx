'use client'
import PageTitle from '@/components/shared/PageTitle'
import ProductActions from './ProductActions'
import { parseAsString, useQueryStates } from 'nuqs'
import { useFetch } from '@/hooks/useFetch'
import { AdminProductsService, CategoriesService } from '@/client'
import { Loader2, ShieldAlert } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import TableSkeleton from '@/components/shared/TableSkeleton'
import { skeletonColumns } from './products-table/columns'
import TableError from '@/components/shared/TableError'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import ProductsTable from './products-table/Table'
import { toast } from '@/components/ui/use-toast'

export default function ProductsList() {
  const productsPage = useSearchParams().get('page')
  const page = Math.trunc(Number(productsPage)) || 1
  const [productQueries, setProductQueries] = useQueryStates(
    {
      category: parseAsString.withDefault(''),
      subCategory: parseAsString.withDefault(''),
      name: parseAsString.withDefault(''),
    },
    {
      clearOnDefault: true,
      shallow: false,
    },
  )

  const perPage = 10

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(() =>
    CategoriesService.categoriesControllerGetAllSubCategories({
      category: productQueries.category,
    }),
  )

  const {
    data: mainCategories,
    loading: mainCategoriesLoading,
    error: mainCategoriesError,
  } = useFetch(() =>
    CategoriesService.categoriesControllerGetAllCategories({
      category: '',
    }),
  )

  const { run: deleteProduct } = useFetch(
    AdminProductsService.productsAdminControllerDeleteProduct,
    {
      manual: true,
      onSuccess: () => {
        refresh()
        toast({
          variant: 'success',
          title: 'Product deleted successfully',
        })
      },
      onError: (err) => {
        toast({
          variant: 'destructive',
          title: 'Failed to delete product',
          description: err.message,
        })
      },
    },
  )

  const {
    data: products,
    loading,
    error,
    refresh,
  } = useFetch(() =>
    AdminProductsService.productsAdminControllerListAllProductsAdmin({
      page,
      pageSize: perPage,
      category: productQueries.category,
      subCategory: productQueries.subCategory,
      keyword: productQueries.name,
    }),
  )

  const renderTableException = () => {
    if (loading) return <TableSkeleton perPage={10} columns={skeletonColumns} />

    if (error || !products)
      return (
        <TableError
          errorMessage="Something went wrong while trying to fetch products."
          refetch={() => null as any}
        />
      )
  }

  useEffect(() => {
    refresh()
  }, [page, refresh])

  return (
    <section>
      <PageTitle>Products</PageTitle>

      <ProductActions />
      <Card className="mb-5">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <Input
            type="search"
            onChange={(e) => setProductQueries({ name: e.target.value })}
            placeholder="Search product..."
            className="h-12 md:basis-[30%]"
            value={productQueries.name}
          />

          <Select
            onValueChange={(val) => {
              setProductQueries({ category: val })
            }}
            value={productQueries.category}
          >
            <SelectTrigger className="md:basis-1/5">
              <SelectValue placeholder="Main Category" />
            </SelectTrigger>

            <SelectContent>
              {mainCategoriesLoading ? (
                <div className="flex flex-col gap-2 items-center px-2 py-6">
                  <Loader2 className="size-4 animate-spin" />
                  <Typography>Loading...</Typography>
                </div>
              ) : mainCategoriesError || !categories ? (
                <div className="flex flex-col gap-2 items-center px-2 py-6 max-w-full">
                  <ShieldAlert className="size-6" />
                  <Typography>
                    Sorry, something went wrong while fetching categories
                  </Typography>
                </div>
              ) : (
                mainCategories?.items.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => setProductQueries({ subCategory: val })}
            value={productQueries.subCategory}
          >
            <SelectTrigger className="md:basis-1/5">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              {categoriesLoading ? (
                <div className="flex flex-col gap-2 items-center px-2 py-6">
                  <Loader2 className="size-4 animate-spin" />
                  <Typography>Loading...</Typography>
                </div>
              ) : categoriesError || !categories ? (
                <div className="flex flex-col gap-2 items-center px-2 py-6 max-w-full">
                  <ShieldAlert className="size-6" />
                  <Typography>
                    Sorry, something went wrong while fetching categories
                  </Typography>
                </div>
              ) : (
                categories.items.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* <Select>
          <SelectTrigger className="md:basis-1/5">
            <SelectValue placeholder="Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="low">Low to High</SelectItem>
            <SelectItem value="high">High to Low</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
            <SelectItem value="status-selling">Status - Selling</SelectItem>
            <SelectItem value="status-out-of-stock">
              Status - Out of Stock
            </SelectItem>
            <SelectItem value="date-added-asc">Date Added (Asc)</SelectItem>
            <SelectItem value="date-added-desc">Date Added (Desc)</SelectItem>
            <SelectItem value="date-updated-asc">Date Updated (Asc)</SelectItem>
            <SelectItem value="date-updated-desc">
              Date Updated (Desc)
            </SelectItem>
          </SelectContent>
        </Select> */}

          <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-[30%]">
            <Button onClick={() => refresh()} size="lg" className="flex-grow">
              Filter
            </Button>
            <Button
              onClick={() => {
                setProductQueries({
                  category: '',
                  subCategory: '',
                  name: '',
                })
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

      {renderTableException()}

      <ProductsTable data={products?.items!} deleteProduct={deleteProduct} />
    </section>
  )
}
