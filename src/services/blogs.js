import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = async (dataObj) => {
  console.log('here')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, dataObj, config)
  console.log(response.data)  
  return response.data
}

export default { getAll, setToken, createNewBlog }