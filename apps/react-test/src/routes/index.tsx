import {lazy} from 'react'
import {RouteObject} from 'react-router-dom'
import {CONSTANTS} from 'public/constants'

const MainLayout = lazy(() => import('layouts/main-layout/Index'))
const Main = lazy(() => import('pages/Main'))
const Sign = lazy(() => import('pages/Sign'))
const Error = lazy(() => import('pages/Error'))

export const routes: RouteObject[] = [
  {
    children: [
      {
        element: <Main />,
        index: true,
      },
      {
        element: <Sign />,
        path: CONSTANTS.PATH_SIGN_IN,
      },
      {
        element: <Sign />,
        path: CONSTANTS.PATH_SIGN_UP,
      },
      {
        element: <Sign />,
        path: CONSTANTS.PATH_PASSWORD,
      },
      {
        element: <Error />,
        path: CONSTANTS.PATH_ERROR,
      },
    ],
    element: <MainLayout />,
    path: '/',
  },
]
