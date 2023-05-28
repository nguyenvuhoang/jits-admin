import { BlogDataResponsePaginator } from "@/context/types"
import { useQuery } from "@tanstack/react-query"
import client from "../client"
export const FetchBlog = () => {
    const { data, isLoading, refetch } = useQuery<BlogDataResponsePaginator, Error>(
        ['blog-list'],
        () => client.blog.getall()
    )
    return {
        blog: data?.result.data,
        isLoading,
        refetch
    }
}