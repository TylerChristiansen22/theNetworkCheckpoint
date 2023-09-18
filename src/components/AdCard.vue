<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-12 d-flex justify-content-center">
                <img :src="ad.banner" :alt="ad.title">
            </div>
        </section>
    </div>
</template>


<script>
import { Ad } from '../models/Ad.js';

export default {
    props: { ad: { type: Ad, required: true } },
    setup() {
        return {
        }
    }
};
</script>


<style lang="scss" scoped></style>