import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'


const ProjectDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const joinedParam = Array.isArray(id) ? id.join('/') : id;
    return (
        <>{joinedParam}</>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
    const { id } = params!
    return {
        props: {
            id,
            ...(await serverSideTranslations(locale!, ['common'])),
        }
    }
}
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
export default ProjectDetailPage