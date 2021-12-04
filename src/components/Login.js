import React, { useState } from "react"
import LoginError from "./Error"
import loginService from '../services/login'
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { createLoginAction } from "../reducers/loggedInUserReducer"
import { Form, Button } from "react-bootstrap"
const Login = (props) => {
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const { username, setUsername, password, setPassword } = props
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          // console.log(username)
          // console.log(password)
        const user = await loginService.attemptLogin({ username, password })
        // window.localStorage.setItem('loggedInUserJSON', JSON.stringify(user))
        console.log('got user')
        console.log(user)
        window.localStorage.setItem('loggedInUserJSON', JSON.stringify(user))
        dispatch(createLoginAction(user))
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
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => {
                        console.log(target.value)
                        setUsername(target.value)}}
                    />
                    
                    <Form.Label>password</Form.Label>
                    <Form.Control id="password"
                    type="password"
                    value={password}
                    name="Username"
                    onChange={({target}) => {
                        console.log(target.value)
                        setPassword(target.value)}}
                    />
                <Button id="loginButton" type="submit" variant="primary">login</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
    // setUser: PropTypes.func.isRequired
}

export default Login