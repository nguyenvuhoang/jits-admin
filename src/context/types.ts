export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  username: string
  password: string
  rememberMe?: boolean
}
export type CandidateAccessParams = {
  email: string | string[] | undefined
  code: string
}

export interface Userinfo {
  username: string
  firstname: string
  lastname: string
  gender: number
  address: string
  email: string | string[] | undefined
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
  iscandidate?: boolean
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
  role?: string | null | undefined
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
  candidateaccess: (params: CandidateAccessParams, errorCallback?: ErrCallbackType) => void
  token: string | null,
  isCandidate: boolean
}


export interface EmployeeCodeInput {
  employeecd: string | string[] | undefined
}

export interface CandidateCodeInput {
  candidateid: string | string[] | undefined
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
  aboutme?: string
  avatar?: string
  employeecd?: string
  birthday?: string
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

export interface EmployeeData {
  employeecd: string
  fullname: string
  birthday: string | Date
  address: string
  phone: string
  email: string
  aboutme: string
  marketcd: string
  teamcd: string
  deparmentcd: string
  gender: string
}

export interface EmployeeResponse extends ResponseObject<{}> { }

export interface UpdateStatusEmployeeInput {
  employeecd: string
  status: string
}

export interface Candidate {
  candidateid: string
  fullname: string
  phone: string
  email: string
  result: string
  datejob: string
}

export interface CandidatePaginator extends ResponseArray<Candidate> { }

export interface Group {
  en: string
  vn: string
  jp: string
}

export interface Label {
  en: string
  vn: string
  jp: string
}

export interface Key {
  en: string
  vn: string
  jp: string
}
export interface Answer {
  value: string
  key: Key
}
export interface Content {
  name: string
  label: Label
  control: string
  type: string
  styles: string
  rows: number
  required: string
  answer: Answer[]
  aswvalue: string
  choose: string
  score: number
}
export interface Java {
  group: Group
  content: Content[]
}
export interface DotNet {
  group: Group
  content: Content[]
}
export interface Javascript {
  group: Group
  content: Content[]
}
export interface Sql {
  group: Group
  content: Content[]
}
export interface English {
  group: Group
  content: Content[]
}
export interface ResultCareerdata {
  Java: Java[]
  dotNet: DotNet[]
  Javascript: Javascript[]
  SQL: Sql[]
  English: English[]
}

export interface ResultTest {
  score: number
  totalscore: number
  result: string
}
export interface CandidateDetail {
  candidate: Candidate
  result_test: ResultTest
  result_careerdata: ResultCareerdata
}

export interface CandidateDetailResponsePaginator extends ResponseObject<CandidateDetail> { }
export interface CreateCandidateResponse extends ResponseObject<{}> { }

export interface CandidateQuestion extends ResponseObject<ResultCareerdata> { }
export interface Blog {
  blogid: string
  blogcd: string
  title: string
  category: string
  description: string
  image: string
  pubdt: string
  introduce?: string
}
export interface BlogDataResponsePaginator extends ResponseArray<Blog> { }

export interface TeamCodeInput {
  teamcd: string
}

export interface EmployeeTeamCode {
  leader: EmployeeDetail
  memember: EmployeeDetail[]
}

export interface DateOff {
  fromdt: string
  session: string[]
  todt: string
}
export interface ApplicationForLeave {
  id: string
  employeecd: string
  fullname: string
  email: string
  departmentcd: string
  position: string
  leader: string
  manager: string
  reason: string
  totaldayoff: number
  dayoff: DateOff[]
  replacepersion: string
  formality: string
  status: string
  createdate: string
  approveddate?: string
}

export interface EmployeeTeamCodeResponse extends ResponseObject<EmployeeTeamCode> { }
export interface ApplicationForLeaveResponse extends ResponseObject<{}> { }
export interface ListOfApplicationForLeaveResponse extends ResponseArray<ApplicationForLeave> { }
export interface ApplicationForLeaveByIdResponse extends ResponseObject<ApplicationForLeave> { }
export interface ApproveApplicationForLeaveResponse extends ResponseObject<{}> { }
