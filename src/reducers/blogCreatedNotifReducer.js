const blogCreatedNotifReducer = (state="", action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return `a new blog ${action.data.title} by ${action.data.author} added`
        case 'CLEAR':
            return ''    
        default:
            return state
    }
}

export const createBlogCreatedAction = (newBlogObj) => {
    return {
        type: 'NEW_BLOG',
        data: newBlogObj
    }
}

export const createNotifRemovedAction = () => {
    return {
        type: 'CLEAR'
    }
}

export default blogCreatedNotifReducer