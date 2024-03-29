import { HorizontalNavItemsType } from "@/@core/layouts/types"
import { EventType } from "@/types/apps/calendarTypes"
import { OnsiteInputs } from "@/types/form/onsiteType"

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
  permission?: string[]
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
  image: string
  category: string
  role: string
  team_description: string
  totaltask: string
  description: string
  daysofleaveavailable: number
  totaldays: number
  daysleaveused: number
  currentdays: number
  lastyear?: number
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
  isCandidate: boolean,
  updateTimestamp: (value: number) => void
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
  isleave?: boolean
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
  isTryJob: boolean,
  bio: string
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
  btnApprove?: boolean
  btnConfirm?: boolean
  btnReject?: boolean
  applicationforleave: number
}

export interface SubMenu {
  title: string
  path: string
  icon: string
}

export interface Menu {
  title: string
  path: string
  icon: string
  children: SubMenu[]
}

export interface DeviceInfo {
  deviceid: string
  buydate: string
  price: any
  name: string
  chip: string
  ram: string
  disk: string
  owner: string
  receiveddate: string
  whoreceived: string
  returneddate: string
  returnedreason: string
  historyfix: string
  historyupgrade: string
  checkedlastdate: string
  checkedreason: string
  checkedresult: string
  noted: string
  departmentcd: string
  type: string
  size: any
  resolution: string
  officecd: string
  unused2: string
  unused3: string
  unused4: string
  unused5: string
}


export interface DeviceInputData {
  deviceid: string
  buydate: Date | undefined
  price: any
  name: string
  chip: string
  ram: string
  disk: string
  owner: string
  type: string
  size: string
  resolution: string
  officecd: string
}



export interface EmployeeTeamCodeResponse extends ResponseObject<EmployeeTeamCode> { }
export interface ApplicationForLeaveResponse extends ResponseObject<{}> { }
export interface ListOfApplicationForLeaveResponse extends ResponseArray<ApplicationForLeave> { }
export interface ApplicationForLeaveByIdResponse extends ResponseObject<ApplicationForLeave> { }
export interface ApproveApplicationForLeaveResponse extends ResponseObject<{}> { }
export interface RejectApplicationForLeaveResponse extends ResponseObject<{}> { }
export interface CancelApplicationForLeaveResponse extends ResponseObject<{}> { }
export interface ConfirmApplicationForLeaveResponse extends ResponseObject<{}> { }

export interface GetListApplicationForLeaveResponse extends ResponseArray<EventType> { }

export interface UpdateEmployeeResponse extends ResponseObject<{}> { }

export interface MenuResponse extends ResponseObject<HorizontalNavItemsType> { }

export interface SystemInput {
  language: string | undefined
}

export interface UpadateInfoField {
  address: string | undefined
  phone: string | undefined
  aboutme: string | undefined
}

export interface GetListDeviceResponse extends ResponseArray<DeviceInfo> { }
export interface GetDeviceResponse extends ResponseObject<DeviceInfo> { }


export interface SubmitOnsiteResponse extends ResponseObject<{}> { }

export interface Notification {
  id: number
  refid: string
  type: string
  slug: string
  sender: string
  receiver: string
  title: string
  content: string
  datetime: string
  isread: boolean
  language: string
  image: any
}export interface NotificationsType {
  totalnew: number
  list_noti: Notification[]
}

export interface NotificationResponse extends ResponseObject<NotificationsType> { }

export interface GetOnsiteResponse extends ResponseArray<OnsiteInputs> { }


export interface FilterDataOnsite {
  fullname?: string
  status?: string
  month?: string
  employeecd?: string
}

export interface AddDeviceResponse extends ResponseObject<{}> { }
export interface ModifyDeviceResponse extends ResponseObject<{}> { }

export interface FilterDevice {
  departmentcd?: string
  officecd?: string
  type?: string
}


export interface Timelog {
  summary: string
  timeSpent: number
  spentAt: string
  user: User
}

export interface User {
  avatarUrl: string
  username: string
  name: string
}

export interface Assignees {
  avatarUrl: string
  username: string
  name: string
}

export interface Author {
  avatarUrl: string
  username: string
  name: string
}

export interface Milestone {
  title: string
  description: string
}

export interface Opened {
  id: string
  title: string
  description: string
  totalTimeSpent: number
  state: string
  webUrl: string
  type: string
  timelogs: Timelog[]
  assignees: Assignees
  author: Author
  milestone?: Milestone
  create_at: string
  close_at: string
}

export interface Closed {
  id: string
  title: string
  description: string
  totalTimeSpent: number
  state: string
  webUrl: string
  type: string
  timelogs: Timelog[]
  assignees: Assignees
  author: Author
  milestone?: Milestone
  create_at: string
  close_at: any
}

export interface InProgress {
  id: string
  title: string
  description: string
  totalTimeSpent: number
  state: string
  webUrl: string
  type: string
  timelogs: Timelog[]
  assignees: Assignees
  author: Author
  milestone?: Milestone
  create_at: string
  close_at: any
}
export interface Closed {
  id: string
  title: string
  description: string
  totalTimeSpent: number
  state: string
  webUrl: string
  type: string
  timelogs: Timelog[]
  assignees: Assignees
  author: Author
  milestone?: Milestone
  create_at: string
  close_at: any
}

export interface NoAction {
  id: string
  title: string
  description: string
  totalTimeSpent: number
  state: string
  webUrl: string
  type: string
  timelogs: Timelog[]
  assignees: Assignees
  author: Author
  milestone?: Milestone
  create_at: string
  close_at: any
}
export interface Issue {
  opened: Opened[]
  closed: Closed[]
  inprogress: InProgress[]
  noaction: NoAction[]
}

export interface ProjectDetail {
  id: string
  web_url: string
  name: string
  description: string
  descriptionHtml: string
  avatar_url: string
  group_id: string
  group_name: string
  group_avatar_url: string
  total_issue_open: number
  total_issue_close: number
  total_issue_noaction: number
  total_issue_inprogress: number
  total_issue: number
  create_at: string
  issue: Issue
}

export interface ProjectDetailResponse extends ResponseObject<ProjectDetail> { }


export interface ProjectDetailFilter {
  fullpath: string | undefined
}

export interface OnJobInput {
  candidateid: string
  isTryJob: boolean
}

export interface CandidateOnJobResponse extends ResponseObject<{}> { }

export interface Meeting {
  meetingid: string
  meetingcode: string
  title: string
  category: string
  description: string
  team: string
  pubdt: string
}
export interface MeetingInfo {
  title: string
  category: string
  description: string
  team: string
}

