import { CandidateDetailResponsePaginator, CandidatePaginator, CandidateQuestion } from "@/context/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import client from "../client"
import Swal from "sweetalert2"
import { useRouter } from "next/router"

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
            }
        }
    });
};


export const FetchCandidateQuestion = () => {
    const { data, isLoading, refetch } = useQuery<CandidateQuestion, Error>(
        ['candidate-list-question'],
        () => client.candidate.getquestions(),
    )
    return {
        question: data?.result.data,
        isLoading,
        refetch
    }
}