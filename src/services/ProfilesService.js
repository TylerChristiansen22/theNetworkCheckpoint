import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"



class ProfilesService {
    async getProfileById(profileId) {
        AppState.activeProfile = null
        const res = await api.get(`api/profiles/${profileId}`)
        AppState.activeProfile = new Profile(res.data)
    }
}

export const profilesService = new ProfilesService