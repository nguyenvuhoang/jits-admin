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
import DotNet from '@/views/apps/candidate/do/DotNet'

import { FetchCandidateQuestion, useSubmitDoTestCandidate } from '@/data/candidate'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import JavaScript from '@/views/apps/candidate/do/JavaScript'
import SQL from '@/views/apps/candidate/do/SQL'
import English from '@/views/apps/candidate/do/English'
import { useAuth } from '@/hooks/useAuth'

const DoTestPage = () => {

    const [values, setValues] = useState<string>('java')
    const auth = useAuth()

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValues(newValue)
    }

    const [submit, setSubmit] = useState(false)

    const { question, refetch } = FetchCandidateQuestion(auth.token)

    const { mutate: SubmitDoTestCandidate } = useSubmitDoTestCandidate()


    useEffect(() => {
        refetch()
    }, [submit,auth.token])


    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm()

    const onSubmit = (data: Record<string, string>) => {
        var listanswer: { qstcd: string, answer: string }[] = [];
        const jlistData = Object.entries(data);
        jlistData.forEach(([key, value]) => {
            const jobject = { "qstcd": key, "answer": value }
            listanswer.push(jobject)
        })
        const postdata = listanswer
        Swal.fire({
            title: `Bạn muốn nộp bài kiểm tra này?`,
            html: `"Xin hãy thận trọng, bài kiểm tra này sẽ được ghi nhận. Tất nhiên sẽ không được thay đổi kết quả`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Nộp bài`,
            cancelButtonText: `Hủy bỏ`,
        }).then((result) => {
            if (result.value) {
                const submitData = {
                    careerdata: postdata
                }
                SubmitDoTestCandidate(submitData)
                setSubmit(true)
            }
        });
    }

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
                                <TabContext value={values}>
                                    <TabList scrollButtons variant='scrollable' onChange={handleChange} aria-label='forced scroll tabs example'>
                                        <Tab value='java' label='Java' icon={<Icon icon='mdi:language-java' />} />
                                        <Tab value='dotnet' label='.NET' icon={<Icon icon='devicon:dotnetcore' />} />
                                        <Tab value='javascript' label='Javascript' icon={<Icon icon='devicon:javascript' />} />
                                        <Tab value='sql' label='SQL' icon={<Icon icon='mdi:sql-query' />} />
                                        <Tab value='eng' label='English' icon={<Icon icon='icon-park:english' />} />
                                    </TabList>
                                    <Java question={question?.Java} control={control} errors={errors} setValue={setValue} />
                                    <DotNet question={question?.dotNet} control={control} errors={errors} setValue={setValue} />
                                    <JavaScript question={question?.Javascript} control={control} errors={errors} setValue={setValue} />
                                    <SQL question={question?.SQL} control={control} errors={errors} setValue={setValue} />
                                    <English question={question?.English} control={control} errors={errors} setValue={setValue} />
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
