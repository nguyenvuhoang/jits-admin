import CustomerPhone from '@/@core/components/mui/phone'
import PageHeader from '@/@core/components/page-header'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import { Button, Card, CardContent, FormControl, FormHelperText, FormLabel, Grid, MenuItem, RadioGroup, Select, TextField, Typography, FormControlLabel, Radio } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input"

type Props = {}


interface FormInputs {
    fullname: string
    email: string
    phone: string
    departmentcd: string,
    sex: string,
    bio: string
}

const defaultValues = {
    fullname: '',
    phone: '',
    departmentcd: 'SDD',
    sex: 'male',
    bio: ''
}



const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main
}))
const CreateCandidateProfile = (props: Props) => {


    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormInputs>({ defaultValues })


    const onSubmit = (data: FormInputs) => {
        console.log(data)
    }

    return (
        <DatePickerWrapper>
            <Grid container spacing={6} className='match-height'>
                <PageHeader
                    title={
                        <Typography variant='h5'>
                            <LinkStyled href='https://github.com/react-hook-form/react-hook-form' target='_blank'>
                                Tạo hồ sơ ứng viên phỏng vấn
                            </LinkStyled>
                        </Typography>
                    }
                    subtitle={<Typography variant='body2'>Điền thông tin ứng viên. Hệ thống sẽ tự động tạo mã để thí sinh truy cập vào môi trường làm bài thi</Typography>}
                />
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='fullname'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        value={value}
                                                        label='Họ và Tên'
                                                        onChange={onChange}
                                                        placeholder='JITS'
                                                        error={Boolean(errors.fullname)}
                                                        aria-describedby='validation-fullname'
                                                    />
                                                )}
                                            />
                                            {errors.fullname && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-fullname'>
                                                    Vui lòng nhập họ và tên
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='email'
                                                control={control}
                                                rules={{
                                                    required: true
                                                }}

                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        type='email'
                                                        value={value}
                                                        label='Email'
                                                        onChange={onChange}
                                                        error={Boolean(errors.email)}
                                                        placeholder='jits@jits.com.vn'
                                                        aria-describedby='validation-email'
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-email'>
                                                    Vui lòng nhập email
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='phone'
                                                control={control}
                                                rules={{
                                                    required: true,
                                                    validate: (value) => isValidPhoneNumber(value)
                                                }}
                                                render={({ field: { value, onChange } }) => (
                                                    <CustomerPhone value={value} onChange={onChange} />
                                                )}
                                            />
                                            {errors.phone && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-phone'>
                                                    Vui lòng nhập số điện thoại
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='departmentcd'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <Select
                                                        fullWidth
                                                        value={value}
                                                        id='select-deparmentcd'
                                                        label='Select Department'
                                                        labelId='deparmentcd-error'
                                                        onChange={onChange}
                                                        aria-describedby='deparmentcd-error'
                                                    >
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

                                    <Grid item xs={12}>
                                        <FormControl error={Boolean(errors.sex)}>
                                            <FormLabel>Giới tính</FormLabel>
                                            <Controller
                                                name='sex'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <RadioGroup row {...field} aria-label='sex' name='validation-sex'>
                                                        <FormControlLabel
                                                            value='female'
                                                            label='Nữ'
                                                            sx={errors.sex ? { color: 'error.main' } : null}
                                                            control={<Radio sx={errors.sex ? { color: 'error.main' } : null} />}
                                                        />
                                                        <FormControlLabel
                                                            value='male'
                                                            label='Nam'
                                                            sx={errors.sex ? { color: 'error.main' } : null}
                                                            control={<Radio sx={errors.sex ? { color: 'error.main' } : null} />}
                                                        />
                                                        <FormControlLabel
                                                            value='lgbt'
                                                            label='LGBT'
                                                            sx={errors.sex ? { color: 'error.main' } : null}
                                                            control={<Radio sx={errors.sex ? { color: 'error.main' } : null} />}
                                                        />
                                                    </RadioGroup>
                                                )}
                                            />
                                            {errors.sex && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-sex'>
                                                    Vui lòng chọn giới tính
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='bio'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <TextField
                                                        rows={4}
                                                        multiline
                                                        {...field}
                                                        label='Giới thiệu ngắn về thí sinh'
                                                        error={Boolean(errors.bio)}
                                                        aria-describedby='validation-bio'
                                                    />
                                                )}
                                            />
                                            {errors.bio && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-bio'>
                                                    Vui lòng ghi giới thiệu ngắn về thí sinh
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button size='large' type='submit' variant='contained'>
                                            Tiến hành tạo hồ sơ
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DatePickerWrapper>
    )
}

export default CreateCandidateProfile