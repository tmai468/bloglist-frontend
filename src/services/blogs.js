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

const updateLikes = async (blogObj) => {
  // receives object to + 1 on the likes
  console.log('here')
  console.log(blogObj)
  const putURL = baseUrl.concat(`/${blogObj.id}`)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const updatedLikeBlog = {
    likes: blogObj.likes + 1,
    author: blogObj.author,
    title: blogObj.title,
    url: blogObj.url
  }
  const updatedBlogObj = await axios.put(putURL, updatedLikeBlog, config)
  return updatedBlogObj.data
}

const deleteBlog = async (blogObject) => {
  console.log('about to delete blog')
  const idToDel = blogObject.id
  const delUrl = baseUrl.concat(`/${idToDel}`)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  await axios.delete(delUrl, config)
}

export default { getAll, setToken, createNewBlog, updateLikes, deleteBlog }