import { reactive } from 'vue'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Post.js').Post} */
  posts: [],

  /** @type {Number} */
  pageNumber: 1,

  /** @type {Number} */
  totalPages: 1,

  /** @type {import('./models/Profile.js').Profile} */
  activeProfile: null


})
