interface AxiosRes<T> {
  status: number
  message: string
  data?: T
}

type PromiseRef<T = {}> = Promise<AxiosRes<T>>

interface loginFormItf {
  username: string
  password: string
}

interface registerFormItf {
  username: string
  password: string
  rePassword: string
}

interface loginRes {
  token: string
}
