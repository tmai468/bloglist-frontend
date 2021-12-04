import axios from "axios"
const baseUrl = 'http://localhost:3003/api/blogs'

const getCommentForBlog = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data.comments
}

export default { getCommentForBlog }