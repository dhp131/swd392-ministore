'use client'
import PageTitle from '@/components/shared/PageTitle'
import { PenSquare, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import dayjs from 'dayjs'
import { useFetch } from '@/hooks/useFetch'
import { UsersService } from '@/client'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

export default function AllStaff() {
  const [keyword, setKeyword] = useQueryState('keyword', {
    defaultValue: '',
    clearOnDefault: true,
  })
  const { data: staffData, refresh } = useFetch(
    () =>
      UsersService.usersControllerGetAllStaff({
        keyword,
      }),
    {
      onSuccess: (data) => {
        console.log('data', data)
      },
    },
  )

  const { run: deleteStaff } = useFetch(
    UsersService.usersControllerDeleteStaff,
    {
      manual: true,
      onSuccess: () => {
        toast({
          title: 'Staff deleted successfully',
          variant: 'success',
        })
        refresh()
      },
    },
  )

  const router = useRouter()
  return (
    <section>
      <PageTitle>All Staff</PageTitle>

      <Card className="mb-5">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <Input
            type="search"
            placeholder="Search by name, email or phone"
            className="h-12 md:basis-1/2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            onClick={() => router.push('/staff/create')}
            size="lg"
            className="h-12 md:basis-1/4"
          >
            <Plus className="mr-2 size-4" /> Add Staff
          </Button>
          <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-1/4">
            <Button onClick={() => refresh()} size="lg" className="flex-grow">
              Filter
            </Button>
            <Button size="lg" variant="secondary" className="flex-grow">
              Reset
            </Button>
          </div>
        </div>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">Id</TableHead>
            <TableHead className="w-[15%]">Name</TableHead>
            <TableHead className="w-[15%]">Phone</TableHead>
            <TableHead className="w-[15%]">Email</TableHead>
            <TableHead className="w-[10%]">Created At</TableHead>
            <TableHead className="w-[10%]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffData?.items!.map((staff, index) => (
            <TableRow key={staff.id}>
              <TableCell>{staff.id}</TableCell>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.phoneNumber}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>
                {dayjs(staff?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => router.push(`/staff/edit/${staff.id}`)}
                        variant="ghost"
                        size="icon"
                        className="text-foreground"
                      >
                        <PenSquare className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Size</p>
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
                        <p>Delete Staff</p>
                      </TooltipContent>
                    </Tooltip>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteStaff({
                              id: staff.id,
                            })
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
