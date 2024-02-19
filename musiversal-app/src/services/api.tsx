import axios, { AxiosInstance } from "axios";

class ApiService {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
    });
  }

  getMusicians = (url: string) => {
    return this.api.get(url);
  };

  bookSession = (
    url: string,
    body: { client:string, musicianId: number; schedule: string; serviceId: number }
  ) => {
    return this.api.post(url, body);
  };

  getSessions = (url:string) =>{
    return this.api.get(url);
  }
}

const apiService = new ApiService();
export default apiService;
