import { UserResponsePaginator } from "@/context/types";
import { useQuery } from "@tanstack/react-query";
import client from "../client";

export const FetchUser = () => {
    const { data, isLoading, refetch } = useQuery<UserResponsePaginator, Error>(
        ['user-list'],
        () => client.users.getall(),
    )
    return {
        users: data?.result.data,
        isLoading,
        refetch
    }
}
