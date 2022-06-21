import {useLocation} from 'react-router-dom'

/**
 * A custom hook to get query params
 */
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default useQuery
