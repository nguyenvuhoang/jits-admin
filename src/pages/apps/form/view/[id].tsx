import PageHeader from '@/@core/components/page-header'
import Spinner from '@/@core/components/spinner'
import themeConfig from '@/configs/themeConfig'
import { FetchApplicationForLeavebyid, useSubmitApproveApplicationForLeave, useSubmitConfirmApplicationForLeave, useSubmitRejectApplicationForLeave } from '@/data/employee'
import EmployeeViewFormApplication from '@/views/apps/employee/view/EmployeeViewFormApplication'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect } from 'react'


const ViewForm = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { application, refetch } = FetchApplicationForLeavebyid(id)

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refetch])

    const { t } = useTranslation('common')

    const { isLoading: isApprove, mutate: SubmitApproveApplicationForLeave } = useSubmitApproveApplicationForLeave()

    const { isLoading: isReject, mutate: SubmitRejectApplicationForLeave } = useSubmitRejectApplicationForLeave()

    const { isLoading: isConfirm, mutate: SubmitConfirmApplicationForLeave } = useSubmitConfirmApplicationForLeave()


    const ApproveApplicationForLeave = (id: string) => {
        SubmitApproveApplicationForLeave({ id: id })
    }
    const RejectApplicationForLeave = (id: string) => {
        SubmitRejectApplicationForLeave({ id: id })
    }
    const ConfirmApplicationForLeave = (id: string) => {
        SubmitConfirmApplicationForLeave({ id: id })
    }

    if (isApprove) return <Spinner />

    if (isReject) return <Spinner />

    if (isConfirm) return <Spinner />

    return (
        <>
            <Head >
                <title>{`${themeConfig.templateName} - Approve for Application for Leave`}</title>
            </Head>
            <Grid container spacing={6} >
                <PageHeader
                    title={
                        <Typography variant='h4'>
                            Duyệt đơn xin nghỉ phép
                        </Typography>
                    }
                    subtitle={<Typography variant='body2'>Vui lòng điền đầy đủ thông tin bên dưới</Typography>}
                />

                <Grid item xs={12}>
                    {application &&
                        <>
                            <EmployeeViewFormApplication application={application} />

                            {application.status !== 'A' &&
                                <Card sx={{ position: 'relative', marginTop: '20px' }}>
                                    <CardContent>
                                        <Grid item xs={12}>
                                            {application?.btnApprove &&
                                                <>
                                                    <Button onClick={() => ApproveApplicationForLeave(id)} size='large' type='submit' variant='contained'>
                                                        {t('text-sub-application-form')}
                                                    </Button>
                                                </>
                                            }

                                            {application?.btnReject && application.status !== 'R' &&
                                                <Button onClick={() => RejectApplicationForLeave(id)} size='large' color="error" type='submit' sx={{ marginLeft: 5 }} variant='contained'>
                                                    {t('text-reject-application-form')}
                                                </Button>
                                            }

                                            {application?.btnConfirm && application.status === 'P' &&
                                                <Button onClick={() => ConfirmApplicationForLeave(id)} size='large' color="warning" type='submit' sx={{ marginLeft: 5 }} variant='contained'>
                                                    {t('text-confirm-application-form')}
                                                </Button>
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            }

                        </>
                    }
                </Grid>

            </Grid>
        </>
    )
}


export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { id } = params!

    try {
        return {
            props: {
                id: id,
                ...(await serverSideTranslations(locale!, ['common'])),
            },
            revalidate: 60, // In seconds
        };
    } catch (error) {
        console.log(error)
        //* if we get here, the product doesn't exist or something else went wrong
        return {
            notFound: true,
        };
    }
};

export default ViewForm