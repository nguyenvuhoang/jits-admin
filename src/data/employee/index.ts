import { EmployeeDetailResponsePaginator, EmployeeResponsePaginator, EmployeeTeamCodeResponse, FilterEmployee } from "@/context/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import client from "../client";

export const FetchEmployee = (filter: FilterEmployee) => {
    const { data, isLoading, refetch } = useQuery<EmployeeResponsePaginator, Error>(
        ['employee-list'],
        () => client.employee.getall(filter),
        { enabled: filter.teamcd !== '' }
    )
    return {
        employees: data?.result.data,
        isLoading,
        refetch
    }
}

export const FetchEmployeeByCode = (employeecd: string | string[] | undefined, initial: any) => {
    const { data, isLoading, refetch } = useQuery<EmployeeDetailResponsePaginator, Error>(
        {
            queryKey: ['employee-detail'],
            queryFn: () => client.employee.getbycode({ employeecd: employeecd }),
            initialData: initial
        }
    )

    return {
        employeesdtl: data?.result?.data,
        isLoading,
        refetch
    }
}

export const useBlockEmployee = () => {
    return useMutation(client.employee.block, {
        onSuccess: () => {
        }
    });
};

export const FetchEmployeeByTeamcode = (teamcode: string) => {
    const shouldFetch = teamcode !== '';
    const { data, isLoading, refetch } = useQuery<EmployeeTeamCodeResponse, Error>(
        ['employee-list-by-team'],
        () => client.employee.getteamcode({teamcd: teamcode}),
        { enabled: shouldFetch }
    )
    return {
        employees: data?.result?.data,
        isLoading,
        refetch
    }
}
