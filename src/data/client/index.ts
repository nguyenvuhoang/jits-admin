import { AuthResponse, BlockEmployeeInput, BlockEmployeeResponse, EmployeeCodeInput, EmployeeDetailResponsePaginator, EmployeeResponsePaginator, FilterEmployee, LoginUserInput, UserResponsePaginator } from "@/context/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/auth";

class Client {
    users = {
        login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
        me: () => HttpClient.get(API_ENDPOINTS.USERS_ME),
        getall: () => HttpClient.get<UserResponsePaginator>(API_ENDPOINTS.USERS_GETALL)
    }
    employee = {
        getall: (filter: FilterEmployee) => HttpClient.get<EmployeeResponsePaginator>(API_ENDPOINTS.EMPLOYEE_GETALL, filter),
        getbycode: ({ employeecd }: EmployeeCodeInput) => HttpClient.get<EmployeeDetailResponsePaginator>(API_ENDPOINTS.EMPLOYEE_GETBYCODE, { employeecd }),
        block: (input: BlockEmployeeInput) => HttpClient.post<BlockEmployeeResponse>(API_ENDPOINTS.BLOCK_EMPLOYEE,input)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();