import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// ** MUI Components
import Head from 'next/head';
import themeConfig from '@/configs/themeConfig';
import Icon from '@/@core/components/icon'
import PageHeader from '@/@core/components/page-header'
import Repeater from '@/@core/components/repeater'
import Spinner from '@/@core/components/spinner'
import { Employeeinfo } from '@/context/types'
import { useSubmitApplicationForLeave } from '@/data/employee'
import { useAuth } from '@/hooks/useAuth'
import { OnsiteInputs } from '@/types/form/onsiteType'
import CustomInput from '@/views/forms/pickers/PickersCustomInput'
import { Box, Button, Card, CardContent, CardContentProps, CardHeader, Checkbox, IconButton, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, GridProps, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState, SyntheticEvent } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

type Props = {}


const OnsitePage = (props: Props) => {


    const { employee } = useAuth()

    const defaultValues = {

        employeecd: employee?.employeecd,
        fullname: employee?.fullname,
        email: employee?.email,
        onsiteplace: '',
        departmentcd: 'SDD',
        reason: '',
        totaldayoff: 0,
        replacepersion: '',
        formality: '',
        fromdt: undefined,
        otherplace: ''
    }

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<OnsiteInputs>({
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

    const handleChangeFormality = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('formality', (event.target as HTMLInputElement).value);
    }

    const { isLoading, mutate: SubmitApplicationForLeave } = useSubmitApplicationForLeave()

    const onSubmit = (data: OnsiteInputs) => {
        const submitData = {
            employeecd: data.employeecd,
            fullname: data.fullname,
            email: data.email,
            departmentcd: data.departmentcd,
            formality: data.formality,
            reason: data.reason,
            totaldayoff: parseInt(data.totaldayoff.toString(), 10),
            replacepersion: data.replacepersion,
        }
        // SubmitApplicationForLeave(submitData)
    }

    const [countDateOff, setCountDateOff] = useState<number>(1)
    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'


    const HandleRemoveForm = (countForm: number) => {
        setCountDateOff(countForm - 1)
        deleteForm
    }


    const deleteForm = (e: SyntheticEvent) => {
        e.preventDefault()

        // @ts-ignore
        e.target.closest('.repeater-wrapper').remove()
    }

    if (isLoading) return <Spinner />


    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - Onsite`}</title>
            </Head>
            <Grid container spacing={6} className='match-height'>
                <PageHeader
                    title={
                        <Typography variant='h4'>
                            Đăng ký công tác - Kiêm tạm ứng
                        </Typography>
                    }
                    subtitle={<Typography variant='body2'>Vui lòng điền đầy đủ thông tin bên dưới</Typography>}
                />
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <CardHeader title='Thông tin cơ bản' />
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
                                                        error={Boolean(errors.employeecd)}
                                                        aria-describedby='validation-employeecd'
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.employeecd && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-employeecd'>
                                                    Employee code is required
                                                </FormHelperText>
                                            )}
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
                                            {errors.fullname && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-fullname'>
                                                    Fullname is required
                                                </FormHelperText>
                                            )}
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
                                                        error={Boolean(errors.email)}
                                                        placeholder='jits@jits.com.vn'
                                                        aria-describedby='validation-email'
                                                        inputProps={{
                                                            readOnly: true
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-email'>
                                                    Email is required
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id='select-deparmentcd'>Phòng ban</InputLabel>
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
                                            {errors.departmentcd && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='deparmentcd-error'>
                                                    {errors.departmentcd.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>

                        <Card sx={{ position: 'relative', marginTop: '20px' }}>
                            <CardHeader title='Thông tin công tác' />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id='select-onsiteplace'>Chọn địa điểm công tác</InputLabel>
                                            <Controller
                                                name='onsiteplace'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        fullWidth
                                                        id='select-onsiteplace'
                                                        labelId='onsiteplace-select'
                                                    >
                                                        <MenuItem value='CAM'>Cambodia</MenuItem>
                                                        <MenuItem value='LAO'>Lao</MenuItem>
                                                        <MenuItem value='THA'>Thailand</MenuItem>
                                                        <MenuItem value='MMR'>Myanmar</MenuItem>
                                                        <MenuItem value='HAN'>Hà Nội</MenuItem>
                                                        <MenuItem value='HCM'>Hồ Chí Minh</MenuItem>
                                                    </Select>
                                                )}
                                            />
                                            {errors.onsiteplace && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='onsiteplace-error'>
                                                    {errors.onsiteplace.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>                                        

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='otherplace'
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        type='text'
                                                        value={value}
                                                        label='Khác (nếu có)'
                                                        onChange={onChange}
                                                        placeholder='JITS'
                                                        aria-describedby='validation-otherplace'
                                                    />
                                                )}
                                            />
                                        </FormControl>

                                    </Grid>
                                </Grid>


                            </CardContent>
                        </Card>

                        <Card sx={{ position: 'relative', marginTop: '20px' }}>
                            <CardContent>
                                <Grid item xs={12}>
                                    <Button size='large' type='submit' variant='contained'>
                                        Submit
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>

                    </form>
                </Grid>

            </Grid>
        </>
    )
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        return {
            props: {
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
export default OnsitePage