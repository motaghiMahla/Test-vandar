import {lazy} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'

import {AppProvider} from 'appContext'

import {ErrorBoundary, ErrorFallback} from 'components'

const App = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(
        () => resolve(import('app' /* webpackChunkName: "app" */)),
        1000,
      )
    }),
)

function AppWithRouter() {
  return (
    <CookiesProvider>
      <AppProvider>
        <Router>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </Router>
      </AppProvider>
    </CookiesProvider>
  )
}

export default AppWithRouter
