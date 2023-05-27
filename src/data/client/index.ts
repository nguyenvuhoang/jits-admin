import { API_ENDPOINTS } from "@/configs/auth";
import { AuthResponse, BlockEmployeeInput, BlockEmployeeResponse, CandidateAccessParams, CandidateCodeInput, CandidateDetailResponsePaginator, CandidatePaginator, CandidateQuestion, CreateCandidateResponse, EmployeeCodeInput, EmployeeData, EmployeeDetailResponsePaginator, EmployeeResponse, EmployeeResponsePaginator, FilterEmployee, FilterProject, LoginUserInput, ProjectReponse, UpdateStatusEmployeeInput, UserResponsePaginator } from "@/context/types";
import { CandidateInput } from "@/types/dashboards/candidateTyps";
import { HttpClient } from "./http-client";

class Client {
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
        approve: (employeeinput: UpdateStatusEmployeeInput) => HttpClient.post<EmployeeResponse>(API_ENDPOINTS.APPROVE_EMPLOYEE, employeeinput)
    }
    project = {
        getall: (filter: FilterProject) => HttpClient.get<ProjectReponse>(API_ENDPOINTS.GITLAB_ALLPROJECT, filter)
    }
    candidate = {
        getall: () => HttpClient.get<CandidatePaginator>(API_ENDPOINTS.CANDIDATE),
        getbycode: ({ candidateid }: CandidateCodeInput) => HttpClient.get<CandidateDetailResponsePaginator>(API_ENDPOINTS.CANDIDATE_GETBYCODE, { candidateid }),
        create: (data: CandidateInput) => HttpClient.post<CreateCandidateResponse>(API_ENDPOINTS.CANDIDATPOST, data),
        access: (input: CandidateAccessParams) => HttpClient.post<AuthResponse>(API_ENDPOINTS.CANDIDATEACCESS, input),
        getquestions: () => HttpClient.get<CandidateQuestion>(API_ENDPOINTS.CANDIDATEQUESTION),
        submit: (data: { careerdata: { qstcd: string; answer: string; }[] }) => HttpClient.post<CreateCandidateResponse>(API_ENDPOINTS.CANDIDATESUBMIT, data)

    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();
