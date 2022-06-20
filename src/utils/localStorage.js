/**
 *
 * @param {String} localStorageKey
 * @param {any} value
 *
 * @returns {any}
 */
function setIntoLocalStorage(localStorageKey, value) {
  return window.localStorage.setItem(localStorageKey, JSON.stringify(value))
}

/**
 *
 * @param {String} localStorageKey
 *
 * @returns {any}
 */
async function getFromLocalStorage(localStorageKey) {
  return await JSON.parse(window.localStorage.getItem(localStorageKey))
}

/**
 *
 * @param {String} localStorageKey
 *
 * @returns {any}
 */
function removeFromLocalStorage(localStorageKey) {
  window.localStorage.removeItem(localStorageKey)
}

export {getFromLocalStorage, setIntoLocalStorage, removeFromLocalStorage}
