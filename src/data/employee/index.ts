import { EmployeeResponsePaginator } from "@/context/types";
import { useQuery } from "@tanstack/react-query";
import client from "../client";

export const FetchEmployee = () => {
    const { data, isLoading, refetch } = useQuery<EmployeeResponsePaginator, Error>(
        ['employee-list'],
        () => client.employee.getall(),
    )
    return {
        employees: data?.result.data,
        isLoading,
        refetch
    }
}
