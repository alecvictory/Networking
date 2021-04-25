<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <span class="navbar-text">
          <button
            class="btn btn-outline-primary text-uppercase"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>

          <div class="dropdown" v-else>
            <div
              class="dropdown-toggle"
              @click="state.dropOpen = !state.dropOpen"
            >
              <img
                :src="user.picture"
                alt="user photo"
                height="40"
                class="rounded"
              />
              <span class="mx-3">{{ user.name }}</span>
            </div>
            <div
              class="dropdown-menu p-0 list-group w-100"
              :class="{ show: state.dropOpen }"
              @click="state.dropOpen = false"
            >
              <router-link :to="{ name: 'Account' }">
                <div class="list-group-item list-group-item-action hoverable">
                  Account
                </div>
              </router-link>
              <div
                class="list-group-item list-group-item-action hoverable"
                @click="logout"
              >
                logout
              </div>
            </div>
          </div>
        </span>
      </div>
      <div class="col-8">
        <header>
          <Navbar />
        </header>
        <main>
          <router-view />
        </main>
        <footer>
          <div class="bg-dark text-light text-center p-4">
            Made with 💖 by CodeWorks
          </div>
        </footer>
      </div>
      <div class="col-2">
        <Stuff v-for="stuffs in state.stuffs" :key="stuffs.id" :stuffs="stuffs" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from './AppState'
import { stuffsService } from '../src/services/StuffsService'
import { AuthService } from './services/AuthService'

export default {
  name: 'App',

  setup() {
    const state = reactive({
      stuffs: computed(() => AppState.stuffs),
      dropOpen: false
    })
    onMounted(async() => {
      try {
        await stuffsService.getStuff()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      appState: computed(() => AppState),
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.view-height{
  min-height: 100vh;
}
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
