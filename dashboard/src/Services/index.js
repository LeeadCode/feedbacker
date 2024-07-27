import axios from "axios";
import AuthService from "./Auth";
import Users from "./Users";
import Feedbacks from "./Feedbacks";

import router from "@/router";
import { setGlobalLoading } from "@/Store/global";

const API_ENVS = {
  production: 'https://backend-feedbacker-vert.vercel.app/',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local,
});

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false)
    return response
  },
  (error) => {
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      setGlobalLoading(false)
      throw new error(error.message)
    }
 
    if(error.response.status === 401) router.push({name: 'Home'})
    setGlobalLoading(false) 
  
    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  users: Users(httpClient),
  feedbacks: Feedbacks(httpClient)
};
