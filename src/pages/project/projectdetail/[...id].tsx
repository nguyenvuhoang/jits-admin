import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { FetchProjectDetail } from '@/data/project'
import OpenIssued from '@/views/apps/project/OpenIssued'
import ClosedIssued from '@/views/apps/project/ClosedIssued'
import InprogressIssued from '@/views/apps/project/InprogressIssued'
import { Box, Card, CardContent, Grid, GridProps, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Spinner from '@/@core/components/spinner'
import NoActionIssued from '@/views/apps/project/NoActionIssued'


const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        order: -1,
        display: 'flex',
        justifyContent: 'center'
    }
}))

const Img = styled('img')(({ theme }) => ({
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
        width: 200,
        position: 'static'
    }
}))


const ProjectDetailPage = ({ joinedParam }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { projectdetail, isLoading } = FetchProjectDetail({
        fullpath: joinedParam
    })

    const theme = useTheme()

    if (isLoading) return <Spinner />

    return (
        <>
            <ApexChartWrapper>
                <Grid container spacing={6} className='match-height'>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ position: 'relative' }}>
                            <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant='h5' sx={{ mb: 4.5 }}>
                                            <Box component='span' sx={{ fontWeight: 'bold' }}>
                                                {projectdetail?.name}
                                            </Box>
                                            ! 🔒
                                        </Typography>
                                        <Typography variant='body2'>
                                            {projectdetail?.description}
                                        </Typography>
                                    </Grid>
                                    <StyledGrid item xs={12} sm={2}>
                                        <Img alt='Project image'
                                            width={160}
                                            height={160}
                                            src={projectdetail?.avatar_url ? projectdetail?.avatar_url :
                                                `/images/cards/illustration-john-${theme.palette.mode}.png`}
                                        />
                                    </StyledGrid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                </Grid>
                <Grid container spacing={6} className='match-height' style={{ marginTop: 5 }}>
                    <Grid item xs={12} md={6} lg={3} >
                        <OpenIssued projectdetail={projectdetail} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <InprogressIssued projectdetail={projectdetail} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <NoActionIssued projectdetail={projectdetail} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ClosedIssued projectdetail={projectdetail} />
                    </Grid>
                </Grid>

            </ApexChartWrapper>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
    const { id } = params!
    const joinedParam = Array.isArray(id) ? id.join('/') : id;
    return {
        props: {
            joinedParam,
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