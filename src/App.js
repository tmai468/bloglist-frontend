import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
// import loginService from './services/login'
import Login from './components/Login'
import LoggedInUser from './components/LoggedInUser'
import CreateBlog from './components/CreateBlog'
import BlogCreatedNotif from './components/BlogCreatedNotif'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const [blogCreatedSuccess, setBlogCreatedSuccess] = useState(false)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const blogCreationRef = useRef()
  const handleBlogCreation = async (newBlogObject) => {
    blogCreationRef.current.toggleVisibility()
    const newBlog = await blogService.createNewBlog(newBlogObject)
    setBlogs(blogs.concat(newBlog))
    setBlogCreatedSuccess(true)
    setTimeout(() => {setBlogCreatedSuccess(false)}, 5000)
  }
  // if the user is not set yet, login form is displayed
  console.log('window localstorage in main')
  console.log(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  if (window.localStorage.getItem('loggedInUserJSON') === null) {
    // window.localStorage.setItem('loggedInUserJSON', {name: "Kiwoong"})
    return (
    <Login  username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser}
    />)
  }
  // setUser(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  // console.log('right here')
  // window.localStorage.setItem('loggedInUserJSON', user)
  blogService.setToken(user.token)
  blogs.sort((blogA, blogB) => parseInt(blogB.likes) - parseInt(blogA.likes))
  return (
    <div>
      <h2>blogs</h2>
      {blogCreatedSuccess ? <BlogCreatedNotif title={blogs.at(-1).title} author={blogs.at(-1).author}/> : null}
      <LoggedInUser name={user.name} setUser={setUser}/>
      <Togglable buttonLabelShow="create new blog" buttonLabelHide="cancel" ref={blogCreationRef}>
        <CreateBlog
        handleBlogCreation={handleBlogCreation}/>
      </Togglable>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedInUserName={user.name}/>
      )}
      </div>
    </div>
  )
}

export default App