import axios from 'axios'
const backendApi = new URL(
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_MYAPP_BACKEND
    : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
)
export const axiosClient = axios.create({ baseURL: backendApi.origin })
