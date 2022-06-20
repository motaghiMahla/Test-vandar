import {forwardRef, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Controller} from 'react-hook-form'

import {FormErrors} from 'components/error'

import style from './input.module.scss'

/**
 *
 * @param {String} id
 * @param {String} label
 * @param {String} type
 * @param {String|HTMLElement} icon
 * @param {String} size
 * @param {Function} iconOnClick
 * @param {String} containerStyle
 * @param {String} inputClass
 * @param {String} iconClass
 * @param {String} errorMessages
 * @param {any} rest
 *
 * @returns {HTMLElement}
 */
const ControlledInput = forwardRef((props, ref) => {
  const {
    id,
    label,
    type = 'text',
    icon = null,
    iconOnClick = null,
    containerClass = '',
    iconClass = '',
    errorMessages = [],
    ...rest
  } = props

  const errorMessagesExistence = useMemo(
    () => errorMessages.flat().find(error => typeof error === 'string'),
    [errorMessages],
  )

  return (
    <div
      className={`${style['input-control']} ${
        errorMessagesExistence ? style.error : ''
      } ${containerClass}`}
    >
      {label && type !== 'checkbox' && (
        <label
          htmlFor={id}
          className={`${style.label} ${
            type === 'file' ? style['label-button'] : ''
          }`}
        >
          {label}
        </label>
      )}
      <Controller {...rest} />
      {label && type === 'checkbox' && (
        <label htmlFor={id} className={`${style.label} ${style.checkboxLabel}`}>
          {label}
        </label>
      )}
      {icon && (
        <span
          className={`${style['icon-container']} ${
            typeof icon === 'string' ? style.text : ''
          } ${iconClass}`}
          onClick={iconOnClick}
        >
          {icon}
        </span>
      )}
      {errorMessagesExistence && <FormErrors errorMessages={errorMessages} />}
    </div>
  )
})

ControlledInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconOnClick: PropTypes.func,
  containerStyle: PropTypes.string,
  inputClass: PropTypes.string,
  iconClass: PropTypes.string,
  errorMessages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default ControlledInput
