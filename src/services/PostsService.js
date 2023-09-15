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
}

export const postsService = new PostsService