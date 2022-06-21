import {baseUrl} from 'shared'
import {specialErrorsInFarsi} from 'utils'

/**
 *
 * @param {JSON} response
 *
 * @returns {Promise}
 */
async function errorHandler(response) {
  const error = await response.json()
  error.status = response.status

  if (error?.detail) {
    error.detail = specialErrorsInFarsi(error.detail)
    return Promise.reject(error)
  } else {
    return Promise.reject(error)
  }
}

/**
 *
 * @param {String} endpoint
 * @param {String} token
 * @param {Object} abortController
 * @param {Number} delay
 *
 * @returns {Promise}
 */
function get({
  endpoint,
  token,
  abortController,
  contentType = 'application/json;charset=UTF-8',
  delay = 1500,
}) {
  return window
    .fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'content-type': contentType,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      delay: delay,
      signal: abortController ? abortController.signal : undefined,
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })
}

/**
 *
 * @param {String} endpoint
 * @param {String} token
 * @param {Object|Array} body
 * @param {Object} abortController
 * @param {Number} delay
 *
 * @returns {Promise}
 */
function post({
  endpoint,
  body,
  token,
  abortController,
  contentType = 'application/json;charset=UTF-8',
  delay = 1500,
}) {
  return window
    .fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'content-type': contentType,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      delay: delay,
      body: JSON.stringify(body),
      signal: abortController ? abortController.signal : undefined,
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })
}

/**
 *
 * @param {String} endpoint
 * @param {String} token
 * @param {Object|Array} body
 * @param {Object} abortController
 * @param {Number} delay
 *
 * @returns {Promise}
 */
function patch({
  endpoint,
  body,
  token,
  abortController,
  contentType = 'application/json;charset=UTF-8',
  delay = 1500,
}) {
  return window
    .fetch(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'content-type': contentType,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      delay: delay,
      body: JSON.stringify(body),
      signal: abortController ? abortController.signal : undefined,
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })
}

/**
 *
 * @param {String} endpoint
 * @param {String} token
 * @param {Object|Array} body
 * @param {Object} abortController
 * @param {Number} delay
 *
 * @returns {Promise}
 */
function put({
  endpoint,
  body,
  token,
  abortController,
  contentType = 'application/json;charset=UTF-8',
  delay = 1500,
}) {
  return window
    .fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'content-type': contentType,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      delay: delay,
      body: JSON.stringify(body),
      signal: abortController ? abortController.signal : undefined,
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })
}

/**
 *
 * @param {String} endpoint
 * @param {String} token
 * @param {Object|Array} body
 * @param {Object} abortController
 * @param {Number} delay
 *
 * @returns {Promise}
 */
function putFormData({endpoint, body, token, abortController, delay = 1500}) {
  return window
    .fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      delay: delay,
      body: body,
      signal: abortController ? abortController.signal : undefined,
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })
}

/**
 *
 * @param {String} endpoint
 * @param {String} token
 * @param {Object} abortController
 * @param {Number} delay
 *
 * @returns {Promise}
 */
function deleteRequest({
  endpoint,
  token,
  abortController,
  contentType = 'application/json;charset=UTF-8',
  delay = 1500,
}) {
  return window
    .fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'content-type': contentType,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      delay: delay,
      signal: abortController ? abortController.signal : undefined,
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response)
      } else {
        return errorHandler(response)
      }
    })
}

export {get, post, patch, put, deleteRequest, putFormData}
