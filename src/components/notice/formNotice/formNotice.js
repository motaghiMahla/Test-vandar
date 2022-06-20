import PropTypes from 'prop-types'

import {ClarityErrorLine} from 'assets/icons'

import style from './formNotice.module.scss'

/**
 *
 * @param {String} action
 * @param {Function} submitHandler
 *
 * @returns {HTMLElement}
 */

function FormNotice({message, ...rest}) {
  return (
    <div className={style.container} {...rest}>
      <ClarityErrorLine />
      <p>{message}</p>
    </div>
  )
}

FormNotice.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default FormNotice
