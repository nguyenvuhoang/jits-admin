import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'

type Props = {}

const DepartmentPage = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>{slug}</div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const { slug } = params!
    return {
        props: {
            slug
        }
    }
}
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: false
    }
}
export default DepartmentPage