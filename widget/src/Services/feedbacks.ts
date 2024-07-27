import { AxiosInstance } from "axios";
import { Feedback } from '../types/feedback'
import { RequestError } from '../types/error'

type Create = {
  data: Feedback
  error: RequestError | null
}

type CreatePayload = {
  type: string;
  text: string;
  fingerprint: string;
  device: string;
  page: string;
  apiKey: string;
}

export interface IFeedbackService{
  create(payload: CreatePayload): Promise<Create>
}

function feedbacksService(httpClient: AxiosInstance): IFeedbackService {
  async function create(payload: CreatePayload): Promise<Create> {
    const response = await httpClient.post<Feedback>('/feedbacks', payload)
    let error: RequestError | null = null

    if(!response.data) {
      error = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      error
    }
  }

  return {
    create
  }
}

export default feedbacksService