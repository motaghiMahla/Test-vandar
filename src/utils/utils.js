import {thousandSeparator} from 'shared'

/**
 * @param  {Object} event
 */
function eyeHandler(event) {
  if (!event) return undefined
  const {target} = event
  const input = target.closest('div').querySelector('input')
  input.type === 'password' ? (input.type = 'text') : (input.type = 'password')
}

/**
 *
 * @param {Number|String} number
 *
 * @returns {String}
 */
function numberWithCommas(number) {
  if (!number) return number
  return number.toString().replace(thousandSeparator, ',')
}

/**
 *
 * @param {String} string
 *
 * @returns {String}
 */

/**
 *
 * @param {String} error
 *
 * @returns {String}
 */
function specialErrorsInFarsi(error) {
  switch (error) {
    case 'Authentication credentials were not provided.':
      return 'بـرای انـجام این مرحـله نیـاز اسـت تا با نام کاربـری و رمز عبور وارد شویـد'
    case 'No active account found with the given credentials':
      return 'هـیچ کاربـر فعـالی با آدرس ایمیل و گذرواژه وارد شده یافـت نشـد'
    default:
      return error
  }
}

export {eyeHandler, numberWithCommas, specialErrorsInFarsi}
