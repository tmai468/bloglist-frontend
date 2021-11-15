import React, { useState, useEffect } from "react"
import blogService from '../services/blogs'
const AllBlogDetails = ({currentBlog, setCurrentBlog, userName, updateLikeForABlog}) => {
    const [blogAddedByUser, setBlogAddedByUser] = useState(false)
    useEffect(() => {
        try {
            const isAddedByUser = currentBlog.user.name === userName
            setBlogAddedByUser(isAddedByUser)
        } catch (exception) {}
    }, [])
    
    // const updateLikeForABlog = async () => {
    //     const newBlog = await blogService.updateLikes(currentBlog)
    //     setCurrentBlog(newBlog)
    // }
    const deleteABlog = async () => {
        if (window.confirm(`Remove blog ${currentBlog.title} by ${currentBlog.author}`)) {
            await blogService.deleteBlog(currentBlog)
            setCurrentBlog(null)
        }
    }
    if (currentBlog !== null) {
        return (
            <div className="allBlogDetailDiv">
                <div>{currentBlog.url}</div>
                <div>likes {currentBlog.likes}<button className="likeBtn" onClick={updateLikeForABlog}>like</button></div>
                <div>{userName}</div>
                {blogAddedByUser ? <button className="blogDeleteBtn" onClick={deleteABlog}>remove</button> : null}
            </div>
        )
    }
}

export default AllBlogDetails
