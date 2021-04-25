<template>
  <div class="post col-12">
    <!-- <router-link :to="{name: 'Post', params: { id: posts.id }}"> -->
    <div class="card shadow">
      <div class="card-body">
        <div>
          <h1 class="card-title" v-if="posts.creator">
            <!-- router link -->
            <router-link :to="{ name: 'Account', params:{id: posts.creator.id} }">
              <div @click="setActive(posts.creator.id)">
                <img class="rounded-circle float-left img-small" :src="posts.creator.picture" alt="Creator Photo">
              </div>
            </router-link>
            <div>
              {{ posts.creator.name }}
            </div>
          </h1>
        </div>
        <div>
          <img class="w-100" :src="posts.imgUrl" alt="">
        </div>
        <div>
          <div class="card bg-dark text-white">
            <h5>
              {{ posts.body }}
            </h5>
          </div>
          <div class="d-flex justify-content-around">
            <div>
              <button><i class="fa fa-heart counter" aria-hidden="true">0</i></button>
            </div>
            <div>
              <button @click="deletePost(posts.id)"
                      v-if="state.user.id === state.posts.creatorId"
              >
                <i class="
                      fa
                      fa-trash"
                   aria-hidden="true"
                >
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import { accountService } from '../services/AccountService'

export default {
  name: 'Post',
  props: {
    posts: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      newPost: {},
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deletePost(id) {
        try {
          await postsService.deletePost(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async setActive(id) {
        try {
          await accountService.setActive(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.img-small{
  height: 2em;
  width: 2em;
}
</style>
