import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {Logo as LogoIcon} from 'assets/icons'

import style from './logo.module.scss'
import {useRef} from 'react'

/**
 *
 * @param {String} className
 *
 * @returns {HTMLElement}
 */
function Logo({className = '', ...rest}) {
  const {t} = useTranslation()
  const tRef = useRef(t)

  return (
    <Link to="/" className={className} title={tRef.current('alts.primaryHome')}>
      <span className={style.logo}>
        <LogoIcon />
      </span>
    </Link>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
}

export default Logo
