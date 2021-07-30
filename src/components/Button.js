
const Button = ({color, text, onClick}) => {
    return (
            <button onClick = {onClick} className="btn" type="button" style = {{backgroundColor: color}}>
                {text}
            </button>
    )
}

Button.defaultProps = { 
    color:'steelblue'
}

export default Button
