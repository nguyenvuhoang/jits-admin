export const API_ENDPOINTS = {
  USERS_LOGIN: '/user/login',
  USERS_ME: '/user/getuserprofile',
  USERS_GETALL: '/user/userlist',
  EMPLOYEE_GETALL: '/employee/employeelist',
  meEndpoint: '/user/getuserprofile',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
