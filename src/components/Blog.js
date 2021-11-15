import React, { useState } from 'react'
import Togglable from './Togglable'
import AllBlogDetails from './AllBlogDetails'
import blogService from '../services/blogs'

const Blog = ({blog, loggedInUserName}) => {
  const [currentBlog, setCurrentBlog] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showBlogDetail, setShowBlogDetail] = useState(false)
  const toggleShowBlogDetail = () => {
    setShowBlogDetail(!showBlogDetail)
  }
  const updateLikeForABlog = async () => {
    const newBlog = await blogService.updateLikes(currentBlog)
    setCurrentBlog(newBlog)
}
  if (currentBlog !== null) {
  return (<div style={blogStyle} className="blogDiv">    
    {currentBlog.title} {currentBlog.author}<button className="showHideBtn" onClick={toggleShowBlogDetail}>{showBlogDetail ? "hide" : "view"}</button>
    {showBlogDetail ? <AllBlogDetails currentBlog={currentBlog} setCurrentBlog={setCurrentBlog} userName={loggedInUserName} updateLikeForABlog={updateLikeForABlog}/> : null}
  </div> )
  }
  return null
}

export default Blog