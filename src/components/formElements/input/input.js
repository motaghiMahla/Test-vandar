import {forwardRef, useMemo} from 'react'
import PropTypes from 'prop-types'

import {FormErrors} from 'components'

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
const Input = forwardRef((props, ref) => {
  const {
    id,
    label,
    type = 'text',
    icon = null,
    iconOnClick = null,
    size = 'normal',
    containerClass = '',
    inputClass = '',
    iconClass = '',
    errorMessages = [],
    showErrorMessages = true,
    inputOnly = false,
    ...rest
  } = props

  const errorMessagesExistence = useMemo(
    () =>
      [...new Set(errorMessages)]
        .flat()
        .find(error => typeof error === 'string'),
    [errorMessages],
  )

  return (
    <>
      {inputOnly ? (
        <>
          <input
            className={`${style.input} ${size === 'small' ? style.small : ''} ${
              icon ? style['has-icon'] : ''
            }  ${inputClass}`}
            id={id}
            type={type}
            ref={ref}
            {...rest}
          />
          {errorMessagesExistence && (
            <FormErrors errorMessages={errorMessages} />
          )}
        </>
      ) : (
        <div
          className={`${style['input-control']} ${
            errorMessagesExistence ? style.error : ''
          } ${containerClass}`}
          data-type={type}
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
          <input
            className={`${style.input} ${size === 'small' ? style.small : ''} ${
              icon ? style['has-icon'] : ''
            }  ${inputClass}`}
            id={id}
            type={type}
            ref={ref}
            {...rest}
          />
          {label && type === 'checkbox' && (
            <label
              htmlFor={id}
              className={`${style.label} ${style.checkboxLabel}`}
            >
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
          {errorMessagesExistence && showErrorMessages && (
            <FormErrors errorMessages={errorMessages} />
          )}
        </div>
      )}
    </>
  )
})

Input.propTypes = {
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

export default Input
