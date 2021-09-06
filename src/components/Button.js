import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
  const style = {
    backgroundColor: color,
  }

  return (
    <button className="btn" style={style} onClick={onClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
