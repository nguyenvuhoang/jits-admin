import { GetListDeviceResponse } from "@/context/types"
import { useQuery } from "@tanstack/react-query"
import client from "../client"
export const FetchDevice = () => {
    const { data, isLoading, refetch } = useQuery<GetListDeviceResponse, Error>(
        ['device-list'],
        () => client.device.getall()
    )
    return {
        device: data?.result.data,
        isLoading,
        refetch
    }
}