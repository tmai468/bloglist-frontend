import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AllBlogDetails from './AllBlogDetails'
let component, blog, loggedInUser, setCurrentBlog, updateLikeForABlog
beforeEach(() => {
    blog = {
        title: "Blog component renders blog's title and author, but doesn't render its url/number of likes by default",
        author: "Tracey Mai",
        url: "facebook.com",
        likes: 5
    }
    loggedInUser = "Tracey Mai"
    setCurrentBlog = jest.fn()
    updateLikeForABlog = jest.fn()
    component = render(
        <AllBlogDetails currentBlog={blog} userName={loggedInUser} 
        setCurrentBlog={setCurrentBlog} updateLikeForABlog={updateLikeForABlog}/>
    )
})

test('if like is clicked twice, event handler props will be called twice', () => {
    const likeBtn = component.container.querySelector('.likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(updateLikeForABlog.mock.calls).toHaveLength(2)
})