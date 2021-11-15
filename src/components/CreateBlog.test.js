import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import CreateBlog from "./CreateBlog"


test('add new blog form calls props event handler with right details when create button is clicked', () => {
    // mocking the input
    const handleBlogCreation = jest.fn()
    const component = render(
        <CreateBlog handleBlogCreation={handleBlogCreation}/>
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const inputForm = component.container.querySelector('form')

    fireEvent.change(titleInput, {
        target: {
            value: "add new blog form calls props event handler with right details when create button is clicked"
        }
    })

    fireEvent.change(authorInput, {
        target: {
            value: "Tracey Mai"
        }
    })

    fireEvent.change(urlInput, {
        target: {
            value: "facebook.com"
        }
    })

    fireEvent.submit(inputForm)

    // check event handler is called once
    expect(handleBlogCreation.mock.calls).toHaveLength(1)
    
    // check event handler is called with correct parameter
    expect(handleBlogCreation.mock.calls[0][0].title).toBe("add new blog form calls props event handler with right details when create button is clicked")
    expect(handleBlogCreation.mock.calls[0][0].author).toBe("Tracey Mai")
    expect(handleBlogCreation.mock.calls[0][0].url).toBe("facebook.com")
})