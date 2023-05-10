export const API_ENDPOINTS = {
  USERS_LOGIN: '/gitlab/oauth/token',
  USERS_ME: '/user/getuserprofile',
  USERS_GETALL: '/user/userlist',
  EMPLOYEE_GETALL: '/employee/employeelist',
  EMPLOYEE_GETBYCODE: '/employee/employeebycode',
  EMPLOYEE_BYUSERNAME: '/employee/employeebyusername',
  BLOCK_EMPLOYEE: '/employee/updatestatus',
  meEndpoint: '/user/getuserprofile',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
