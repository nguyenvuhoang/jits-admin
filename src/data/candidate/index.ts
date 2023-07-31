import { CandidateDetailResponsePaginator, CandidatePaginator, CandidateQuestion, CreateCandidateResponse } from "@/context/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import client from "../client"
import Swal from "sweetalert2"
import { useRouter } from "next/router"
import { useAuth } from "@/hooks/useAuth"
import { AxiosError } from "axios"

export const FetchCandidate = () => {
    const { data, isLoading, refetch } = useQuery<CandidatePaginator, Error>(
        ['candidate-list'],
        () => client.candidate.getall(),
    )
    return {
        candidate: data?.result.data,
        isLoading,
        refetch
    }
}

export const FetchCandidateDetail = (candidateid: string) => {
    const { data, isLoading, refetch } = useQuery<CandidateDetailResponsePaginator, Error>(
        ['candidate-detail'],
        () => client.candidate.getbycode({ candidateid: candidateid }),
    )
    return {
        candidatedtl: data?.result.data,
        isLoading,
        refetch
    }
}

export const useCreateCandidate = () => {
    const router = useRouter()
    return useMutation(client.candidate.create, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    color: 'green',
                    title: 'Created!',
                    text: 'New candidate has created succesfully. The system have sent to email of candidate'
                }).then((response: any) => {
                    if (response.isConfirmed) {
                        router.push('/candidate/management')
                    }
                })
            }else{
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
            const error = errorAsUnknown as AxiosError<CreateCandidateResponse>;
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


export const FetchCandidateQuestion = (token: string | null) => {
    const { data, isLoading, refetch } = useQuery<CandidateQuestion, Error>(
        ['candidate-list-question'],
        () => client.candidate.getquestions(),
        {
            refetchOnWindowFocus: false,
            enabled: !token
        }
    )
    return {
        question: data?.result.data,
        isLoading,
        refetch
    }
}

export const useSubmitDoTestCandidate = () => {
    const auth = useAuth()
    return useMutation(client.candidate.submit, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    color: 'green',
                    title: 'Succeed!',
                    text: 'Your test has been submitted to JITS succesfully. The system will send result to you soon'
                }).then((response: any) => {
                    if (response.isConfirmed) {
                        auth.logout()
                    }
                })
            }
        }
    });
};


export const useCandidateOnJob = () => {
    const auth = useAuth()
    return useMutation(client.candidate.submit, {
        onSuccess: (data) => {
            if (data.errorcode === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    color: 'green',
                    title: 'Succeed!',
                    text: 'Your test has been submitted to JITS succesfully. The system will send result to you soon'
                }).then((response: any) => {
                    if (response.isConfirmed) {
                        auth.logout()
                    }
                })
            }
        }
    });
};