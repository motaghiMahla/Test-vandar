import {lazy, useEffect, useMemo, useRef} from 'react'
import {Route, Routes as ReactRoutes, Navigate, useLocation} from 'react-router'
import {useCookies} from 'react-cookie'

import {authAccessToken} from 'shared'

const Home = lazy(() => import('pages/home' /* webpackChunkName: "home" */))
const Login = lazy(() => import('pages/login' /* webpackChunkName: "logIn" */))

function Routes() {
  const {pathname} = useLocation()

  const pathnameRef = useRef(pathname)
  const documentBodyRef = useRef(document.body)

  const [cookies] = useCookies([authAccessToken])

  const accessToken = useMemo(() => cookies[authAccessToken], [cookies])

  const protectedRoute = (Component: component) =>
    accessToken ? <Component /> : <Navigate to="/" />

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      documentBodyRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [pathname])

  return (
    <ReactRoutes>
      <Route path="/" element={<Login />} />
      <Route path="/home/*" element={protectedRoute(Home)} />
      <Route exact path="/login" element={<Login />} />
    </ReactRoutes>
  )
}

export default Routes
