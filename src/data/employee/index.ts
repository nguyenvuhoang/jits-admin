import { EmployeeResponsePaginator, FilterEmployee } from "@/context/types";
import { useQuery } from "@tanstack/react-query";
import client from "../client";

export const FetchEmployee = (filter: FilterEmployee) => {
    const { data, isLoading, refetch } = useQuery<EmployeeResponsePaginator, Error>(
        ['employee-list'],
        () => client.employee.getall(filter),
    )
    return {
        employees: data?.result.data,
        isLoading,
        refetch
    }
}
