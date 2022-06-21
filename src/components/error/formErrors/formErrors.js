import {Fragment} from 'react'
import PropTypes from 'prop-types'

import {CautionRounded} from 'assets/icons'

import style from './formErrors.module.scss'

function FormErrors({errorMessages = []}) {
  return (
    <p className={style.error}>
      {errorMessages.map((message, index) => {
        if (message) {
          if (Array.isArray(message)) {
            return message.map((m, i) => (
              <Fragment key={i}>
                <span className={style['error-item-container']}>
                  <span className={style['error-icon-container']}>
                    <CautionRounded />
                  </span>
                  <span className={style.text}>{m}</span>
                </span>
              </Fragment>
            ))
          } else {
            return (
              <Fragment key={index}>
                <span className={style['error-item-container']}>
                  <span className={style['error-icon-container']}>
                    <CautionRounded />
                  </span>
                  <span className={style.text}>{message}</span>
                </span>
              </Fragment>
            )
          }
        } else return ''
      })}
    </p>
  )
}

FormErrors.propTypes = {
  errorMessages: PropTypes.array.isRequired,
}

export default FormErrors
