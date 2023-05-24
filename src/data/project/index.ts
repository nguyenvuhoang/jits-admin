import { FilterProject, ProjectReponse } from "@/context/types"
import client from "../client"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useAuth } from "@/hooks/useAuth"

export const FetchProject = (filter: FilterProject) => {

    const { logout } = useAuth()

    const { data, isLoading, refetch, error } = useQuery<ProjectReponse, Error>(

        {
            queryKey: ['project-list-gitlab'],
            queryFn: () => client.project.getall(filter),
            onError: (errorAsUnknown) => {
                const error = errorAsUnknown as AxiosError<ProjectReponse>;
                // Xử lý lỗi tại đây
                if (error?.response?.data.errorcode === 401) {
                    logout()
                }

            }
        }

    )
    return {
        project: data?.result.data,
        isLoading,
        refetch,
        error
    }
}