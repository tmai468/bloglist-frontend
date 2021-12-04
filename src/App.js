import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
// import loginService from './services/login'
import Login from './components/Login'
import LoggedInUser from './components/LoggedInUser'
import CreateBlog from './components/CreateBlog'
import BlogCreatedNotif from './components/BlogCreatedNotif'
import Togglable from './components/Togglable'
import store from './store'
import blogCreatedNotifReducer, {
  createBlogCreatedAction, createNotifRemovedAction
} from './reducers/blogCreatedNotifReducer'
import blogPostReducer, { initialiseBlogs, createAddBlogAction, createBlogUpdateLikes, createAddCommentToBlog } from './reducers/blogPostReducer'
import { createLogoutAction } from './reducers/loggedInUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'
import users from './services/users'
import AllBlogDetails from './components/AllBlogDetails'


const IndividualUser = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const BlogComment = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  console.log('id of blog is', id)
  const blogToShow = blogs.find(blog => blog.id === id)
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const newComment = event.target.comment.value
    const updatedBlog = await blogService.addComment(newComment, blogToShow)
    console.log('updated blog is')
    console.log(updatedBlog)
    dispatch(createAddCommentToBlog(updatedBlog))
    // console.log('updated note is')
    // console.log(updatedNote)
    event.target.comment.value = ''

  }
  if (!blogToShow) {
    return null
  }
  return (
    <div>
      <h2>comments</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Control name="comment"/>
          <Button type="submit" variant="primary">add comment</Button>
        </Form.Group>
      </Form>
      <div>
        {blogToShow.comments.map(comment => <li key={comment}>{comment}</li>)}
      </div>
    </div>
  )
}
const BlogDetail = ({ blogs }) => {
  console.log('reload blogdetail')
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const dispatch = useDispatch()
  const updateLikeForABlog = async (blog) => {
    const newBlog = await blogService.updateLikes(blog)
    dispatch(createBlogUpdateLikes(newBlog.id))
  }
  if (!blog) {
    return null
  }
  console.log('blog user name is')
  console.log(blog.user)
  console.log('blog is')
  console.log(blog)
  // console.log('finally')
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a target="_blank" href={`https://${blog.url}`}>{blog.url}</a>
      <div>{blog.likes} likes<Button variant="secondary" onClick={() => updateLikeForABlog(blog)}>like</Button></div>
      {blog.user && <div>added by {blog.user.name}</div>}
    </div>
  )
}
const App = () => {
  // const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()
  let blogs = useSelector(state => state.blogs)
  let notif = useSelector(state => state.notif)
  let user = useSelector(state => state.loggedInUser)
  // const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const padding = {
    padding: 5
  }
  const handleLogout = () => { 
    window.localStorage.removeItem('loggedInUserJSON')
    dispatch(createLogoutAction())
}
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  // const [blogCreatedSuccess, setBlogCreatedSuccess] = useState(false)
  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )  
  // }, [])

  useEffect(() => {
    blogService.getAll()
    .then(blogs => {
      dispatch(initialiseBlogs(blogs))
    userService.getAll()
    .then(userList => setUsers(userList))
    })
  }, [])
  const blogCreationRef = useRef()
  const handleBlogCreation = async (newBlogObject) => {
    blogCreationRef.current.toggleVisibility()
    const newBlog = await blogService.createNewBlog(newBlogObject)
    // setBlogs(blogs.concat(newBlog))
    // setBlogCreatedSuccess(true)
    dispatch(createAddBlogAction(newBlog))
    dispatch(createBlogCreatedAction(newBlog))
    // setTimeout(() => {setBlogCreatedSuccess(false)}, 5000)
    setTimeout(() => dispatch(createNotifRemovedAction()), 5000)
  }
  // if the user is not set yet, login form is displayed
  // console.log('window localstorage in main')
  // console.log(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  if (user === null) {
    // window.localStorage.setItem('loggedInUserJSON', {name: "Kiwoong"})
    return (
    <Login  username={username} setUsername={setUsername} password={password} setPassword={setPassword}
    />)
  }
  // setUser(JSON.parse(window.localStorage.getItem('loggedInUserJSON')))
  // console.log('right here')
  // window.localStorage.setItem('loggedInUserJSON', user)
  blogService.setToken(user.token)
  blogs.sort((blogA, blogB) => parseInt(blogB.likes) - parseInt(blogA.likes))
  console.log('user not null')
  console.log(user)
  console.log('users are')
  console.log('last blog is')
  console.log(blogs.at(-1))
  userService.getAll().then(users => console.log(users))
  return (
  <div className="container">
  <Router>
    <div>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      {/* <LoggedInUser name={user.name}/> */}
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      
    </div>
    <Switch>
      <Route path="/blogs/:id">
      <div>
      <h2>blog app</h2>
        {notif !== '' ? <BlogCreatedNotif title={blogs.at(-1).title} author={blogs.at(-1).author}/> : null}
      </div>
      {/* <h2>blog app</h2> */}
      <BlogDetail blogs={blogs}/>
      <BlogComment blogs={blogs}/>

      </Route>

      <Route path="/users/:id">
      <div>
      <h2>blog app</h2>
        {notif !== '' ? <BlogCreatedNotif title={blogs.at(-1).title} author={blogs.at(-1).author}/> : null}
        {/* <LoggedInUser name={user.name}/> */}
      </div>
      <IndividualUser users={users}/>


      </Route>
      <Route path="/users">
      <div>
      <h2>blog app</h2>
        {notif !== '' ? <BlogCreatedNotif title={blogs.at(-1).title} author={blogs.at(-1).author}/> : null}
        {/* <LoggedInUser name={user.name}/> */}
      </div>
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td><strong>blogs created</strong></td>
            </tr>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>
                    {user.blogs.length}
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>

      </Route>
      <Route path="/">
      <div>
        <h2>blog app</h2>
        {notif !== '' ? <BlogCreatedNotif title={blogs.at(-1).title} author={blogs.at(-1).author}/> : null}
        <Togglable buttonLabelShow="create new blog" buttonLabelHide="cancel" ref={blogCreationRef}>
          <CreateBlog
          handleBlogCreation={handleBlogCreation}/>
        </Togglable>
        {/* {blogs.map(blog =>
          <Blog key={blog.id} ={blog} loggedInUserName={user.name}/>
        )} */}
        <Table striped>
          <tbody>
            {blogs.map(blog => {
              return <tr>
                <td><Link to={`/blogs/${blog.id}`} key={blog.id}><Blog blog={blog} loggedInUserName={user.name}/></Link></td>
                <td>{blog.user ? blog.user.name : <div>Tracey</div>}</td>
                </tr>
            })}
          </tbody>
        </Table>
      </div>
    </Route>
  </Switch>
</Router>
</div>
  )
}

export default App