import axios, { AxiosInstance } from 'axios';

class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "/api/",
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.client.interceptors.request.use(async (config) => {
      // Get session token from document.cookie
      const cookies = document.cookie.split(';');
      const sessionToken = cookies
        .find(cookie => cookie.trim().startsWith('next-auth.session-token='))
        ?.split('=')[1];

      if (sessionToken) {
        config.headers['Authorization'] = `Bearer ${sessionToken}`;
      }
      return config;
    });
  }

  async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: object): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: object): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: object): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export default new Api();
