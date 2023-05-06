import { EmployeeDetailResponsePaginator, EmployeeResponsePaginator, FilterEmployee } from "@/context/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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
