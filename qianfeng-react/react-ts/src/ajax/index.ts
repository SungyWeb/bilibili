import axios, { AxiosResponse } from 'axios'

const isDev = process.env.NODE_ENV === 'development'
type ResponseType = {
  data: any,
  code: number,
  errMsg: string
}

const service = axios.create({
  baseURL: isDev ? 'http://rap2api/taobao.org/app/mock/176929' : '',
})

service.interceptors.request.use(config => {
  config.data = Object.assign({}, config.data, {
    // authToken: window.localStorage.getItem('token')
    authToken: 'asdfasjfalsdjfal'
  })
  return config
})

service.interceptors.response.use((response: AxiosResponse) => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export const getArticles = () => {
  return service.post('/api/v1/articleList')
}