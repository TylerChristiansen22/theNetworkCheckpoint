<template>
    <div v-if="profile" class="container-fluid bg-primary">
        <section class="row">
            <div class="cover-img">
                <div class="col-12 d-flex">
                    <img class="profile-pic ms-5 mt-1" :src="profile.picture" :alt="profile.name">
                    <p class="mt-5 ms-2 fs-3">{{ profile.name }}</p>
                </div>
                <div v-if="profile.graduated" class="col-6 ms-5">
                    <span class="bg-dark">This user is an Alumni of Class: {{ profile.class }}</span>
                </div>
                <div class="col-6 ms-5 mt-1">
                    <span class="bg-dark">{{ profile.bio }}</span>
                </div>
                <div class="col-6 ms-5">
                    <a v-if="profile.github" :href="profile.github" target="_blank"><i
                            class="mdi mdi-github bg-dark"></i></a>
                    <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i
                            class="mdi mdi-linkedin bg-dark"></i></a>
                </div>
            </div>
            <div v-for="post in posts" :key="post.id" class="col-12">
                <PostCard :post="post" />
                <div v-for="ad in ads" :key="ad.id">
                    <AdCard :ad="ad" />
                </div>
            </div>
        </section>
        <section v-if="totalPages > 1" class="row justify-content-center">
            <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-2 btn btn-success"><i
                    class="mdi mdi-arrow-left"></i>Newer</button>
            <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages"
                class="offset-md-1 col-2 btn btn-success">Older<i class="mdi mdi-arrow-right"></i></button>
        </section>

    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';

export default {
    setup() {
        onMounted(() => {
            getProfileById();
            getPostsByProfileId();
            getAds()
        })
        const route = useRoute()
        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getPostsByProfileId() {
            try {
                await postsService.getPostsByProfileId(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getAds() {
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            async changePage(number) {
                try {
                    await postsService.changePage(`api/posts?creatorId=${this.profile.id}&page=${number}`)
                } catch (error) {
                    Pop.error(error)
                }
            },
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
            pageNumber: computed(() => AppState.pageNumber),
            totalPages: computed(() => AppState.totalPages),
            ads: computed(() => AppState.ads)
        }
    }
};
</script>


<style lang="scss" scoped>
.profile-pic {
    height: 200px;
    width: 200px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
}

.cover-img {
    background-image: v-bind(coverImg);
    background-size: cover;
    background-position: center;
}
</style>