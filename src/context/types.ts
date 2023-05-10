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
  project: []
}


export interface LoginUserInput {
  username: string
  password: string
}

export interface FilterEmployee {
  teamcd: string | null | undefined
  status: string | null | undefined
  role: string | null | undefined
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
  employee: Employeeinfo | null
  setLoading: (value: boolean) => void
  setUser: (value: Userinfo | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void,
  token: string | null
}


export interface EmployeeCodeInput {
  employeecd: string | string[] | undefined
}

export interface Skill {
  skillsid: string
  skillsname: string
  description: string
}

export interface PersonalPortfolio {
  image: string
  category: string
  title: string
  description: string
}
export interface Project {
  ID: string
  EMPLOYECD: string
  PROJECTCD: string
  DESCRIPTION: string
}

export interface Client {
  ID: string
  EMPLOYECD: string
  CLIENTID: string
  DESCRIPTION: string
}
export interface EmployeeDetail {
  fullname: string
  position: string
  category: string
  title: string
  buttonText: string
  buttonLink: string
  image: string
  cover: string
  description: string
  skills: Skill[]
  personalPortfolio: PersonalPortfolio[]
  project: Project[]
  client: Client[]
  status: string
  role: string
  phone?: string
  address?: string
  email: string
  totaltask: number
  teamcd: string
  team_description: string
}

export interface EmployeeDetailResponsePaginator extends ResponseObject<EmployeeDetail> { }

export interface BlockEmployeeInput {
  employeecd: string
  status: string
}
export interface BlockEmployeeResponse extends ResponseObject<Employeeinfo> { }

export interface ProjectGitLab {
  id: number
  web_url: string
  name: string
  description?: string
  avatar_url?: string
  group_id: number
  group_name: string
  group_avatar_url?: string
  total_issue_open: number
  owner: string
  create_at: string
}

export interface ProjectReponse extends ResponseArray<ProjectGitLab> { }

export interface FilterProject {
  page: number
  per_page: number
  order_by?: string
}