import { lazy } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  )
}

export default App
