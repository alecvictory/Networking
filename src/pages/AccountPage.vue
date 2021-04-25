<template>
  <div v-if="state.loading = true">
  </div>
  <div v-else class="container-fluid flex-column">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body flex-column justify-content-center">
            <p class="card-text">
              {{ state.activeProfile.name }}
            </p>
            <img class="rounded-circle" :src="state.activeProfile.picture" alt="" />
            <p>{{ state.activeProfile.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <form @submit.prevent="addPost">
            <div class="form-group">
              <img class="rounded-circle" :src="state.user.picture" alt="" />
            </div>
            <div class="form-group">
              <label for="">Share Whats Happening</label>
              <textarea type="text"
                        class="form-control"
                        name="post"
                        id="post"
                        placeholder="whassshappenin?"
                        rows="5"
                        v-model="state.newPost.body"
              ></textarea>
            </div>
            <!-- v-if="state.account.id === state.post.creatorId" -->
            <button type="submit" class="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- v-if="state.posts.id === state.posts.user.id" -->
      <!-- <Post v-for="posts in state.posts" :key="posts.id" :posts="posts" /> -->
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'
// go back to here
export default {
  name: 'Account',

  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newPost: {},
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile)
    })
    onMounted(async() => {
      try {
        await accountService.setActive(route.params.id)
        await postsService.getAll()
        state.loading = false
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      state,
      route,
      async addPost() {
        try {
          await postsService.addPost(state.newPost)
          state.newPost = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
      // account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
