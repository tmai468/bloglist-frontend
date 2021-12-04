const loggedInUserReducer = (state=JSON.parse(window.localStorage.getItem('loggedInUserJSON')), action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const createLoginAction = (loggedUser) => {
    return {
        type: 'LOGIN',
        data: loggedUser
    }
}

export const createLogoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

export default loggedInUserReducer