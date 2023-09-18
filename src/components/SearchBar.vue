<template>
    <div class="container-fluid">
        <form @submit.prevent="searchPosts" class="row">
            <div class="col-12 input-group">
                <input v-model="searchTerm" type="text" class="form-control" placeholder="Search Posts">
                <button class="btn btn-success"><i class="mdi mdi-magnify"></i></button>
            </div>
        </form>
        <div v-if="searchTerm" class="mt-2">
            Searching results for: <span class="border border-dark rounded-pill p-2">{{ searchTerm }}</span> <button
                @click="clearSearch" class="btn"><i class="mdi mdi-close"></i></button>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
export default {
    setup() {
        const searchTerm = ref('')
        return {
            searchTerm,
            activeSearch: computed(() => AppState.searchTerm),
            async searchPosts(event) {
                try {
                    logger.log('Searching', searchTerm.value)
                    await postsService.searchPosts(searchTerm.value)
                } catch (error) {
                    Pop.error(error)
                }
            },
            async clearSearch() {

                try {
                    if (await Pop.confirm('Clear search results?')) {
                        await postsService.clearSearch()
                        searchTerm.value = ''
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>