import {forwardRef, useRef} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

import {FormErrors} from 'components/error'

import style from './select.module.scss'

/**
 *
 * @param {String} id
 * @param {Array} options
 * @param {String} label
 * @param {String} size
 * @param {String} containerStyle
 * @param {String} inputClass
 * @param {String} errorMessages
 * @param {any} rest
 *
 * @returns {HTMLElement}
 */

const Select = forwardRef((props, ref) => {
  const {
    id,
    label,
    size = 'normal',
    containerClass = '',
    selectClass = '',
    errorMessages = [],
    options = [],
    ...rest
  } = props

  const {t} = useTranslation()
  const tRef = useRef(t)

  return (
    <div
      className={`${style['select-control']} ${
        errorMessages.find(error => typeof error === 'string')
          ? style.error
          : ''
      } ${containerClass}`}
    >
      {label && (
        <label htmlFor={id} className={`${style.label}`}>
          {label}
        </label>
      )}
      <select
        disabled={options.length > 0 ? false : true}
        className={`${style.select} ${
          size === 'small' ? style.small : ''
        }  ${selectClass}`}
        id={id}
        ref={ref}
        defaultValue=""
        {...rest}
      >
        {options.length > 0 ? (
          <>
            <option disabled={true} value="">
              {`${label} ${tRef.current('labels.select')}`}
            </option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        ) : (
          <option disabled={true} value="">
            {`${label} ${tRef.current('labels.notFound')}`}
          </option>
        )}
      </select>
      <FormErrors errorMessages={errorMessages} />
    </div>
  )
})

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  containerStyle: PropTypes.string,
  selectClass: PropTypes.string,
  options: PropTypes.array.isRequired,
  errorMessages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default Select
