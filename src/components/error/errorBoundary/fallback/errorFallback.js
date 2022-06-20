import {useRef} from 'react'
import {useTranslation} from 'react-i18next'

import style from './errorFallback.module.scss'

function ErrorFallback() {
  const {t} = useTranslation()

  const tRef = useRef(t)

  document.body.style.overflow = ''

  return (
    <div className={style.container}>
      <h1 className={style.error}>{tRef.current('errors.fallback')}</h1>
    </div>
  )
}

export default ErrorFallback
