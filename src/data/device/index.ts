import { FilterDevice, GetListDeviceResponse } from "@/context/types"
import { useQuery } from "@tanstack/react-query"
import client from "../client"

export const FetchDevice = (filter: FilterDevice) => {
    const { data, isLoading, refetch } = useQuery<GetListDeviceResponse, Error>(
        ['device-list'],
        () => client.device.getall(filter)
    )
    return {
        device: data?.result.data,
        isLoading,
        refetch
    }
}