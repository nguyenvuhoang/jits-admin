import { AuthResponse, LoginUserInput } from "@/context/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "@/configs/auth";

class Client {  
    users = {
        login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
        me: () => HttpClient.get(API_ENDPOINTS.USERS_ME),
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();