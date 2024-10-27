import axios, { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';

class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(async (config) => {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get('next-auth.session-token');
      if (sessionToken) {
        config.headers['Authorization'] = `Bearer ${sessionToken.value}`;
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

export const api = new Api();
