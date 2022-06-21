import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import {Controller} from 'react-hook-form'

import {FormErrors} from 'components/error'
import {filterIt} from 'utils'

import style from './styledSelect.module.scss'

/**
 *
 * @param {String} id
 * @param {Array} options
 * @param {String} label
 * @param {String} size
 * @param {String} containerStyle
 * @param {String} selectClass
 * @param {String} errorMessages
 * @param {Function} chosenOptionHandler
 * @param {String} placeholder
 * @param {String} name
 * @param {Object} control
 * @param {Object} rules
 * @param {Function} setValue
 * @param {String} status
 * @param {any} rest
 *
 * @returns {HTMLElement}
 */

const StyledSelect = forwardRef((props, ref) => {
  const {
    id,
    label,
    size = 'normal',
    containerClass = '',
    selectClass = '',
    errorMessages = [],
    options = [],
    chosenOptionHandler,
    placeholder,
    name,
    control,
    reference,
    setValue,
    status,

    ...rest
  } = props
  const initialStates = useMemo(
    () => ({
      optionsVisibilityStatus: false,
      selectedOption: '',
      filteredOptions: '',
      search: false,
    }),
    [],
  )

  const [state, setState] = useState(initialStates)

  const {t} = useTranslation()

  const tRef = useRef(t)
  const optionsRef = useRef(null)
  const inputValueRef = useRef(null)
  const optionsContainerRef = useRef(null)
  const optionsPlaceholderRef = useRef(null)

  const {optionsVisibilityStatus, selectedOption, filteredOptions, search} =
    state

  const optionsVisibilityStatusHandler = useCallback(
    () =>
      setState(prev => {
        if (prev.optionsVisibilityStatus) {
          optionsPlaceholderRef.current?.textContent &&
            (optionsPlaceholderRef.current.textContent = placeholder)

          optionsRef.current.style.display = ''
          inputValueRef.current.textContent = ''
          setState(prev => ({...prev, search: false}))
        } else {
          optionsPlaceholderRef.current?.textContent &&
            (optionsPlaceholderRef.current.textContent = tRef.current(
              'placeholders.searchThroughTheCoins',
            ))
          inputValueRef.current.focus()
        }

        return {...prev, optionsVisibilityStatus: !prev.optionsVisibilityStatus}
      }),
    [placeholder],
  )
  const selectOptionHandler = useCallback(
    event => {
      chosenOptionHandler(event)

      const {target} = event
      const optionId = target.closest('li').dataset.id

      setState(prev => ({...prev, selectedOption: optionId}))

      setValue(name, optionId)

      optionsVisibilityStatusHandler()
    },
    [chosenOptionHandler, name, optionsVisibilityStatusHandler, setValue],
  )
  const selectedOptionJSX = useCallback(() => {
    const selectedOptionObj = options.find(
      option => selectedOption === option.symbol,
    )

    return (
      <>
        {selectedOptionObj ? (
          <>
            {selectedOptionObj.icon && (
              <span className={style['icon-container']}>
                {selectedOptionObj.icon}
              </span>
            )}
            <span className={style.label}>
              <span className={style.name}>{selectedOptionObj.name}</span>
              {'-'}
              <span className={style.symbol}>{selectedOptionObj.symbol}</span>
            </span>
          </>
        ) : (
          <span className={style.placeholder} ref={optionsPlaceholderRef}>
            {placeholder}
          </span>
        )}
      </>
    )
  }, [options, placeholder, selectedOption])
  const onChangeHandler = useCallback(
    event => {
      const {target} = event

      if (target.textContent) {
        optionsRef.current.style.display = 'none'

        setTimeout(() => {
          setState(prev => ({
            ...prev,
            search: true,
            filteredOptions: filterIt({
              searchText: target.textContent,
              searchItems: options,
              keys: ['icon', 'network'],
              include: false,
            }),
          }))
        }, 300)
      } else {
        optionsRef.current.style.display = ''
        inputValueRef.current.textContent = ''
        setValue(name, selectedOption)
        setState(prev => ({...prev, search: false}))
      }
    },
    [name, options, selectedOption, setValue],
  )
  const optionsHandler = useCallback(
    options => (
      <>
        {options?.length > 0 ? (
          options.map(option => (
            <li
              key={option.symbol}
              className={
                option.status !== false
                  ? `${style['option']}`
                  : `${style['option']} ${style['de-active']} `
              }
              data-id={option.symbol}
              data-status={option.status ? 'active' : 'disable'}
              onClick={
                option.status !== false
                  ? event => selectOptionHandler(event)
                  : () => {}
              }
            >
              {option.icon && (
                <span className={style['icon-container']}>{option.icon}</span>
              )}
              <span className={style.label}>
                <span className={style.name}>{option.name}</span>
                <span className={style.symbol}>{option.symbol}</span>
              </span>
            </li>
          ))
        ) : (
          <li className={style.option} disabled={true} data-id="">
            {`${label} ${tRef.current('labels.notFound')}`}
          </li>
        )}
      </>
    ),
    [label, selectOptionHandler],
  )

  useEffect(() => {
    let timeout = null

    if (status === 'resolved') {
      timeout = setTimeout(() => {
        optionsVisibilityStatusHandler()
        optionsContainerRef.current
          ?.querySelector('li[data-status="active"]')
          .click()

        inputValueRef.current.blur()
      }, 100)
    }

    return () => clearTimeout(timeout)
  }, [status, optionsVisibilityStatusHandler])

  return (
    <div
      className={`${style['select-control']} ${
        errorMessages.find(error => typeof error === 'string')
          ? style.error
          : ''
      } ${containerClass}`}
    >
      {optionsVisibilityStatus && (
        <div
          className={style.overlay}
          onClick={() => optionsVisibilityStatusHandler()}
        />
      )}
      {label && (
        <label htmlFor={id} className={`${style.label}`}>
          {label}
        </label>
      )}
      <div
        className={style['select-value']}
        onClick={() => optionsVisibilityStatusHandler()}
      >
        <div className={style['selected-option']} ref={optionsRef}>
          {selectedOptionJSX()}
        </div>
        <div className={style['input-container']}>
          <Controller
            name={name}
            control={control}
            render={({field: {onChange, ref, ...otherFields}}) => (
              <input
                className={`${style.input} ${
                  size === 'small' ? style.small : ''
                } ${selectClass}`}
                id={id}
                type="hidden"
                onChange={event => {
                  onChange(event)
                }}
                {...otherFields}
                {...rest}
              />
            )}
            reference
          />
          <div
            className={style['input-value']}
            contentEditable={true}
            onInput={onChangeHandler}
            ref={inputValueRef}
          />
        </div>
      </div>
      {optionsVisibilityStatus && (
        <div className={style['options-container']}>
          <ul className={style.list} ref={optionsContainerRef}>
            {search ? optionsHandler(filteredOptions) : optionsHandler(options)}
          </ul>
        </div>
      )}

      <FormErrors errorMessages={errorMessages} />
    </div>
  )
})

StyledSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  containerStyle: PropTypes.string,
  selectClass: PropTypes.string,
  options: PropTypes.array.isRequired,
  chosenOptionHandler: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  control: PropTypes.object,
  rules: PropTypes.object,
  setValue: PropTypes.func,
  status: PropTypes.string,
  errorMessages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default StyledSelect
