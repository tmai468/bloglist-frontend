import axios from "axios"
const baseUrl = '/api/login'

const attemptLogin = async credentials => {
    // console.log(credentials)
    const response = await axios.post(baseUrl, credentials)
    // console.log(response.data)
    return response.data
}

export default { attemptLogin }