const emailOnly = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

/**
 * TODO: The current mobile and number regexps do not support persian characters like ۱۲۳۴۵۶۷۸۹۰
 * We need to fix this later.
 */
const integersOnly = /\d*/
const integersWithSpacesOnly = /^[(\d* \d*)]*$/
const numbersOnly = /^\d*\.?\d*$/
const enOrFaNumber = /[۰-۹0-9]/
const persianNumbers = /[\u06F0-\u06F9]/g
const arabicNumbers = /[\u0660-\u0669]/g
const numbersWithThousandSeparator = /^[(\d*,*\d*)]*\.?\d*$/
const noneZeroDecimalPoint = /^-?\d*\.?0*\d{0,2}/

const dateOnly = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/

const irMobileOnly = /^09[(\d* \d*)]*$/

const httpURL = /^http([s]){0,1}:\/\//

const onlyEnglishCharacters = /^[A-Za-z0-9]*$/
const onlyAlphabetCharacters =
  /[a-zA-Z\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC ]$/
const persianAlphabetCharacters =
  /[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC ]$/

/**
 * TODO: Need to find an alternative separator for decimal numbers, because the
 * negative lookbehind regex (/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g) won't work on Webkit browsers
 */
const thousandSeparator = /\B(?=(\d{3})+(?!\d))/g

const space = / /g
const dot = '.'
const slash = '/'
const startsWithZero = /^0/
const startsWithIR = /^IR/
const startsWithIrCode = /^98/
const startsWithImage = /image\//
const startsWithVideo = /video\//

export {
  integersOnly,
  integersWithSpacesOnly,
  numbersOnly,
  onlyEnglishCharacters,
  onlyAlphabetCharacters,
  numbersWithThousandSeparator,
  noneZeroDecimalPoint,
  emailOnly,
  irMobileOnly,
  dateOnly,
  persianNumbers,
  arabicNumbers,
  persianAlphabetCharacters,
  httpURL,
  thousandSeparator,
  space,
  dot,
  slash,
  startsWithZero,
  startsWithIR,
  startsWithIrCode,
  enOrFaNumber,
  startsWithImage,
  startsWithVideo,
}
