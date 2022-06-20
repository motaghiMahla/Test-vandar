import PropTypes from 'prop-types'

import {ReactComponent as CaretIcon} from './caret.svg'

function Caret(props) {
  return <CaretIcon {...props} />
}

Caret.propTypes = {
  props: PropTypes.any,
}

export default Caret
