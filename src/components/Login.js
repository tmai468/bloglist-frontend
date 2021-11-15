import React, { useState } from "react"
import LoginError from "./Error"
import loginService from '../services/login'
import PropTypes from "prop-types"
const Login = (props) => {
    const [error, setError] = useState(false)
    const { username, setUsername, password, setPassword, setUser} = props
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          // console.log(username)
          // console.log(password)
        const user = await loginService.attemptLogin({ username, password })
        console.log(user)
        window.localStorage.setItem('loggedInUserJSON', JSON.stringify(user))
         setUser(user)
        setUsername('')
        setPassword('')
        } catch (exception) {
          setError(true)
          setTimeout(() => {setError(false)}, 5000)
        }
      }
    return (
        <div>
            <h2>
                log in to application
            </h2>
            {error ? <LoginError /> : null}
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => {
                        console.log(target.value)
                        setUsername(target.value)}}
                    />
                </div>
                <div>
                    password
                    <input id="password"
                    type="password"
                    value={password}
                    name="Username"
                    onChange={({target}) => {
                        console.log(target.value)
                        setPassword(target.value)}}
                    />
                </div>
                <button id="loginButton" type="submit">login</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
}

export default Login