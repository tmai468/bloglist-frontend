import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = React.forwardRef((props, ref) => {
    const [formVisible, setFormVisible] = useState(false)
    const hideWhenFormVisible = {display: formVisible ? 'none' : ''}
    const showWhenFormVisible = {display: formVisible ? '' : 'none'}
    
    // need to be able to access this function outside of Togglable, from App component
    const toggleVisibility = () => {
        setFormVisible(!formVisible)
    }
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        // button create new blog
        <div>
            <div style={hideWhenFormVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabelShow}</button>
            </div>
            <div style={showWhenFormVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.buttonLabelHide}</button>
            </div>
        </div>

    )
})

Togglable.propTypes = {
    buttonLabelShow: PropTypes.string.isRequired,
    buttonLabelHide: PropTypes.string.isRequired
}

export default Togglable