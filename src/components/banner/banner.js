import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

import {Close} from 'assets/icons'
import {Button} from 'components'

import style from './banner.module.scss'
import {useRef} from 'react'

/**
 *
 * @param {String|HTMLElement} content
 * @param {HTMLElement} buttons
 * @param {Boolean} fullWidth
 *
 * @returns {HTMLElement}
 */
function Banner({
  content,
  buttons,
  closeHandler = () => {},
  closeButton = false,
  closeIcon = false,
  fullWidth = false,
  error = true,
  noIcon = false,
  ...rest
}) {
  const {t} = useTranslation()
  const tRef = useRef(t)

  return (
    <div
      className={`${style.container} ${error ? style.error : style.success}`}
      {...rest}
    >
      <div
        className={`${style.banner} ${fullWidth ? style['full-width'] : ''} ${
          closeIcon ? style.row : ''
        } ${noIcon ? style['no-icon'] : ''}`}
      >
        <p className={`${style.text} desc-02`}>{content}</p>
        {(closeIcon || closeButton) && (
          <div className={style['button-container']}>
            {closeIcon ? (
              <span
                className={style['icon-container']}
                title={tRef.current('elementTitles.close')}
                onClick={() => closeHandler()}
              >
                <Close />
              </span>
            ) : closeButton ? (
              <>
                <Button
                  className="secondary-outline"
                  text={tRef.current('buttons.doNotShowMessage')}
                  onClick={() => closeHandler()}
                />
                {buttons}
              </>
            ) : (
              buttons
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Banner.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired,
  ]),
  buttons: PropTypes.element,
  closeIcon: PropTypes.bool,
  closeHandler: PropTypes.func,
  fullWidth: PropTypes.bool,
}

export default Banner
