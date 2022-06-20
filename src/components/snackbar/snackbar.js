import {useCallback, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import PropTypes from 'prop-types'

import {Close} from 'assets/icons'

import style from './snackbar.module.scss'

/**
 *
 * @param {Object} setState
 * @param {String} stateName
 * @param {String} text
 * @param {String} type
 * @param {Any} rest
 *
 * @returns {HTMLElement}
 */

function Snackbar({setState, stateName, text, type, ...rest}) {
  const {t} = useTranslation()

  const tRef = useRef(t)

  const closeHandler = useCallback(() => {
    setState(prev => ({...prev, [stateName]: false}))
  }, [setState, stateName])

  return (
    <div className={`${style['snackbar-area']}`} {...rest}>
      <div id="snackbar" className={`${style['top-right']}`}>
        <div
          className={`${style.inner} ${
            type === 'success' ? style.success : style.error
          }`}
        >
          <span>{text}</span>
          <span
            title={tRef.current('elementTitles.close')}
            role={'button'}
            className={style.close}
            onClick={() => closeHandler()}
          >
            <Close />
          </span>
        </div>
      </div>
    </div>
  )
}

Snackbar.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  setState: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired,
}

export default Snackbar
