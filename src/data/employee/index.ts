import { ApplicationForLeaveByIdResponse, ApproveApplicationForLeaveResponse, EmployeeDetailResponsePaginator, EmployeeResponsePaginator, EmployeeTeamCodeResponse, FilterEmployee, ListOfApplicationForLeaveResponse } from "@/context/types";
import { ListOfApplicationSearchInputs } from "@/types/form/applicationForLetterType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import client from "../client";
import { AxiosError } from "axios";

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
        () => client.employee.getteamcode({ teamcd: teamcode }),
        { enabled: shouldFetch }
    )
    return {
        employees: data?.result?.data,
        isLoading,
        refetch
    }
}

export const useSubmitApplicationForLeave = () => {
    const router = useRouter()
    return useMutation(client.employee.submitapplicationforleave, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    color: 'green',
                    title: 'Nộp phép thành công!',
                    text: 'ĐƠn xin nghỉ phép của bạn đã nộp. Vui lòng đợi cấp trên của bạn duyệt phép. Quay trở về trang chủ'
                }).then((response: any) => {
                    if (response.isConfirmed) {
                        router.push('/')
                    }
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    color: 'red',
                    title: 'Failed!',
                    text: `${data.messagedetail}`
                })
            }
        },
        onError: (errorAsUnknown) => {
            const error = errorAsUnknown as AxiosError<ApproveApplicationForLeaveResponse>;
            Swal.fire({
                position: 'center',
                icon: 'error',
                color: 'red',
                title: 'Oops...',
                text: `${error?.response?.status === 400 ? error.response.data.messagedetail : 'Error'}`,
            })

        }

    });
};

export const FetchListOfApplicationForLeave = (filter?: ListOfApplicationSearchInputs) => {
    const { data, isLoading, refetch } = useQuery<ListOfApplicationForLeaveResponse, Error>(
        ['applicationforleave-list'],
        () => client.employee.getapplicationforleave(filter)
    )
    return {
        applicationforleave: data?.result.data,
        isLoading,
        refetch
    }
}

export const FetchApplicationForLeavebyid = (id: string) => {
    const { data, isLoading, refetch } = useQuery<ApplicationForLeaveByIdResponse, Error>(
        ['application-for-leave-id'],
        () => client.employee.getapplicationforleavebyid({
            id: id
        })
    )
    return {
        application: data?.result.data,
        isLoading,
        refetch
    }
}

export const useSubmitApproveApplicationForLeave = () => {
    const router = useRouter()
    return useMutation(client.employee.approveapplicationforleave, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    color: 'green',
                    title: 'Đã duyệt',
                    text: 'Đơn xin phép đã được duyệt. Quay trở về trang quản lý'
                }).then((response: any) => {
                    if (response.isConfirmed) {
                        router.push('/form/approve-personal-off')
                    }
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    color: 'red',
                    title: 'Failed!',
                    text: `${data.messagedetail}`
                })
            }
        }
    });
};