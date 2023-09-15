


export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.imgUrl = data.imgUrl
        this.newer = data.newer
        this.older = data.older
        this.page = data.page
        this.totalPages = data.totalPages
        this.likes = data.likes
    }
}