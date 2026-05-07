type EnvConfig = {
  API_BASE_URL: string;
};

/**
 * Centralized env config
 * Prevents hardcoding URLs in components
 */
export const env: EnvConfig = {
  API_BASE_URL: "http://localhost:3000",
};