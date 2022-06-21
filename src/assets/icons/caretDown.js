import PropTypes from 'prop-types'

import {ReactComponent as CaretDownIcon} from './caretDown.svg'

function CaretDown(props) {
  return <CaretDownIcon {...props} />
}

CaretDown.propTypes = {
  props: PropTypes.any,
}

export default CaretDown
