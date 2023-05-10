import { FilterProject, ProjectReponse } from "@/context/types"
import client from "../client"
import { useQuery } from "@tanstack/react-query"

export const FetchProject = (filter: FilterProject) => {
    const { data, isLoading, refetch } = useQuery<ProjectReponse, Error>(

        {
            queryKey: ['project-list-gitlab'],
            queryFn: () => client.project.getall(filter)
        }
    )
    return {
        project: data?.result.data,
        isLoading,
        refetch
    }
}