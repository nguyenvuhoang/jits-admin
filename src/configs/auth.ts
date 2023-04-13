export const API_ENDPOINTS = {
  USERS_LOGIN: '/user/login',
  USERS_ME: '/user/getuserprofile',
  meEndpoint: '/user/getuserprofile',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
