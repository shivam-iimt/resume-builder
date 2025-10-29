import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { getAccessToken, setAccessToken } from '../utils/token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

// Typed shape of refresh endpoint
interface RefreshResponse {
  data?: {
    accessToken?: string;
  };
  accessToken?: string;
}

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError): Promise<AxiosResponse | never> => {
    const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            if (!originalRequest.headers) {
              originalRequest.headers = new AxiosHeaders();
            }
            originalRequest.headers.set('Authorization', `Bearer ${token}`);
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post<RefreshResponse>(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = refreshRes.data?.data?.accessToken || refreshRes.data?.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          pendingRequests.forEach((cb) => cb(newAccessToken));
          pendingRequests = [];
          return api(originalRequest);
        }
      } catch (refreshError) {
        pendingRequests = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

api.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  // ✅ Correct way to safely set headers
  if (!cfg.headers) {
    cfg.headers = new AxiosHeaders();
  }

  if (token) {
    if (cfg.headers instanceof AxiosHeaders) {
      cfg.headers.set('Authorization', `Bearer ${token}`);
    } else {
      (cfg.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  return cfg;
});

export default api;
