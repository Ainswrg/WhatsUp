import axios from 'axios'

import { constants } from 'shared/const'

const instance = axios.create({
  baseURL: constants.BASE_URL
})

export default instance
