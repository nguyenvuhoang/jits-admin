export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  username: string
  password: string
  rememberMe?: boolean
}

export interface Userinfo {
  username: string
  firstname: string
  lastname: string
  gender: number
  address: string
  email: string
  birthday: string
  phone: string
  status: string
  usercreated: string
  datecreated: string
  expiretime: string
  isshow: any
  failnumber: any
  fastmode: any
  scores: number
  avatar: string
  isadmin: boolean
  role: string
}

export interface Employeeinfo {
  employeeid: string
  employeecd: string
  fullname: string
  birthday: string
  address: string
  phone: string
  email: string
  cover: string
  avatar: string
  aboutme: string
  experience: number
  username: string
  marketcd: string
  teamcd: string
  deparmentcd: string
  leader: string
  status: string
  gender: boolean
  marketname: any
  market_descr: string
  department_descr: string
  team_descr: string
  leader_name: string
}


export interface LoginUserInput {
  username: string
  password: string
}
export interface Auth {
  token: string,
  permission: string[];
}
export interface AuthResponse {
  errorcode: string
  messagedetail: string
  result: {
    status: number
    data: Auth
  }
  
}
export interface ResponseObject<T> {
  errorcode: number
  messagedetail: string
  result: {
    status: number
    data: T
  }
}

export interface ResponseArray<T> {
  errorcode: number
  messagedetail: string
  result: {
    status: number
    data: T[]
  }
}

export interface UserProfile {
  username: string
  firstname: string
  lastname: string
  gender: number
  address: string
  email: string
  birthday: string
  phone: string
  status: string
  usercreated: string
  datecreated: string
  usermodified: any
  islogin: boolean
  expiretime: string
  isshow: any
  policyid: any
  failnumber: any
  scores: any
  avatar?: string
}

export interface UserResponsePaginator extends ResponseArray<UserProfile> { }
export interface EmployeeResponsePaginator extends ResponseArray<Employeeinfo> { }

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: Userinfo | null
  setLoading: (value: boolean) => void
  setUser: (value: Userinfo | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void,
  token: string | null
}


