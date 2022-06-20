import {useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'

import style from './button.module.scss'

/**
 *
 * @param {String} html
 * @param {String} className
 * @param {HTMLElement} icon
 * @param {Boolean} loading
 * @param {String} containerClassName
 * @param {any} rest
 *
 * @returns {HTMLElement}
 */
function Button({
  text = 'button',
  innerText = '',
  className = '',
  icon = null,
  iconOnly = false,
  loading = false,
  containerClassName = '',
  ...rest
}) {
  const styledClassName = className
    .split(' ')
    .map(name => (style[name] ? style[name] : name))
    .join(' ')

  const iconOnlyJSX = useMemo(
    () => (
      <div className={`${style.container} ${containerClassName}`}>
        <span className={style.icon}>{icon}</span>
      </div>
    ),
    [containerClassName, icon],
  )
  const iconExists = useMemo(
    () => (
      <div className={`${style.container} ${containerClassName}`}>
        <span role="img" className={style.icon}>
          {icon}
        </span>
        <span className={style.text}>{text}</span>
      </div>
    ),
    [containerClassName, icon, text],
  )
  const iconAndLoadingAreFalse = useMemo(
    () => (
      <span className={style.text}>
        {text}
        {innerText && <span className={style.innerText}>{innerText}</span>}
      </span>
    ),
    [innerText, text],
  )

  const buttonBodyJSX = useCallback(() => {
    if (iconOnly) {
      return iconOnlyJSX
    } else if (icon) {
      return iconExists
    } else {
      return iconAndLoadingAreFalse
    }
  }, [icon, iconAndLoadingAreFalse, iconExists, iconOnly, iconOnlyJSX])

  return (
    <button className={`${style.button} ${styledClassName}`} {...rest}>
      {buttonBodyJSX()}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  loading: PropTypes.bool,
  containerClassName: PropTypes.string,
}

export default Button
