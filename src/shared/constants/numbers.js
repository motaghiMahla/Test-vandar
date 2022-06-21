// This is a place to store global numbers

// Cookie and localStorage max age
const authMaxAge = 60 * 60 * 24 * 14 * 1000

// Profile status flags
const noProfile = 0
const fullyVerified = 1

// Default input limits
const minimumInputLimit = 100
const maximumInputLimit = 5000

// Screen Media
const mobileScreen = 480
const tabletScreen = 767
const mediumTabletScreen = 980
const mediumDesktopScreen = 1100
const largeScreen = 1200
const largeIshScreen = 1300

// Scroll from top
const scrollWhenPromotionIsOn = 70
const scrollWhenPromotionIsOnAndAuthenticationBannerIsOn = 150

// Default pagination values
const defaultPageSize = 2

// Default OTP timeouts
const otpTimeoutMinutes = 1
const otpTimeoutSeconds = 0

// Default server status codes
const unAuthorizedCode = 401
const serverErrorCode = 500

export {
  mobileScreen,
  largeIshScreen,
  authMaxAge,
  noProfile,
  fullyVerified,
  minimumInputLimit,
  maximumInputLimit,
  tabletScreen,
  mediumTabletScreen,
  mediumDesktopScreen,
  largeScreen,
  scrollWhenPromotionIsOn,
  scrollWhenPromotionIsOnAndAuthenticationBannerIsOn,
  defaultPageSize,
  otpTimeoutMinutes,
  otpTimeoutSeconds,
  unAuthorizedCode,
  serverErrorCode,
}
