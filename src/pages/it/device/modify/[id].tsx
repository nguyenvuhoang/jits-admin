import PageHeader from '@/@core/components/page-header'
import { Employeeinfo } from '@/context/types'
import { FetchDeviceById } from '@/data/employee'
import { useAuth } from '@/hooks/useAuth'
import DeviceInfoPage from '@/views/pages/device/DeviceInfoPage'
import { Card, CardContent, CardHeader, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Spinner from '@/@core/components/spinner'


const DeviceModifyPage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { employee } = useAuth()

    const defaultValues = {
        employeecd: employee?.employeecd,
        fullname: employee?.fullname,
        email: employee?.email,
        departmentcd: 'SDD',
    }

    const {
        control,
        setValue
    } = useForm({
        defaultValues,
        mode: 'onChange'
    })


    const initData = (employeeInit: Employeeinfo | null) => {
        setValue('employeecd', employeeInit?.employeecd || '')
        setValue('fullname', employeeInit?.fullname || '')
        setValue('email', employeeInit?.email || '')
        setValue('departmentcd', employeeInit?.deparmentcd || '')
    }

    useEffect(() => {
        initData(employee)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employee]);

    const { device, isLoading } = FetchDeviceById(id)

    if (isLoading) return <Spinner />

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <PageHeader
                    title={
                        <Typography variant='h4'>
                            Phiếu điều chỉnh thông tin trang thiết bị
                        </Typography>
                    }
                    subtitle={
                        <>
                            <Typography variant='body2'>Vui lòng điền đầy đủ thông tin bên dưới.</Typography>
                            <Typography variant='body2' sx={{ color: '#3de13d' }}>Lưu ý: Thông tin này chỉ có HR mới được phép điều chỉnh. Bạn có chắc mình là HR?</Typography>
                        </>
                    }

                />
                <Grid item xs={12}>
                    <form>
                        <Card>
                            <CardHeader title='Thông tin người điều chỉnh' />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='employeecd'
                                                control={control}
                                                defaultValue={employee?.employeecd || ''}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label='Mã nhân viên'
                                                        placeholder='JITS'
                                                        aria-describedby='validation-employeecd'
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='fullname'
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={employee?.fullname || ''}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label='Họ Tên'
                                                        placeholder='JITS'
                                                        aria-describedby='validation-fullname'
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='email'
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={employee?.email || ''}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        type='email'
                                                        label='Email'
                                                        placeholder='jits@jits.com.vn'
                                                        aria-describedby='validation-email'
                                                        inputProps={{
                                                            readOnly: true
                                                        }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='departmentcd'
                                                control={control}
                                                defaultValue=''
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
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
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>
                    </form>

                    <DeviceInfoPage device={device} />


                </Grid>

            </Grid>
        </>
    )
}
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const { id } = params!
    try {
        return {
            props: {
                id,
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
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
export default DeviceModifyPage