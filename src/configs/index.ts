export const ConfigValue = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  AUTH_TOKEN_KEY: 'jits-auth-token'
};
export const Config = {
  defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en',
}