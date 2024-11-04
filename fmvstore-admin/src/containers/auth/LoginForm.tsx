'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Typography from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

import FormTemplate from './FormTemplate'
import { loginFields } from './fields'
import { loginFormSchema } from './schemas'
import loginImg from 'public/assets/login.jpg'
import { useFetch } from '@/hooks/useFetch'
import { AuthService, RoleEnum } from '@/client'
import { COOKIE_KEY, setSessionCookie } from '@/client/request/cookie'
import Cookies from 'js-cookie'
import { authService } from '@/services/auth'

type FormData = z.infer<typeof loginFormSchema>

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { run: login, loading } = useFetch(authService.login, {
    manual: true,
    onSuccess: (res) => {
      console.log('🚀 ~ LoginForm ~ res:', res)
      if (![RoleEnum.ADMIN, RoleEnum.SUB_ADMIN].includes(res.user.role as any))
        return toast({
          title: 'Login Failed',
          description: 'You are not authorized to access this page',
          variant: 'destructive',
        })
      toast({
        title: 'Login Success',
        description:
          'You have successfully logged in. Redirecting to the dashboard...',
        variant: 'success',
      })
      setSessionCookie({
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      })
      Cookies.set(COOKIE_KEY.IS_LOGIN, 'true', { expires: 30 })
      window.location.replace('/')
      form.reset()
      router.push('/')
    },
    onError: (error) => {
      console.error(error)
      if (error.message === 'Bad Request') {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        })
      }
    },
  })

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    login({
      username: formData.username,
      password: formData.password,
    })
  }

  return (
    <FormTemplate image={loginImg}>
      <div className="w-full">
        <Typography variant="h2" className="mb-8">
          Login
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {loginFields.map((formField) => (
              <FormField
                key={`form-field-${formField.name}`}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={formField.inputType}
                        placeholder={formField.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              disabled={loading}
              type="submit"
              className="w-full"
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>

        <Separator className="my-12" />

        {/* <Providers /> */}

        {/* <div className="flex flex-wrap justify-end gap-4 w-full">
          <Typography
            variant="a"
            href="/forgot-password"
            className="md:!text-sm"
          >
            Forgot password?
          </Typography>
        </div> */}
      </div>
    </FormTemplate>
  )
}
