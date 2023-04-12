import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 150000000,
    headers: {
        'Content-Type': 'application/json',
    },
});


Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            (error.response && error.response.status === 401) ||
            (error.response && error.response.status === 403)
        ) {
        }
        return Promise.reject(error);
    }
);

export class HttpClient {
    static async get<T>(url: string, params?: unknown) {
        const response = await Axios.get<T>(url, { params });
        return response.data;
    }
    static async post<T>(url: string, data: unknown, options?: any) {
        const response = await Axios.post<T>(url, data, options);
        return response.data;
    }
    static async put<T>(url: string, data: unknown) {
        const response = await Axios.put<T>(url, data);
        return response.data;
    }
    static async delete<T>(url: string) {
        const response = await Axios.delete<T>(url);
        return response.data;
    }
}