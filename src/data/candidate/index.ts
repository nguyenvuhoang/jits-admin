import { CandidateCodeInput, CandidateDetailResponsePaginator, CandidatePaginator } from "@/context/types"
import { useQuery } from "@tanstack/react-query"
import client from "../client"

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
    console.log(candidateid)
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