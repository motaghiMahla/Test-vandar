import {useRef} from 'react'
import {useTranslation} from 'react-i18next'

import {Picture} from 'components'

import LogoPNG from './logo.png'

function Logo({...props}) {
  const {t} = useTranslation()

  const tRef = useRef(t)

  return (
    <Picture
      src={LogoPNG}
      alt={tRef.current('alts.logo')}
      srcSet={[LogoPNG]}
      width="180"
      {...props}
    />
  )
}

export default Logo
