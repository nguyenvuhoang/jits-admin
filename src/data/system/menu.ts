import { MenuResponse } from "@/context/types"
import { useQuery } from "@tanstack/react-query"
import client from "../client"
export const FetchMenu = () => {
    const { data, isLoading, refetch, error } = useQuery<MenuResponse, Error>(
        {
            queryKey: ['menu'],
            queryFn: () => client.system.getmenu({ language: 'en' }),
        }
    )
    return {
        menu: data?.result.data,
        isLoading,
        refetch,
        error
    }
}