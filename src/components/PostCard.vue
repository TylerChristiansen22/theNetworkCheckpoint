<template>
    <section class="row justify-content-center">
        <div class="col-6 card elevation-2 my-2">
            <RouterLink :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                <img class="profile-pic mt-1" :src="post.creator.picture" :alt="post.creator.name">
                <p>Posted by: {{ post.creator.name }}</p>
            </RouterLink>
            <p>Post made on: {{ post.createdAt }}</p>
            <p>{{ post.body }}</p>
            <img :src="post.imgUrl" alt="Someone posted a bad img">
            <div class="row text-end">
                <p><i class="mdi mdi-heart-outline"></i> {{ post.likes.length }}</p>
                <span @click="deletePost" v-if="post.creatorId == account.id" class="selectable"><i
                        class="mdi mdi-delete-forever"></i></span>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { RouterLink } from 'vue-router';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deletePost() {
                try {
                    if (await Pop.confirm('Are you sure you would like to delete this post?')) {
                        const postId = props.post.id
                        await postsService.deletePost(postId)
                        Pop.success('Deleted Post!')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
    components: { RouterLink }
};
</script>


<style lang="scss" scoped>
.profile-pic {
    width: 70px;
    height: 70px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}
</style>