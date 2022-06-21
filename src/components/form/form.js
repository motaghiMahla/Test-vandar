import {Fragment} from 'react'
import PropTypes from 'prop-types'

import {Input, Button, Select, ControlledInput, StyledSelect} from 'components'

import style from './form.module.scss'

/**
 *
 * @param {Array} elements
 *
 * @returns {HTMLElement}
 */
function Form({elements = [], className = '', ...props}) {
  const formElements = []
  elements.forEach(element => {
    const {reference, tag, parent = true, ...rest} = element
    switch (tag) {
      case 'input':
        formElements.push(<Input {...rest} {...reference} />)
        break
      case 'button':
        formElements.push(<Button {...rest} />)
        break
      case 'select':
        formElements.push(<Select {...rest} {...reference} />)
        break
      case 'styledSelect':
        formElements.push(<StyledSelect {...rest} {...reference} />)
        break
      case 'control':
        formElements.push(<ControlledInput {...rest} />)
        break
      case 'p':
        formElements.push(<p {...rest} />)
        break
      case 'div':
        if (parent) {
          formElements.push(<div {...rest} />)
        } else {
          formElements.push(<Fragment {...rest} />)
        }
        break
      default:
        break
    }
  })

  return (
    <form className={`${style.form} ${className}`} {...props}>
      {formElements}
    </form>
  )
}

Form.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object),
}

export default Form
