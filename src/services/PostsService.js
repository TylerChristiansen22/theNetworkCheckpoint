import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.totalPages = res.data.totalPages
    }
    async changePage(url) {
        AppState.posts = []
        const res = await api.get(url)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
    }
    async getPostsByProfileId(profileId) {
        AppState.posts = []
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
    }
    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)
    }
    async deletePost(postId) {
        await api.delete(`api/posts/${postId}`)
        let indexToRemove = AppState.posts.findIndex(post => post.id == postId)
        if (indexToRemove >= 0) {
            AppState.posts.splice(indexToRemove, 1)
        }
    }
    async likePost(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log(res.data)
        let indexToEdit = AppState.posts.findIndex(post => post.id == postId)
        if (indexToEdit >= 0) {
            AppState.posts.splice(indexToEdit, 1, new Post(res.data))
        }
    }
}

export const postsService = new PostsService