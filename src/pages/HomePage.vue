<template>
  <div class="container-fluid bg-primary">
    <div v-if="user.isAuthenticated">
      <div class="fs-2">Create a Post!</div>
      <PostForm />
    </div>
    <div v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
      <div v-for="ad in ads" :key="ad.id">
        <AdCard :ad="ad" />
      </div>
    </div>
    <section class="row justify-content-center">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-2 btn btn-success"><i
          class="mdi mdi-arrow-left"></i>Newer</button>
      <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages"
        class="offset-md-1 col-2 btn btn-success">Older<i class="mdi mdi-arrow-right"></i></button>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState.js';
import { adsService } from '../services/AdsService.js';

export default {
  setup() {
    onMounted(() => {
      getPosts();
      getAds()
    })
    async function getPosts() {
      try {
        await postsService.getPosts()
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
          await postsService.changePage(`api/posts?page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      },
      posts: computed(() => AppState.posts),
      pageNumber: computed(() => AppState.pageNumber),
      totalPages: computed(() => AppState.totalPages),
      user: computed(() => AppState.user),
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style scoped lang="scss"></style>
