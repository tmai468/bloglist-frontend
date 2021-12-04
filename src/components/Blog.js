import React, { useState } from 'react'
import Togglable from './Togglable'
import AllBlogDetails from './AllBlogDetails'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { createAddBlogAction, createBlogShowAction, createBlogUpdateLikes } from '../reducers/blogPostReducer'

const Blog = ({blog, loggedInUserName}) => {
  const dispatch = useDispatch()
  // const [currentBlog, setCurrentBlog] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // const [showBlogDetail, setShowBlogDetail] = useState(false)
  const toggleShowBlogDetail = (blogToShow) => {
    dispatch(createBlogShowAction(blogToShow))
  }
  const updateLikeForABlog = async () => {
    const newBlog = await blogService.updateLikes(blog)
    dispatch(createBlogUpdateLikes(newBlog.id))
}
  if (blog !== null) {
  return (<div style={blogStyle} className="blogDiv">    
    {blog.title} {blog.author}
    {/* <button className="showHideBtn" onClick={() => toggleShowBlogDetail(blog)}>{blog.showBlog ? "hide" : "view"}</button>
    {blog.showBlog ? <AllBlogDetails currentBlog={blog} userName={loggedInUserName} updateLikeForABlog={updateLikeForABlog}/> : null} */}
  </div> )
  }
  return null
}

export default Blog