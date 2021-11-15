import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from "./Blog"
let component, blog
beforeEach(() => {
    blog = {
        title: "Blog component renders blog's title and author, but doesn't render its url/number of likes by default",
        author: "Tracey Mai",
        url: "facebook.com",
        likes: 5
    }
    const loggedInUser = "Tracey Mai"
    component = render(
        <Blog blog={blog} loggedInUser={loggedInUser}/>
    )
})

test('Blog component renders blog"s title and author, but doesn"t render its url/number of likes by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.likes)
    expect(component.container).not.toHaveTextContent(blog.url)
})

test('blog"s url and number of likes are shown when button labelled "view" is clicked', () => {
 
    // click the button
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    
    // check the url and likes are present
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
})


