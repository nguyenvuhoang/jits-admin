import { API_ENDPOINTS } from "@/configs/auth";
import { ApplicationForLeaveByIdResponse, ApplicationForLeaveResponse, ApproveApplicationForLeaveResponse, AuthResponse, BlockEmployeeInput, BlockEmployeeResponse, BlogDataResponsePaginator, CandidateAccessParams, CandidateCodeInput, CandidateDetailResponsePaginator, CandidatePaginator, CandidateQuestion, ConfirmApplicationForLeaveResponse, CreateCandidateResponse, EmployeeCodeInput, EmployeeData, EmployeeDetailResponsePaginator, EmployeeResponse, EmployeeResponsePaginator, EmployeeTeamCodeResponse, FilterEmployee, FilterProject, GetListApplicationForLeaveResponse, GetListDeviceResponse, ListOfApplicationForLeaveResponse, LoginUserInput, MenuResponse, NotificationResponse, ProjectReponse, RejectApplicationForLeaveResponse, SystemInput, TeamCodeInput, UpadateInfoField, UpdateEmployeeResponse, UpdateStatusEmployeeInput, UserResponsePaginator, SubmitOnsiteResponse, GetOnsiteResponse, FilterDataOnsite, GetDeviceResponse, AddDeviceResponse, FilterDevice, ProjectDetailResponse, ProjectDetailFilter, OnJobInput, CandidateOnJobResponse, ModifyDeviceResponse, CancelApplicationForLeaveResponse } from "@/context/types";
import { CandidateInput } from "@/types/dashboards/candidateTyps";
import { ListOfApplicationSearchInputs, SubmitApplicationLeaveInputs } from "@/types/form/applicationForLetterType";
import { HttpClient } from "./http-client";
import { OnsiteInputs } from "@/types/form/onsiteType";
import { DeviceInputData } from '../../context/types';
class Client {
    system = {
        getmenu: ({ language }: SystemInput) => HttpClient.get<MenuResponse>(API_ENDPOINTS.GET_MENU, { language })
    }
    users = {
        login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
        me: () => HttpClient.get(API_ENDPOINTS.USERS_ME),
        getall: () => HttpClient.get<UserResponsePaginator>(API_ENDPOINTS.USERS_GETALL)
    }
    employee = {
        getall: (filter: FilterEmployee) => HttpClient.get<EmployeeResponsePaginator>(API_ENDPOINTS.EMPLOYEE_GETALL, filter),
        getbycode: ({ employeecd }: EmployeeCodeInput) => HttpClient.get<EmployeeDetailResponsePaginator>(API_ENDPOINTS.EMPLOYEE_GETBYCODE, { employeecd }),
        block: (input: BlockEmployeeInput) => HttpClient.post<BlockEmployeeResponse>(API_ENDPOINTS.BLOCK_EMPLOYEE, input),
        postemployee: (employee: EmployeeData) => HttpClient.post<EmployeeResponse>(API_ENDPOINTS.POST_EMPLOYEE, employee),
        approve: (employeeinput: UpdateStatusEmployeeInput) => HttpClient.post<EmployeeResponse>(API_ENDPOINTS.APPROVE_EMPLOYEE, employeeinput),
        getteamcode: ({ teamcd }: TeamCodeInput) => HttpClient.get<EmployeeTeamCodeResponse>(API_ENDPOINTS.EMPLOYEE_GETBYTEAMCODE, { teamcd }),
        submitapplicationforleave: (leaveinput: SubmitApplicationLeaveInputs) => HttpClient.post<ApplicationForLeaveResponse>(API_ENDPOINTS.EMPLOYEE_SUBMITAPPFORLEAVE, leaveinput),
        getapplicationforleave: (searchInput?: ListOfApplicationSearchInputs) => HttpClient.get<ListOfApplicationForLeaveResponse>(API_ENDPOINTS.EMPLOYEE_APPROVE_APPLICATION_FOR_LEAVE, searchInput),
        getapplicationforleavebyid: ({ id }: { id: string }) => HttpClient.get<ApplicationForLeaveByIdResponse>(API_ENDPOINTS.EMPLOYEE_APPLICATION_FOR_LEAVE_BYID, { id }),
        approveapplicationforleave: ({ id }: { id: string }) => HttpClient.put<ApproveApplicationForLeaveResponse>(API_ENDPOINTS.EMPLOYEE_APPROVE_FOR_LEAVE, { id }),
        rejectapplicationforleave: ({ id }: { id: string }) => HttpClient.put<RejectApplicationForLeaveResponse>(API_ENDPOINTS.EMPLOYEE_REJECT_FOR_LEAVE, { id }),
        cancelapplicationforleave: ({ id }: { id: string }) => HttpClient.put<CancelApplicationForLeaveResponse>(API_ENDPOINTS.EMPLOYEE_CANCEL_FOR_LEAVE, { id }),
        confirmapplicationforleave: ({ id }: { id: string }) => HttpClient.put<ConfirmApplicationForLeaveResponse>(API_ENDPOINTS.EMPLOYEE_CONFIRM_FOR_LEAVE, { id }),
        getlistfl: () => HttpClient.get<GetListApplicationForLeaveResponse>(API_ENDPOINTS.GET_EMPLOYEE_LISTFL),
        updateinfo: (info: UpadateInfoField) => HttpClient.put<UpdateEmployeeResponse>(API_ENDPOINTS.UPDATE_EMPLOYEE_INFO, info),
        submitonsite: (info: OnsiteInputs) => HttpClient.post<SubmitOnsiteResponse>(API_ENDPOINTS.SUBMIT_ONSIE, info),
        getonsite: (info: FilterDataOnsite) => HttpClient.get<GetOnsiteResponse>(API_ENDPOINTS.EMPLOYEE_LIST_APPROVE_ON_SITE, info),
        getnotification: () => HttpClient.get<NotificationResponse>(API_ENDPOINTS.GET_NOTIFICATION)

    }
    project = {
        getall: (filter: FilterProject) => HttpClient.get<ProjectReponse>(API_ENDPOINTS.GITLAB_ALLPROJECT, filter),
        getdetail: ({ fullpath }: ProjectDetailFilter) => HttpClient.get<ProjectDetailResponse>(API_ENDPOINTS.GITLAB_PROJECT_DETAIL, { fullpath }),
    }
    candidate = {
        getall: () => HttpClient.get<CandidatePaginator>(API_ENDPOINTS.CANDIDATE),
        getbycode: ({ candidateid }: CandidateCodeInput) => HttpClient.get<CandidateDetailResponsePaginator>(API_ENDPOINTS.CANDIDATE_GETBYCODE, { candidateid }),
        create: (data: CandidateInput) => HttpClient.post<CreateCandidateResponse>(API_ENDPOINTS.CANDIDATPOST, data),
        access: (input: CandidateAccessParams) => HttpClient.post<AuthResponse>(API_ENDPOINTS.CANDIDATEACCESS, input),
        getquestions: () => HttpClient.get<CandidateQuestion>(API_ENDPOINTS.CANDIDATEQUESTION),
        submit: (data: { careerdata: { qstcd: string; answer: string; }[] }) => HttpClient.post<CreateCandidateResponse>(API_ENDPOINTS.CANDIDATESUBMIT, data),
        onjob: (onjob: OnJobInput) => HttpClient.post<CandidateOnJobResponse>(API_ENDPOINTS.EMPLOYEE_TRY_JOB, onjob)

    }
    blog = {
        getall: () => HttpClient.get<BlogDataResponsePaginator>(API_ENDPOINTS.BLOG_GETALL)
    }
    device = {
        getall: (filter: FilterDevice) => HttpClient.get<GetListDeviceResponse>(API_ENDPOINTS.DEVICE_GETALL, filter),
        getdevicebyid: ({ deviceid }: { deviceid: string }) => HttpClient.get<GetDeviceResponse>(API_ENDPOINTS.DEVICE_GETBYID, { deviceid }),
        addnew: (device: DeviceInputData) => HttpClient.post<AddDeviceResponse>(API_ENDPOINTS.ADD_DEVICE, device),
        modify: (device: DeviceInputData) => HttpClient.put<ModifyDeviceResponse>(API_ENDPOINTS.MODIFY_DEVICE, device)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();
