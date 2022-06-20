import PropTypes from 'prop-types'

import {ReactComponent as PhoneIcon} from './phone.svg'

/**
 *
 * @param {String} className
 * @returns
 */
function Phone({className = ''}) {
  return <PhoneIcon className={className} />
}

Phone.propTypes = {
  className: PropTypes.string,
}

export default Phone
