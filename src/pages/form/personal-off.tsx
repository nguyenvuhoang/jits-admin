import Icon from '@/@core/components/icon'
import PageHeader from '@/@core/components/page-header'
import Repeater from '@/@core/components/repeater'
import Spinner from '@/@core/components/spinner'
import { Employeeinfo } from '@/context/types'
import { useSubmitApplicationForLeave } from '@/data/employee'
import { useAuth } from '@/hooks/useAuth'
import { ApplicationLeaveInputs } from '@/types/form/applicationForLetterType'
import CustomInput from '@/views/forms/pickers/PickersCustomInput'
import { Box, Button, Card, CardContent, CardContentProps, CardHeader, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, GridProps, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'




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


const PersionalOff = () => {

    const { employee } = useAuth()

    const defaultValues = {
        employeecd: employee?.employeecd,
        fullname: employee?.fullname,
        email: employee?.email,
        departmentcd: 'SDD',
        reason: '',
        totaldayoff: 0,
        replacepersion: '',
        formality: '',
        dayoff: [
            {
                fromdt: undefined,
                todt: undefined,
                session: ['', '']
            }
        ]
    }

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ApplicationLeaveInputs>({
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

    const onSubmit = (data: ApplicationLeaveInputs) => {
        const submitData = {
            employeecd: data.employeecd,
            fullname: data.fullname,
            email: data.email,
            departmentcd: data.departmentcd,
            formality: data.formality,
            reason: data.reason,
            totaldayoff: parseInt(data.totaldayoff.toString(), 10),
            replacepersion: data.replacepersion,
            dayoff: data.dayoff
        }
        SubmitApplicationForLeave(submitData)
    }

    const [countDateOff, setCountDateOff] = useState<number>(1)
    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

    if (isLoading) return <Spinner />

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <PageHeader
                    title={
                        <Typography variant='h4'>
                            Đơn xin nghỉ phép
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
                                            <Controller
                                                name='formality'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value } }) => (
                                                    <RadioGroup row aria-label='formality' value={value} onChange={handleChangeFormality} >
                                                        <FormControlLabel value='annual' control={<Radio />} label='Nghỉ phép năm' name='formality' />
                                                        <FormControlLabel value='unpaid' control={<Radio color='secondary' />} label='Nghỉ việc riêng không lương' />
                                                        <FormControlLabel value='paid' control={<Radio color='success' />} label='Nghỉ việc riêng có lương' />
                                                        <FormControlLabel value='socialinsurance' control={<Radio color='error' />} label='Nghỉ hưởng lương BHXH' />
                                                        <FormControlLabel value='home' control={<Radio color='warning' />} label='Làm việc tại nhà' />
                                                        <FormControlLabel value='other' control={<Radio color='info' />} label='Nghỉ bù/ Nghỉ khác' />
                                                    </RadioGroup>
                                                )}
                                            />
                                            {errors.departmentcd && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='deparmentcd-error'>
                                                    {errors.departmentcd.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='reason'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        type='text'
                                                        value={value}
                                                        label='Lý do sinh phép'
                                                        onChange={onChange}
                                                        error={Boolean(errors.reason)}
                                                        placeholder='Bận việc cá nhân'
                                                        aria-describedby='validation-reason'
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-reason'>
                                                    Reason is required
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='totaldayoff'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        type='number'
                                                        value={value}
                                                        label='Tổng số ngày nghỉ'
                                                        onChange={onChange}
                                                        error={Boolean(errors.reason)}
                                                        placeholder='Bận việc cá nhân'
                                                        aria-describedby='validation-totaldayoff'
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-totaldayoff'>
                                                    Total day off is required
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='replacepersion'
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        type='text'
                                                        value={value}
                                                        label='Người thay thế (nếu có)'
                                                        onChange={onChange}
                                                        placeholder='JITS'
                                                        aria-describedby='validation-replacepersion'
                                                    />
                                                )}
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
                                                                                        <Controller
                                                                                            control={control}
                                                                                            name={`dayoff.${i}.fromdt` as const}
                                                                                            rules={{ required: true }}
                                                                                            render={({ field: { value, onChange } }) => (
                                                                                                <DatePicker
                                                                                                    id={`fromdt.${i}`}
                                                                                                    selected={value}
                                                                                                    dateFormat='dd/MMM/yyyy'
                                                                                                    popperPlacement={popperPlacement}
                                                                                                    onChange={(e) => onChange(e)}
                                                                                                    customInput={
                                                                                                        <CustomInput
                                                                                                            label='Ngày bắt đầu nghỉ'
                                                                                                            sx={{
                                                                                                                minWidth: { lg: 450, md: 300, xs: 150 }
                                                                                                            }} />
                                                                                                    }
                                                                                                />
                                                                                            )}
                                                                                        />
                                                                                        {errors.dayoff?.[`${i}`]?.fromdt && (
                                                                                            <FormHelperText sx={{ color: 'error.main' }} id='validation-fromdt'>
                                                                                                From date is required
                                                                                            </FormHelperText>
                                                                                        )}
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid container item lg={3} sx={{ ml: 20 }}>

                                                                                    <Controller
                                                                                        control={control}
                                                                                        name={`dayoff.${i}.session` as const}
                                                                                        render={({ field: { value, onChange } }) => {
                                                                                            return (
                                                                                                <FormGroup row sx={{ ml: 15 }}>
                                                                                                    <FormControlLabel
                                                                                                        label='Sáng'
                                                                                                        control={
                                                                                                            <Checkbox
                                                                                                                name={`morning-checked-${i}`}
                                                                                                                checked={value?.includes('morning')}
                                                                                                                onChange={(e) => {
                                                                                                                    const checked = e.target.checked;
                                                                                                                    const updatedValue = checked ? [...value, 'morning'] : value.filter(v => v !== 'morning');
                                                                                                                    onChange(updatedValue);
                                                                                                                }}
                                                                                                            />
                                                                                                        }
                                                                                                    />
                                                                                                    <FormControlLabel
                                                                                                        label='Chiều'
                                                                                                        control={
                                                                                                            <Checkbox
                                                                                                                name={`afternoon-checked-${i}`}
                                                                                                                checked={value?.includes('afternoon')}
                                                                                                                onChange={(e) => {
                                                                                                                    const checked = e.target.checked;
                                                                                                                    const updatedValue = checked ? [...value, 'afternoon'] : value.filter(v => v !== 'afternoon');
                                                                                                                    onChange(updatedValue);
                                                                                                                }}
                                                                                                            />
                                                                                                        }
                                                                                                    />

                                                                                                </FormGroup>
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid container item lg={4}>
                                                                                    <FormControl fullWidth >
                                                                                        <Controller
                                                                                            control={control}
                                                                                            name={`dayoff.${i}.todt` as const}
                                                                                            rules={{ required: true }}
                                                                                            render={({ field: { value, onChange } }) => (
                                                                                                <DatePicker
                                                                                                    id={`todt.${i}`}
                                                                                                    selected={value}
                                                                                                    dateFormat='dd/MMM/yyyy'
                                                                                                    popperPlacement={popperPlacement}
                                                                                                    onChange={(e) => onChange(e)}
                                                                                                    customInput={
                                                                                                        <CustomInput
                                                                                                            label='Ngày vào làm'
                                                                                                            sx={{
                                                                                                                minWidth: { lg: 450, md: 300, xs: 150 }
                                                                                                            }} />
                                                                                                    }
                                                                                                />
                                                                                            )}
                                                                                        />
                                                                                        {errors.dayoff?.[`${i}`]?.todt && (
                                                                                            <FormHelperText sx={{ color: 'error.main' }} id='validation-fromdt'>
                                                                                                To date is required
                                                                                            </FormHelperText>
                                                                                        )}
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
                                            <Grid container sx={{ mt: 4.75 }}>
                                                <Grid item xs={12} sx={{ px: 0 }}>
                                                    <Button
                                                        size='small'
                                                        variant='contained'
                                                        startIcon={<Icon icon='mdi:plus' fontSize={20} />}
                                                        onClick={() => setCountDateOff(countDateOff + 1)}
                                                    >
                                                        Thêm ngày nghỉ
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </RepeaterWrapper>
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

export default PersionalOff