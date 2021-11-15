import React from "react"
import PropTypes from "prop-types"
const LoggedInUser = (props) => {
    const { name, setUser } = props
    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUserJSON')
        setUser(null)
        
    }
    return (
        <div>
            <p>
            {name} logged in
            <button onClick={handleLogout}>logout</button>
            </p>
        </div>
    )
}

LoggedInUser.propTypes = {
    name: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired
}

export default LoggedInUser