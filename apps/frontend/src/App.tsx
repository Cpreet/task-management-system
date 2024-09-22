import { lazy } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@/components/ThemeProvider'
import { Card } from '@/components/ui/card'
const Login = lazy(() => import('@/components/Login'))
// import Login from '@/components/Login'

import './App.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Card><Outlet /></Card>,
    children: [
      {
        path: "/",
        element: <Login />
      },
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='ui-theme'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
