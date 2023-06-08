import PageHeader from '@/@core/components/page-header'
import Repeater from '@/@core/components/repeater'
import Spinner from '@/@core/components/spinner'
import themeConfig from '@/configs/themeConfig'
import { FetchApplicationForLeavebyid, useSubmitApproveApplicationForLeave, useSubmitRejectApplicationForLeave } from '@/data/employee'
import { useAuth } from '@/hooks/useAuth'
import { Box, Button, Card, CardContent, CardContentProps, CardHeader, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, Grid, GridProps, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'


const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(5.5),
    '& .repeater-wrapper + .repeater-wrapper': {
        marginTop: theme.spacing(12)
    }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
    paddingRight: 0,
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '& .col-title': {
        top: '-1.5rem',
        position: 'absolute'
    },
    '& .MuiInputBase-input': {
        color: theme.palette.text.secondary
    },
    [theme.breakpoints.down('lg')]: {
        '& .col-title': {
            top: '0',
            position: 'relative'
        }
    }
}))


const ViewForm = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { application } = FetchApplicationForLeavebyid(id)

    const [formality, setFormality] = useState('')

    const handleChangeFormality = (event: ChangeEvent<HTMLInputElement>) => {
        setFormality(event.target.value);
    }

    const { t } = useTranslation('common')

    const { employee } = useAuth()

    const [countDateOff, setCountDateOff] = useState<number>(application?.dayoff.length || 1)

    useEffect(() => {
        if (application) {
            setFormality(application.formality)
            setCountDateOff(application.dayoff.length)
        }
    }, [application])


    const { isLoading: isApprove, mutate: SubmitApproveApplicationForLeave } = useSubmitApproveApplicationForLeave()

    const { isLoading: isReject, mutate: SubmitRejectApplicationForLeave } = useSubmitRejectApplicationForLeave()


    const ApproveApplicationForLeave = (id: string) => {
        SubmitApproveApplicationForLeave({ id: id })
    }
    const RejectApplicationForLeave = (id: string) => {
        SubmitRejectApplicationForLeave({ id: id })
    }

    if (isApprove) return <Spinner />

    if (isReject) return <Spinner />

    return (
        <>
            <Head >
                <title>{`${themeConfig.templateName} - Approve for Application for Leave`}</title>
            </Head>
            <Grid container spacing={6} >
                <PageHeader
                    title={
                        <Typography variant='h4'>
                            Duyệt Đơn xin nghỉ phép
                        </Typography>
                    }
                    subtitle={<Typography variant='body2'>Vui lòng điền đầy đủ thông tin bên dưới</Typography>}
                />

                <Grid item xs={12}>
                    {application &&
                        <>
                            <Card>
                                <CardHeader title='Thông tin cơ bản' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    label='Mã nhân viên'
                                                    sx={{ mr: 4 }}
                                                    id='employeecd'
                                                    defaultValue={application.employeecd}
                                                    inputProps={{ readOnly: true }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    label='Họ Tên'
                                                    sx={{ mr: 4 }}
                                                    id='fullname'
                                                    defaultValue={application.fullname}
                                                    inputProps={{ readOnly: true }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    label='Email'
                                                    sx={{ mr: 4 }}
                                                    id='email'
                                                    defaultValue={application.email}
                                                    inputProps={{ readOnly: true }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <Select
                                                    defaultValue={application.departmentcd}
                                                    fullWidth
                                                    id='select-deparmentcd'
                                                    label='Select Department'
                                                    labelId='deparmentcd-select'
                                                    inputProps={{
                                                        placeholder: 'Select Department',
                                                        readOnly: true
                                                    }}
                                                >
                                                    <MenuItem value=''>Select Department</MenuItem>
                                                    <MenuItem value='SDD'>Solutions Delivery Dept</MenuItem>
                                                    <MenuItem value='RND-HCM'>R&D Dept in HCM</MenuItem>
                                                    <MenuItem value='RND-HN'>R&D Dept in Ha Noi</MenuItem>
                                                    <MenuItem value='BUZ'>Business & Maketing</MenuItem>
                                                    <MenuItem value='HR'>Human Resource</MenuItem>
                                                    <MenuItem value='ACC'>Accountant</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card sx={{ position: 'relative', marginTop: '20px' }}>
                                <CardHeader title='Thông tin nghỉ phép' />
                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sm={12}>
                                            <InputLabel id='status-select'>Hình thức xin phép</InputLabel>
                                            <FormControl fullWidth>
                                                <RadioGroup row aria-label='formality' value={formality} onChange={handleChangeFormality} >
                                                    <FormControlLabel disabled={true} value='annual' control={<Radio />} label='Nghỉ phép năm' name='formality' />
                                                    <FormControlLabel disabled={true} value='unpaid' control={<Radio color='secondary' />} label='Nghỉ việc riêng không lương' />
                                                    <FormControlLabel disabled={true} value='paid' control={<Radio color='success' />} label='Nghỉ việc riêng có lương' />
                                                    <FormControlLabel disabled={true} value='socialinsurance' control={<Radio color='error' />} label='Nghỉ hưởng lương BHXH' />
                                                    <FormControlLabel disabled={true} value='home' control={<Radio color='warning' />} label='Làm việc tại nhà' />
                                                    <FormControlLabel disabled={true} value='other' control={<Radio color='info' />} label='Nghỉ bù/ Nghỉ khác' />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    type='text'
                                                    label='Lý do sinh phép'
                                                    placeholder='Bận việc cá nhân'
                                                    aria-describedby='validation-reason'
                                                    defaultValue={application.reason}
                                                    inputProps={
                                                        {
                                                            readOnly: true
                                                        }
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    type='number'
                                                    label='Tổng số ngày nghỉ'
                                                    placeholder='Bận việc cá nhân'
                                                    aria-describedby='validation-totaldayoff'
                                                    defaultValue={application.totaldayoff}
                                                    inputProps={
                                                        {
                                                            readOnly: true
                                                        }
                                                    }
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    type='text'
                                                    label='Người thay thế (nếu có)'
                                                    placeholder='JITS'
                                                    aria-describedby='validation-replacepersion'
                                                    defaultValue={application.replacepersion}
                                                    inputProps={
                                                        {
                                                            readOnly: true
                                                        }
                                                    }
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Divider sx={{ mb: theme => `${theme.spacing(1.25)} !important` }} />

                                        <Grid item xs={12} sm={12}>
                                            <Typography
                                                variant='subtitle1'
                                                className='col-title'
                                                sx={{
                                                    mb: { lg: 2, md: 2, xs: 2 },
                                                    color: 'text.primary'
                                                }}
                                            >
                                                Ngày nghỉ
                                            </Typography>
                                            <RepeaterWrapper>
                                                <Repeater count={countDateOff}>
                                                    {(i: number) => {
                                                        const Tag = i === 0 ? Box : Collapse
                                                        return (
                                                            <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>

                                                                <Grid container >
                                                                    <RepeatingContent item xs={12} >
                                                                        <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                                                                            <Grid item lg={12} md={12} xs={12} sx={{ px: 4, my: { lg: 0, xs: 6 } }}>
                                                                                <Grid container >
                                                                                    <Grid container item lg={4}>
                                                                                        <FormControl fullWidth >
                                                                                            <TextField
                                                                                                type='text'
                                                                                                label='Ngày bắt đầu nghỉ'
                                                                                                aria-describedby='validation-totaldayoff'
                                                                                                defaultValue={application?.dayoff?.[i].fromdt}
                                                                                                inputProps={
                                                                                                    {
                                                                                                        readOnly: true
                                                                                                    }
                                                                                                }
                                                                                            />
                                                                                        </FormControl>
                                                                                    </Grid>
                                                                                    <Grid container item lg={3} sx={{ ml: 20 }}>

                                                                                        <FormGroup row sx={{ ml: 15 }}>
                                                                                            <FormControlLabel
                                                                                                label='Sáng'
                                                                                                control={
                                                                                                    <Checkbox
                                                                                                        name='morning-checked'
                                                                                                        defaultChecked={application?.dayoff?.[i].session.includes('morning')}
                                                                                                        disabled={true}
                                                                                                    />
                                                                                                }
                                                                                            />
                                                                                            <FormControlLabel
                                                                                                label='Chiều'
                                                                                                control={
                                                                                                    <Checkbox
                                                                                                        name='afternoon-unchecked'
                                                                                                        defaultChecked={application?.dayoff?.[i].session.includes('afternoon')}
                                                                                                        disabled={true}
                                                                                                    />
                                                                                                }
                                                                                            />

                                                                                        </FormGroup>
                                                                                    </Grid>
                                                                                    <Grid container item lg={4}>
                                                                                        <FormControl fullWidth >
                                                                                            <TextField
                                                                                                type='text'
                                                                                                label='Ngày vào làm'
                                                                                                aria-describedby='validation-totaldayoff'
                                                                                                defaultValue={application?.dayoff?.[i].todt}
                                                                                                inputProps={
                                                                                                    {
                                                                                                        readOnly: true
                                                                                                    }
                                                                                                }
                                                                                            />
                                                                                        </FormControl>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </RepeatingContent>
                                                                </Grid>

                                                            </Tag>
                                                        )
                                                    }}
                                                </Repeater>

                                            </RepeaterWrapper>
                                        </Grid>
                                    </Grid>


                                </CardContent>
                            </Card>

                            {employee?.teamcd === 'MNG' && application.status === 'P' &&
                                <Card sx={{ position: 'relative', marginTop: '20px' }}>
                                    <CardContent>
                                        <Grid item xs={12}>
                                            <Button onClick={() => ApproveApplicationForLeave(id)} size='large' type='submit' variant='contained'>
                                                {t('text-sub-application-form')}
                                            </Button>
                                            <Button onClick={() => RejectApplicationForLeave(id)} size='large' color="error" type='submit' sx={{ marginLeft: 5 }} variant='contained'>
                                                {t('text-reject-application-form')}
                                            </Button>
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