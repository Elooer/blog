import axios from './request'

export const registerApi = (data: RegisterFormItf): PromiseRef =>
  axios.post('/user/register', data)

export const loginApi = (data: LoginFormItf): PromiseRef<LoginRes> =>
  axios.post('/user/login', data)

export const getArticleList = (data: {
  page: number
}): PromiseRef<ArticleListRes> => axios.post('/article/getArticleList', data)

export const getArticleById = (data: { _id: string }): PromiseRef<ArticleItf> =>
  axios.post('/article/getArticleById', data)
