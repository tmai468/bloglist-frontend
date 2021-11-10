import React from "react"
const CreateBlog = (props) => {
    const { title, setTitle, author, setAuthor, url, setUrl, handleBlogCreation } = props
    return (
        <div>
        <h2>
            create new
        </h2>
        <form onSubmit={handleBlogCreation}>
            <div>
                title
                <input
                type="text"
                value={title}
                onChange={({target}) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                type="text"
                value={author}
                onChange={({target}) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                type="text"
                value={url}
                onChange={({target}) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default CreateBlog