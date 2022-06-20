import useQuery from './useQuery'

import useHttpRequests from './useHttpRequests'

export {filterIt} from './search'
export {
  setIntoLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from './localStorage'
export {get, post, patch, put, deleteRequest, putFormData} from './httpRequests'
export {eyeHandler, numberWithCommas, specialErrorsInFarsi} from './utils'

export {useQuery, useHttpRequests}
