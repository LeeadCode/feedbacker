import feedbacksService from "./feedbacks";
import axios from "axios";

const API_ENVS: {
  [key: string]: string
} = {
  production: 'https://backend-feedbacker-vert.vercel.app/',
  development: '',
  local: 'http://localhost:3000',
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      throw new error(error.message)
    }

    return error;
  }
);

export default {
  feedbacks: feedbacksService(httpClient)
};
