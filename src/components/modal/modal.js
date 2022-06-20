import {useCallback, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

import {Arrow, Close} from 'assets/icons'

import style from './modal.module.scss'

/**
 *
 * @param {Function} closeHandler
 * @param {String} usage
 * @param {String} title
 * @param {String} titleClass
 * @param {HTMLElement} body
 * @param {HTMLElement|Boolean} footer
 * @param {String} bodyClass
 * @param {Boolean} flexColumnBody
 * @param {stateName} stateName
 * @param {Function} setState
 *
 * @returns {HTMLElement}
 */
function Modal({
  containerClass = '',
  closeHandler,
  usage = 'warning',
  title,
  body,
  bodyClass = '',
  footer,
  titleClass = '',
  flexColumnBody = false,
  stateName = 'modalStatus',
  setState,
  fullScreen = false,
  ...rest
}) {
  const {t} = useTranslation()
  const tRef = useRef(t)

  const documentBodyRef = useRef(document.body)

  const modalCloseHandler = useCallback(() => {
    setState(prev => ({...prev, [stateName]: false}))

    documentBodyRef.current.style.overflow = ''
  }, [setState, stateName])

  useEffect(() => {
    documentBodyRef.current.style.overflow = 'hidden'
  }, [])

  return (
    <div
      className={`${style.container} ${containerClass ? containerClass : ''}`}
      {...rest}
    >
      <div
        className={style.overlay}
        onClick={() => (setState ? modalCloseHandler() : closeHandler())}
      />
      <div
        className={`${style.modal} ${fullScreen ? style['full-screen'] : ''}`}
      >
        {title && (
          <div
            className={`${style.header} ${
              titleClass === 'sell' ? style.sell : ''
            } ${titleClass === 'buy' ? style.buy : ''}
            ${
              titleClass === 'intelligentBasket'
                ? style['intelligent-basket']
                : ''
            }`}
          >
            <div className={`${style.title} heading-03`}>{title}</div>
            <span
              title={tRef.current('elementTitles.close')}
              className={style.close}
              onClick={() => (setState ? modalCloseHandler() : closeHandler())}
            >
              {fullScreen ? <Arrow /> : <Close />}
            </span>
          </div>
        )}
        <div
          className={`${style.body} ${
            !title
              ? (usage === 'buy' && style.buy) ||
                (usage === 'sell' && style.sell) ||
                (usage === 'warning-icon' && style.caution) ||
                (usage === 'warning' && style.warning) ||
                (usage === 'intelligentBasket' && style['intelligent-basket'])
              : ''
          } ${bodyClass} ${flexColumnBody ? style['flex-column'] : ''}`}
        >
          {body}
        </div>
        {footer && <div className={style.footer}>{footer}</div>}
      </div>
    </div>
  )
}

Modal.propTypes = {
  closeHandler: PropTypes.func,
  usage: PropTypes.string,
  title: PropTypes.string,
  titleClass: PropTypes.string,
  body: PropTypes.element.isRequired,
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  bodyClass: PropTypes.string,
  flexColumnBody: PropTypes.bool,
  stateName: PropTypes.string,
  setState: PropTypes.func,
  fullScreen: PropTypes.bool,
}

export default Modal
