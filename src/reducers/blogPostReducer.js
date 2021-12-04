const blogPostReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'BLOG_ADD':
            return [...state, action.data]
        case 'SHOW_BLOG':
            const blogToShow = action.data
            const idx = state.indexOf(blogToShow)
            // const stateNoBlog = state.filter(note => note.id !== blogToShow.id)
            // console.log(stateNoBlog.length)
            // console.log(stateNoBlog.concat({
            //     ...blogToShow, showBlog: !blogToShow.showBlog
            // }))
            // return stateNoBlog.concat({
            //     ...blogToShow, showBlog: !blogToShow.showBlog
            // })
            // return state.slice(0, idx).concat({
            //     ...blogToShow, showBlog: !blogToShow.showBlog
            // }).concat(idx+1, state.length)
            return state.slice(0,idx).concat({
                ...blogToShow, showBlog: !blogToShow.showBlog
            }).concat(state.slice(idx+1, state.length))
        case 'UPDATE_LIKES':
            const blogToUpdate = state.find(note => note.id === action.data.id)
            const stateWOBlog = state.filter(note => note.id !== action.data.id)
            return stateWOBlog.concat({
                ...blogToUpdate, likes: blogToUpdate.likes + 1
            })
        
        case 'REMOVE_BLOG':
            const stateNoBlog = state.filter(note => note.id !== action.data.id)
            return stateNoBlog
        case 'ADD_COMMENT':
            const stateWoBlog =  state.filter(note => note.id !== action.data.id)
            return stateWoBlog.concat(action.data)
        default:
            return state
    }
}

export const initialiseBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const createAddBlogAction = (newBlog) => {
    return {
        type: 'BLOG_ADD',
        data: newBlog
    }
}

export const createBlogShowAction = (blogToShow) => {
    return {
        type: 'SHOW_BLOG',
        data: blogToShow
    }
}

export const createBlogUpdateLikes = (id) => {
    return {
        type: 'UPDATE_LIKES',
        data: { id }
    }
}

export const createBlogDelete = (id) => {
    return {
        type: 'REMOVE_BLOG',
        data: { id }
    }
}

export const createAddCommentToBlog = (updatedBlog) => {
    return {
        type: 'ADD_COMMENT',
        data: updatedBlog
    }
}

export default blogPostReducer