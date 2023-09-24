import Icon from '@/@core/components/icon'
import themeConfig from '@/configs/themeConfig'
import { FetchCandidateDetail } from '@/data/candidate'
import DotNet from '@/views/apps/candidate/view/DotNet'
import English from '@/views/apps/candidate/view/English'
import Java from '@/views/apps/candidate/view/Java'
import Javascript from '@/views/apps/candidate/view/JavaScript'
import SQL from '@/views/apps/candidate/view/SQL'
import { TabContext } from '@mui/lab'
import TabList from '@mui/lab/TabList'
import { Box, Card, CardContent, Chip, Grid, GridProps, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import { styled, useTheme } from '@mui/material/styles'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { SyntheticEvent, useState } from 'react'
import { useForm } from 'react-hook-form'


const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        order: -1,
        display: 'flex',
        justifyContent: 'center'
    }
}))

const Img = styled('img')(({ theme }) => ({
    right: 0,
    bottom: 0,
    width: 298,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
        width: 250,
        position: 'static'
    }
}))


const CandidateProfilePage = ({ candidateid }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { candidatedtl } = FetchCandidateDetail(candidateid)


    const theme = useTheme()

    const [value, setValue] = useState<string>('java')
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    const {
        control
    } = useForm()

    return (
        <>
            <Head >
                <title>{`${themeConfig.templateName} - Candidate Detail`}</title>
            </Head>

            <Card sx={{ position: 'relative' }}>
                <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='h5' sx={{ mb: 5 }}>
                                <Box component='span' sx={{ fontWeight: 'bold' }}>
                                    {candidatedtl?.candidate.fullname}
                                </Box>
                            </Typography>
                            <Typography variant='body2'>
                                Mail:
                                <Box component='span' sx={{ fontWeight: 600, ml: 2 }}>
                                    {candidatedtl?.candidate.email}
                                </Box>{' '}
                            </Typography>
                            <Typography variant='body2'>
                                Phone:
                                <Box component='span' sx={{ fontWeight: 600, ml: 2 }}>
                                    {candidatedtl?.candidate.phone}
                                </Box>{' '}
                            </Typography>

                        </Grid>
                        <StyledGrid item xs={12} sm={6}>
                            <Img alt={candidatedtl?.candidate.fullname} src={`/images/cards/illustration-john-${theme.palette.mode}.png`} />
                        </StyledGrid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ position: 'relative', mt: 5 }}>
                <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='body2'>
                            <Box component='span' sx={{ fontWeight: 600, ml: 2 }}>
                                {candidatedtl?.candidate.bio}
                            </Box>{' '}
                        </Typography>

                    </Grid>
                </CardContent>
            </Card >
        </>

    )
}
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
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
export default CandidateProfilePage