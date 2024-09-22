import axios from 'axios';

const baseURL = Bun.env.BASE_URL || "http://localhost:3000"

export const api = axios.create({
  baseURL,
  withCredentials: true
})
