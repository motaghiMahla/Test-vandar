import {useState, useMemo, createContext} from 'react'

const AppContext = createContext()

function AppProvider(props) {
  const initialStates = useMemo(
    () => ({
      accessToken: null,
      mobile: null,
      name: null,
      refreshToken: null,
      triggerSignIn: false,
    }),
    [],
  )

  const [appState, setAppState] = useState(initialStates)
  const value = {appState, setAppState, initialStates}

  return <AppContext.Provider value={value} {...props} />
}

export {AppProvider, AppContext}

export default AppContext
