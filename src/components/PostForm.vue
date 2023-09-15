<template>
    <form class="row" @submit.prevent="createPost">
        <div class="col-6">
            <label for="postBody">Body:</label>
            <textarea v-model="postData.body" id="postBody" class="form-control" placeholder="Post body?"
                required></textarea>
        </div>
        <div class="col-6">
            <label for="postUrl">Img Url:</label>
            <input v-model="postData.imgUrl" type="url" id="postUrl" class="form-control" placeholder="Img Url?" required>
        </div>
        <div class="col-3">
            <button class="btn btn-primary" title="submit post to database">Submit</button>
        </div>
    </form>
</template>


<script>
import { useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
export default {
    setup() {
        const postData = ref({})
        const router = useRouter()
        return {
            postData,
            async createPost() {
                try {
                    await postsService.createPost(postData.value)
                    postData.value = {}
                    Pop.toast('Post Created!', 'success')
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>