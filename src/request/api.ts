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

export const getArticleByTag = (data: {
  tag: string
}): PromiseRef<ArticleListRes> => axios.post('/article/getArticleByTag', data)

export const getPageInfo = (data: { page: number }): PromiseRef<PageInfo> =>
  axios.post('/article/getPageInfo', data)

export const getRecord = (): PromiseRef<RecordItf> =>
  axios.get('/article/getRecord')

export const addComment = (data: {
  userinfo: string | null
  comments: string
}): PromiseRef => axios.post('/message/addComment', data)

export const getCommentList = (data: {
  count: number
}): PromiseRef<{ total: number; list: CommentsRes[] }> =>
  axios.post('/message/getCommentList', data)

export const addResponse = (data: MessageParams): PromiseRef =>
  axios.post('/message/addResponse', data)
