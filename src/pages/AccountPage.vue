<template>
  <div class="container-fluid bg-primary">
    <section class="row">
      <div class="col-4">
        <h3>Welcome {{ account.name }}</h3>
        <img :src="account.picture" :alt="account.name">
        <p>{{ account.email }}</p>
      </div>
      <div class="col-8">
        <h3>Edit Profile:</h3>
        <form @submit.prevent="editProfile" class="row">
          <div class="col-6">
            <label for="profileName">Name:</label>
            <input v-model="editable.name" class="form-control" type="text" maxlength="100" placeholder="Name?">
          </div>
          <div class="col-6">
            <label for="profilePic">Picture:</label>
            <input v-model="editable.picture" class="form-control" type="url" maxlength="500" placeholder="Picture URL?">
          </div>
          <div class="col-12">
            <label for="profileGithub">Github:</label>
            <input v-model="editable.github" class="form-control" type="url" maxlength="200" placeholder="Github URL?">
          </div>
          <div class="col-12">
            <label for="profileBio">Bio:</label>
            <textarea v-model="editable.bio" rows="10" class="form-control" maxlength="200" placeholder="Bio?"></textarea>
          </div>
          <div class="col-3 mt-1">
            <button class="btn btn-success">Save Changes <i class="mdi mdi-content-save"></i></button>
          </div>
        </form>
      </div>
    </section>
    <div v-for="ad in ads" :key="ad.id">
      <AdCard :ad="ad" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { adsService } from '../services/AdsService.js';
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()

    onMounted(() => {
      getAds()
    })
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }

    watchEffect(() => {
      AppState.account
      editable.value = AppState.account
    })
    return {
      editable,
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),
      async editProfile() {
        try {
          await accountService.editProfile(editable.value)
          Pop.success('Profile Updated!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
