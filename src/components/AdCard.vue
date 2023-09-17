<template>
    <section class="row">
        <div class="col-3">
            {{ ads.title }}
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js'
import { Ad } from '../models/Ad.js';

export default {
    props: { ads: { type: Ad, required: true } },
    setup() {
        return {
        }
    }
};
</script>


<style lang="scss" scoped></style>