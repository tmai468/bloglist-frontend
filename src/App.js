import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
// import loginService from './services/login'
import Login from './components/Login'
import LoggedInUser from './components/LoggedInUser'
import CreateBlog from './components/CreateBlog'
import BlogCreatedNotif from './components/BlogCreatedNotif'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogCreatedSuccess, setBlogCreatedSuccess] = useState(false)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.createNewBlog({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    setBlogCreatedSuccess(true)
    setTimeout(() => {setBlogCreatedSuccess(false)}, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // if the user is not set yet, login form is displayed
  console.log('window localstorage in main')
  console.log(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  if (window.localStorage.getItem('loggedInUserJSON') === null) {
    // window.localStorage.setItem('loggedInUserJSON', {name: "Kiwoong"})
    return (
    <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser}
    />)
  }
  // setUser(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  // console.log('right here')
  // window.localStorage.setItem('loggedInUserJSON', user)
  blogService.setToken(user.token)
  return (
    <div>
      <h2>blogs</h2>
      {blogCreatedSuccess ? <BlogCreatedNotif title={blogs.at(-1).title} author={blogs.at(-1).author}/> : null}
      <LoggedInUser name={user.name} setUser={setUser}/>
      <CreateBlog title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}
      url={url} setUrl={setUrl}
      handleBlogCreation={handleBlogCreation}/>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
  )
}

export default App