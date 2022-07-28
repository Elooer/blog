import axios from './request'

export const registerApi = (data: registerFormItf): PromiseRef =>
  axios.post('/user/register', data)

export const loginApi = (data: loginFormItf): PromiseRef<loginRes> =>
  axios.post('/user/login', data)
