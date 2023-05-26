/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** Context Imports

// ** MUI Imports
import Icon from '@/@core/components/icon'
import themeConfig from '@/configs/themeConfig'
import { TabContext, TabList } from '@mui/lab'
import { Button, Tab } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import Java from '@/views/apps/candidate/do/Java'
import { FetchCandidateQuestion } from '@/data/candidate'
import { useForm } from 'react-hook-form';

const DoTestPage = () => {

    const [value, setValue] = useState<string>('java')

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const [submit, setSubmit] = useState(false)

    const { question, refetch } = FetchCandidateQuestion()


    useEffect(() => {
        refetch()
    }, [submit])


    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    console.log(errors)

    return (
        <>
            <Head >
                <title>{`${themeConfig.templateName} - Candidate Do Test`}</title>
            </Head>
            <Card sx={{ position: 'relative' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
                        <Grid container spacing={6}>

                            <Grid item xs={12} sm={12}>
                                <TabContext value={value}>
                                    <TabList scrollButtons variant='scrollable' onChange={handleChange} aria-label='forced scroll tabs example'>
                                        <Tab value='java' label='Java' icon={<Icon icon='mdi:language-java' />} />
                                        <Tab value='dotnet' label='.NET' icon={<Icon icon='devicon:dotnetcore' />} />
                                        <Tab value='javascript' label='Javascript' icon={<Icon icon='devicon:javascript' />} />
                                        <Tab value='sql' label='SQL' icon={<Icon icon='mdi:sql-query' />} />
                                        <Tab value='eng' label='English' icon={<Icon icon='icon-park:english' />} />
                                    </TabList>
                                    <Java question={question?.Java} control={control} errors={errors} />

                                </TabContext>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button size='large' type='submit' variant='contained'>
                                Nộp bài
                            </Button>
                        </Grid>
                    </CardContent>

                </form>
            </Card>
        </>
    )
}

DoTestPage.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default DoTestPage
