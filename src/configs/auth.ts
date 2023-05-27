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
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  GITLAB_ALLPROJECT : '/gitlab/getallproject',
  POST_EMPLOYEE: '/employee/postemployee',
  APPROVE_EMPLOYEE: '/employee/updatestatus',
  CANDIDATE: '/data/getlistcandidate',
  CANDIDATE_GETBYCODE: '/data/getresultcandidate',
  CANDIDATPOST: '/data/createcandidate',
  CANDIDATEACCESS: '/data/candidatelogin',
  CANDIDATEQUESTION: '/data/getsetofquestion',
  CANDIDATESUBMIT: '/data/submittestanswer'
}
