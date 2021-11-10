import React from "react"
const BlogCreatedNotif = (props) => {
    const { title, author } = props
    return (
        <div className = "blogCreated">
            a new blog {title} by {author} added
        </div>
    )
}

export default BlogCreatedNotif