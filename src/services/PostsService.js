import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    console.log(res.data)
    AppState.posts = res.data.posts
  }

  async addPost(data) {
    const res = await api.post('api/posts', data)
    router.push({ name: 'AccountPage', params: { id: res.data.id } })
  }

  async deletePost(id) {
    await api.delete(`api/posts/${id}`)
    this.getAll()
    // this.getPostById()
  }
}

export const postsService = new PostsService()
