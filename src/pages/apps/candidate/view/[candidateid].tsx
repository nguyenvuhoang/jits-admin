import themeConfig from '@/configs/themeConfig'
import { FetchCandidate, FetchCandidateDetail } from '@/data/candidate'
import client from '@/data/client'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { GetStaticPaths } from 'next'
import Head from 'next/head'
import React from 'react'

const CandidatePage = ({ candidateid }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(candidateid)
    const { candidatedtl } = FetchCandidateDetail(candidateid)
    // console.log(candidatedtl)
    return (
        <>
            <Head >
                <title>{`${themeConfig.templateName} - Candidate Detail`}</title>
            </Head>

            <div>{candidateid}</div>
        </>

    )
}
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const { candidateid } = params!
    return {
        props: {
            candidateid: candidateid
        }
    }
}
export default CandidatePage