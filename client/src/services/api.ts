import axios from "axios";
import { env } from "../config/env";

/**
 * Central API client
 * All requests go through here
 */
export const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});