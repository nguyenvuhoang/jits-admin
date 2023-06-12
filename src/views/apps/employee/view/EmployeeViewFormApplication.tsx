import Repeater from '@/@core/components/repeater'
import { ApplicationForLeave } from '@/context/types'
import CustomInput from '@/views/forms/pickers/PickersCustomInput'
import { Box, Card, CardContent, CardContentProps, CardHeader, Checkbox, Collapse, Divider, FormControl, FormControlLabel, FormGroup, Grid, GridProps, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import DatePicker from 'react-datepicker'
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

type Props = {
    application: ApplicationForLeave
}

const EmployeeViewFormApplication = ({ application }: Props) => {


    const {
        control,
        formState: { errors }
    } = useForm({})

    console.log(application)


    return (
        <>
            <form>
                <Card>
                    <CardHeader title='Thông tin cơ bản' />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='employeecd'
                                        control={control}
                                        defaultValue={application.employeecd}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label='Mã nhân viên'
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
                                        defaultValue={application.fullname}
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
                                        defaultValue={application.email}
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='departmentcd'
                                        control={control}
                                        defaultValue={application.departmentcd}
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
                                        defaultValue={application.formality}
                                        render={({ field: { value, onChange } }) => (
                                            <RadioGroup
                                                row
                                                aria-label='formality'
                                                value={value}
                                                onChange={onChange}
                                                aria-readonly
                                            >
                                                <FormControlLabel disabled={true} value='annual' control={<Radio />} label='Nghỉ phép năm' name='formality' />
                                                <FormControlLabel disabled={true} value='unpaid' control={<Radio color='secondary' />} label='Nghỉ việc riêng không lương' />
                                                <FormControlLabel disabled={true} value='paid' control={<Radio color='success' />} label='Nghỉ việc riêng có lương' />
                                                <FormControlLabel disabled={true} value='socialinsurance' control={<Radio color='error' />} label='Nghỉ hưởng lương BHXH' />
                                                <FormControlLabel disabled={true} value='home' control={<Radio color='warning' />} label='Làm việc tại nhà' />
                                                <FormControlLabel disabled={true} value='other' control={<Radio color='info' />} label='Nghỉ bù/ Nghỉ khác' />
                                            </RadioGroup>
                                        )}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='reason'
                                        control={control}
                                        defaultValue={application.reason}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Lý do xin phép'
                                                onChange={onChange}
                                                error={Boolean(errors.reason)}
                                                placeholder='Bận việc cá nhân'
                                                aria-describedby='validation-reason'
                                                inputProps={{
                                                    readOnly: true
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='totaldayoff'
                                        control={control}
                                        defaultValue={application.totaldayoff}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='number'
                                                value={value}
                                                label='Tổng số ngày nghỉ'
                                                onChange={onChange}
                                                placeholder='Bận việc cá nhân'
                                                aria-describedby='validation-totaldayoff'
                                                inputProps={{
                                                    readOnly: true
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='replacepersion'
                                        control={control}
                                        defaultValue={application.replacepersion}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Người thay thế (nếu có)'
                                                onChange={onChange}
                                                placeholder='Không ai thay thế công việc'
                                                aria-describedby='validation-replacepersion'
                                                inputProps={{
                                                    readOnly: true
                                                }}
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
                                    <Repeater count={application.dayoff.length}>
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
                                                                                    defaultValue={application.dayoff?.[i].fromdt}
                                                                                    render={({ field: { value, onChange } }) => (
                                                                                        <DatePicker
                                                                                            id={`fromdt.${i}`}
                                                                                            dateFormat='dd/MMM/yyyy'
                                                                                            value={value}
                                                                                            onChange={(e) => onChange(e)}
                                                                                            customInput={
                                                                                                <CustomInput
                                                                                                    label='Ngày bắt đầu nghỉ'
                                                                                                    sx={{
                                                                                                        minWidth: { lg: 450, md: 300, xs: 150 }
                                                                                                    }} 
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            }
                                                                                            disabled={true}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid container item lg={3} sx={{ ml: 10 }}>

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
                                                                                                        defaultChecked={application.dayoff?.[i].session.includes('morning')}
                                                                                                        disabled={true}
                                                                                                    />
                                                                                                }
                                                                                            />
                                                                                            <FormControlLabel
                                                                                                label='Chiều'
                                                                                                control={
                                                                                                    <Checkbox
                                                                                                        name={`afternoon-checked-${i}`}
                                                                                                        defaultChecked={application.dayoff?.[i].session.includes('afternoon')}
                                                                                                        disabled={true}
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
                                                                                    defaultValue={application.dayoff?.[i].todt}
                                                                                    render={({ field: { value, onChange } }) => (
                                                                                        <DatePicker
                                                                                            id={`todt.${i}`}
                                                                                            value={value}
                                                                                            dateFormat='dd/MMM/yyyy'
                                                                                            onChange={(e) => onChange(e)}
                                                                                            customInput={
                                                                                                <CustomInput
                                                                                                    label='Ngày vào làm'
                                                                                                    sx={{
                                                                                                        minWidth: { lg: 450, md: 300, xs: 150 }
                                                                                                    }} 
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            }
                                                                                            disabled={true}
                                                                                        />
                                                                                    )}
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

            </form>

        </>
    )
}


export default EmployeeViewFormApplication