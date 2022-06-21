import PropTypes, {element} from 'prop-types'

function AnchorTag({content = undefined, children = null, ...rest}) {
  return (
    <a {...rest} rel="noopener noreferrer">
      {children}
      {content && <span>{content}</span>}
    </a>
  )
}

AnchorTag.prototype = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(element)]),
  children: PropTypes.instanceOf(element),
}

export default AnchorTag
