import { createStore, combineReducers } from "redux"
import blogCreatedNotifReducer, { createBlogCreatedAction } from "./reducers/blogCreatedNotifReducer"
import blogPostReducer, { initialiseBlogs } from "./reducers/blogPostReducer"
import loggedInUserReducer from "./reducers/loggedInUserReducer"

// const store = createStore(blogCreatedNotifReducer)
const reducer = combineReducers({
    notif: blogCreatedNotifReducer,
    blogs: blogPostReducer,
    loggedInUser: loggedInUserReducer
})

const store = createStore(reducer)

console.log(store.getState())

export default store