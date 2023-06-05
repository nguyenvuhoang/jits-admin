import { MenuResponse } from "@/context/types"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import client from "../client"
export const FetchMenu = () => {
    const { locale } = useRouter()
    const { logout } = useAuth()
    const isFetching = locale ? true : false
    const { data, isLoading, refetch, error } = useQuery<MenuResponse, Error>(

        {
            queryKey: ['menu'],
            queryFn: () => client.system.getmenu({ language: locale }),
            onError: (errorAsUnknown) => {
                const error = errorAsUnknown as AxiosError<MenuResponse>;
                // Xử lý lỗi tại đây
                if (error?.response?.data.errorcode === 401) {
                    logout()
                }
            },
            enabled: isFetching
        }

    )
    return {
        menu: data?.result.data,
        isLoading,
        refetch,
        error
    }
}