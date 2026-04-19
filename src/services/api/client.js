import axios from 'axios';

export const http = axios.create({
  timeout: 15000,
});

export async function safeRequest(config, fallback) {
  try {
    const response = await http.request(config);
    return response.data;
  } catch (error) {
    if (fallback) {
      return fallback(error);
    }
    throw error;
  }
}
