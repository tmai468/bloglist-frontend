import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = (newToken) => {
  token = newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const allBlogHidden = response.data.map(blog => {
    return {...blog, showBlog: false}
  })
  return allBlogHidden
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

// PUT request to add comment to list of comments
const addComment = async (newComment, blogObject) => {
  console.log('about to add comment')
  const newBlogObj = {...blogObject,
                      comments: blogObject.comments.concat(newComment)}
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const updatedNote = await axios.put(baseUrl.concat(`/${blogObject.id}`),
    newBlogObj, config)
  console.log('after request')
  console.log(updatedNote.data)
  return updatedNote.data
}


export default { getAll, setToken, createNewBlog, updateLikes, deleteBlog, addComment }