import React from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { createLogoutAction } from "../reducers/loggedInUserReducer"
const LoggedInUser = (props) => {
    const dispatch = useDispatch()
    const { name } = props
    const handleLogout = () => { 
        window.localStorage.removeItem('loggedInUserJSON')
        dispatch(createLogoutAction())
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
    // setUser: PropTypes.func.isRequired
}

export default LoggedInUser