import { FilterProject, ProjectDetailFilter, ProjectDetailResponse, ProjectReponse } from "@/context/types"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import client from "../client"

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

export const FetchProjectDetail = (filter: ProjectDetailFilter) => {

    const { logout } = useAuth()

    const { data, isLoading, refetch, error } = useQuery<ProjectDetailResponse, Error>(

        {
            queryKey: ['project-detail-gitlab'],
            queryFn: () => client.project.getdetail(filter),
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
        projectdetail: data?.result.data,
        isLoading,
        refetch,
        error
    }
}
