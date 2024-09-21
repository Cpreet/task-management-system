import axios from 'axios';

// const baseURL = "http://localhost:3000"
const baseURL = "http://192.168.29.69:3000"

export const api = axios.create({
  baseURL,
  withCredentials: true
})
