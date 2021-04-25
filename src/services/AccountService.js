import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount() {
    try {
      const res = await api.put('/account')
      AppState.account = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getAccountById(id) {
    try {
      const res = await api.get(`api/profiles/${id}`)
      AppState.activeProfile = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async setActive(id) {
    try {
      const res = await api.get(`api/profiles/${id}`)
      AppState.activeProfile = res.data
    } catch (error) {
      Notification.toast('error:' + error, 'error')
    }
  }
}

export const accountService = new AccountService()
