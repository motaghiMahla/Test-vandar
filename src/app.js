import {lazy} from 'react'

const Routes = lazy(() => import('./routes' /* webpackChunkName: "routes" */))

function App() {
  return (
    <>
      <Routes />
    </>
  )
}

export default App
