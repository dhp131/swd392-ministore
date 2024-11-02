import ErrorPage from '@/error-page'
import { PublicLayout } from '@/layouts/public/PublicLayout'
import UserLayout from '@/layouts/user/UserLayout'
import ForgotPasswordPage from '@/pages/forgot-password'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import ProductsPage from '@/pages/products'
import ProductDetailPage from '@/pages/products/detail'
import RegisterPage from '@/pages/register'
import { createBrowserRouter } from 'react-router-dom'

const isLogin = true

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: isLogin ? <UserLayout /> : <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
])

export default router
