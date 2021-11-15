import React, { useState } from "react"
const CreateBlog = ({ handleBlogCreation }) => {
    // const { title, setTitle, author, setAuthor, url, setUrl, handleBlogCreation } = props
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const addBlog = (event) => {
        event.preventDefault()
        handleBlogCreation({ title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div>
        <h2>
            create new
        </h2>
        <form onSubmit={addBlog}>
            <div>
                title
                <input id="title"
                type="text"
                value={title}
                onChange={({target}) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input id="author"
                type="text"
                value={author}
                onChange={({target}) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input id="url"
                type="text"
                value={url}
                onChange={({target}) => setUrl(target.value)}
                />
            </div>
            <button id="createBlogBtn" type="submit">create</button>
        </form>
        </div>
    )
}

export default CreateBlog