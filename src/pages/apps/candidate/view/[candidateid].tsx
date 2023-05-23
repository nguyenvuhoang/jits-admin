import Icon from '@/@core/components/icon'
import themeConfig from '@/configs/themeConfig'
import { FetchCandidateDetail } from '@/data/candidate'
import { TabContext } from '@mui/lab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Card, CardContent, Chip, Grid, GridProps, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Tab from '@mui/material/Tab'
import { styled, useTheme } from '@mui/material/styles'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { SyntheticEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'


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


const CandidatePage = ({ candidateid }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { candidatedtl } = FetchCandidateDetail(candidateid)

    const theme = useTheme()

    const [value, setValue] = useState<string>('java')
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    const {
        control,
        handleSubmit,
        formState: { errors }
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
                                {candidatedtl?.result_test.result === 'Không đạt' ? 'Condolatory' : 'Congratulation'} {' '}
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
                            <Typography variant='body2' sx={{ mt: 4 }}>
                                You have done{' '}
                                <Box component='span' sx={{ fontWeight: 600 }}>
                                    {candidatedtl?.result_test.score} {'/'} {candidatedtl?.result_test.totalscore}
                                </Box>{' '}
                            </Typography>
                            <Chip
                                sx={{ mt: 5 }}
                                label={candidatedtl?.result_test.result}
                                color={candidatedtl?.result_test.result === 'Không đạt' ? 'error' : 'success'}
                                variant='outlined'
                            />
                        </Grid>
                        <StyledGrid item xs={12} sm={6}>
                            <Img alt={candidatedtl?.candidate.fullname} src={`/images/cards/illustration-john-${theme.palette.mode}.png`} />
                        </StyledGrid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ position: 'relative', mt: 5 }}>
                <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
                    <Grid item xs={12} md={6}>
                        <TabContext value={value}>
                            <TabList scrollButtons variant='scrollable' onChange={handleChange} aria-label='forced scroll tabs example'>
                                <Tab value='java' label='Java' icon={<Icon icon='mdi:language-java' />} />
                                <Tab value='dotnet' label='.NET' icon={<Icon icon='devicon:dotnetcore' />} />
                                <Tab value='javascript' label='Javascript' icon={<Icon icon='devicon:javascript' />} />
                                <Tab value='sql' label='SQL' icon={<Icon icon='mdi:sql-query' />} />
                                <Tab value='eng' label='English' icon={<Icon icon='icon-park:english' />} />
                            </TabList>
                            <TabPanel value='java'>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <Controller
                                                        name='radio'
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                                                                <FormControlLabel
                                                                    value='female'
                                                                    label='Female'
                                                                    sx={errors.radio ? { color: 'error.main' } : null}
                                                                    control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                                                                />
                                                                <FormControlLabel
                                                                    value='male'
                                                                    label='Male'
                                                                    sx={errors.radio ? { color: 'error.main' } : null}
                                                                    control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                                                                />
                                                                <FormControlLabel
                                                                    value='other'
                                                                    label='Other'
                                                                    sx={errors.radio ? { color: 'error.main' } : null}
                                                                    control={<Radio sx={errors.radio ? { color: 'error.main' } : null} />}
                                                                />
                                                            </RadioGroup>
                                                        )} />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </CardContent>
            </Card>
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