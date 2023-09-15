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
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { RouterLink } from 'vue-router';
export default {
    props: { post: { type: Post, required: true } },
    setup() {
        return {};
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