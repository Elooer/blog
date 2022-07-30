interface AxiosRes<T> {
  status: number
  message: string
  data?: T
}

type PromiseRef<T = {}> = Promise<AxiosRes<T>>

interface LoginFormItf {
  username: string
  password: string
}

interface RegisterFormItf {
  username: string
  password: string
  rePassword: string
}

interface LoginRes {
  token: string
}

interface ArticleItf {
  _id: string
  title: string
  describe: string
  content: string
  pubTime: string
  tag: string
  img: string
  state: boolean
}

type ArticleListRes = ArticleItf[]
