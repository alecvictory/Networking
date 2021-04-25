import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class StuffsService {
  async getStuff() {
    const res = await api.get('api/ads')
    AppState.stuffs = res.data
  }
}

export const stuffsService = new StuffsService()
