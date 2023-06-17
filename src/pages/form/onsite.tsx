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
import { Button, Card, CardContent, CardContentProps, CardHeader, Checkbox, Table, TableHead, TableRow, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, TableBody, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, TableContainer, Paper, TableCell, OutlinedInput, Input } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ChangeEvent, useEffect, useState, SyntheticEvent } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import Swal from "sweetalert2";
import writtenNumber from '@/@core/utils/writtenNumber'



const OnsitePage = () => {

    writtenNumber.defaults.lang = 'vn';

    const { employee } = useAuth()

    const defaultValues = {
        employeecd: employee?.employeecd,
        fullname: employee?.fullname,
        email: employee?.email,
        onsiteplace: '',
        departmentcd: 'SDD',
        fromdt: undefined,
        todt: undefined,
        otherplace: '',
        purpose: '',
        otherpurpose: '',
        project: '',
        support1: '',
        support2: '',
        support3: '',
        proposal1: '',
        proposal2: '',
        proposal3: '',
        note: '',
        onsitefee: undefined,
        hotelfee: undefined,
        transport: undefined,
        customerfee: undefined,
        other: undefined
    }

    const {
        control,
        handleSubmit,
        setValue,
        watch,
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

    const { isLoading, mutate: SubmitApplicationForLeave } = useSubmitApplicationForLeave()

    const onSubmit = (data: OnsiteInputs) => {
        console.log(data)
        Swal.fire({
            title: `Hello ${data.fullname}`,
            text: 'Ứng dụng còn đang trong quá trình phát triển',
            imageUrl: '/images/misc/commingsoon.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
        // SubmitApplicationForLeave(submitData)
    }
    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

    const deleteForm = (e: SyntheticEvent) => {
        e.preventDefault()

        // @ts-ignore
        e.target.closest('.repeater-wrapper').remove()
    }

    const unit = watch('onsitefee.unit');
    const quantity = watch('onsitefee.quantity');
    const onsitefeeamount = (unit && quantity) ? unit * quantity : 0;

    const unithotel = watch('hotelfee.unit');
    const quantityhotel = watch('hotelfee.quantity');
    const hotelfeeamount = (unithotel && quantityhotel) ? unithotel * quantityhotel : 0;


    const unittransport = watch('transport.unit');
    const quantitytransport = watch('transport.quantity');
    const transportamount = (unittransport && quantitytransport) ? unittransport * quantitytransport : 0;

    const unitcustomerfee = watch('customerfee.unit');
    const quantitycustomerfee = watch('customerfee.quantity');
    const customerfeeamount = (unitcustomerfee && quantitycustomerfee) ? unitcustomerfee * quantitycustomerfee : 0

    const unitother = watch('other.unit');
    const quantityother = watch('other.quantity');
    const otheramount = (unitother && quantityother) ? unitother * quantityother : 0

    const [total, setTotal] = useState<number>(0)
    
    useEffect(() => {
        setValue('onsitefee.amount', onsitefeeamount);
    }, [unit, quantity, setValue, onsitefeeamount,total]);

    useEffect(() => {
        setValue('hotelfee.amount', hotelfeeamount);
    }, [unithotel, quantityhotel, setValue, hotelfeeamount]);

    useEffect(() => {
        setValue('transport.amount', transportamount);
    }, [unittransport, quantitytransport, setValue, transportamount]);

    useEffect(() => {
        setValue('customerfee.amount', customerfeeamount);
    }, [unitcustomerfee, quantitycustomerfee, setValue, customerfeeamount]);

    useEffect(() => {
        setValue('other.amount', otheramount);
    }, [unitother, quantityother, setValue, otheramount]);

    useEffect(() => {
        const totalAmount =
        onsitefeeamount +
        hotelfeeamount +
        transportamount +
        customerfeeamount +
        otheramount;
        console.log(totalAmount)
        setTotal(totalAmount);
    }, [onsitefeeamount, hotelfeeamount, transportamount, customerfeeamount, otheramount]);



    if (isLoading) return <Spinner />


    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - Onsite`}</title>
            </Head>
            <DatePickerWrapper>
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
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth >
                                                <Controller
                                                    control={control}
                                                    name="fromdt"
                                                    rules={{ required: true }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <DatePicker
                                                            id="fromdt"
                                                            selected={value}
                                                            dateFormat='dd/MMM/yyyy'
                                                            popperPlacement={popperPlacement}
                                                            onChange={(e) => onChange(e)}
                                                            customInput={
                                                                <CustomInput
                                                                    label='Ngày bắt đầu công tác'
                                                                    sx={{
                                                                        minWidth: { lg: 885, md: 585, xs: 285 }
                                                                    }} />
                                                            }
                                                        />
                                                    )}
                                                />
                                                {errors.fromdt && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-fromdt'>
                                                        From date is required
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth >
                                                <Controller
                                                    control={control}
                                                    name="todt"
                                                    rules={{ required: true }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <DatePicker
                                                            id="todt"
                                                            selected={value}
                                                            dateFormat='dd/MMM/yyyy'
                                                            popperPlacement={popperPlacement}
                                                            onChange={(e) => onChange(e)}
                                                            customInput={
                                                                <CustomInput
                                                                    label='Ngày về'
                                                                    sx={{
                                                                        minWidth: { lg: 885, md: 585, xs: 285 }
                                                                    }} />
                                                            }
                                                        />
                                                    )}
                                                />
                                                {errors.todt && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-todt'>
                                                        To date is required
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id='select-purpose'>Chọn mục đích công tác</InputLabel>
                                                <Controller
                                                    name='purpose'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            fullWidth
                                                            id='select-purpose'
                                                            labelId='purpose-select'
                                                        >
                                                            <MenuItem value='IMP'>Triển khai dự án</MenuItem>
                                                            <MenuItem value='SUP'>Support khách hàng</MenuItem>
                                                            <MenuItem value='DEM'>Demo sản phẩm</MenuItem>
                                                            <MenuItem value='MAR'>Marketing</MenuItem>
                                                            <MenuItem value='OTH'>Khác</MenuItem>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.purpose && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='purpose-error'>
                                                        {errors.purpose.message}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name='otherpurpose'
                                                    control={control}
                                                    rules={{ required: false }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <TextField
                                                            type='text'
                                                            value={value}
                                                            label='Khác (nếu có)'
                                                            onChange={onChange}
                                                            placeholder='Hỗ trợ đồng đội'
                                                            aria-describedby='validation-otherpurpose'
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name='project'
                                                    control={control}
                                                    rules={{ required: false }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <TextField
                                                            type='text'
                                                            value={value}
                                                            label='Các dự án thực hiện'
                                                            onChange={onChange}
                                                            placeholder='SBI Lyhour'
                                                            aria-describedby='validation-project'
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id='select-request-support-1'>Yêu cầu hỗ trợ 1</InputLabel>
                                                <Controller
                                                    name='support1'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            fullWidth
                                                            id='select-request-support-1'
                                                            labelId='support1-select'
                                                        >
                                                            <MenuItem value='HOTEL'>Đặt khách sạn</MenuItem>
                                                            <MenuItem value='PLANE'>Đặt vé máy bay</MenuItem>
                                                            <MenuItem value='BUSCA'>Đặt vé tàu/xe</MenuItem>
                                                            <MenuItem value='GIFTS'>Mua quà biếú</MenuItem>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.support1 && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='support1-error'>
                                                        {errors.support1.message}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id='select-request-support-2'>Yêu cầu hỗ trợ 2</InputLabel>
                                                <Controller
                                                    name='support2'
                                                    control={control}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            fullWidth
                                                            id='select-request-support-2'
                                                            labelId='support2select'
                                                        >
                                                            <MenuItem value='HOTEL'>Đặt khách sạn</MenuItem>
                                                            <MenuItem value='PLANE'>Đặt vé máy bay</MenuItem>
                                                            <MenuItem value='BUSCA'>Đặt vé tàu/xe</MenuItem>
                                                            <MenuItem value='GIFTS'>Mua quà biếú</MenuItem>
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id='select-request-support-3'>Yêu cầu hỗ trợ 3</InputLabel>
                                                <Controller
                                                    name='support3'
                                                    control={control}
                                                    rules={{ required: false }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            fullWidth
                                                            id='select-request-support-3'
                                                            labelId='support2select'
                                                        >
                                                            <MenuItem value='HOTEL'>Đặt khách sạn</MenuItem>
                                                            <MenuItem value='PLANE'>Đặt vé máy bay</MenuItem>
                                                            <MenuItem value='BUSCA'>Đặt vé tàu/xe</MenuItem>
                                                            <MenuItem value='GIFTS'>Mua quà biếú</MenuItem>
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name='routego'

                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <TextField
                                                            type='text'
                                                            value={value}
                                                            label='Lộ trình chiều đi'
                                                            onChange={onChange}
                                                            placeholder={`${new Date()} - TPHCM - {Nơi đến}`}
                                                            aria-describedby='validation-routego'
                                                        />
                                                    )}
                                                />
                                                {errors.routego && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='routego-error'>
                                                        {errors.routego.message}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name='routeback'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <TextField
                                                            type='text'
                                                            value={value}
                                                            label='Lộ trình chiều về'
                                                            onChange={onChange}
                                                            placeholder={`${new Date()} - {Nơi đi} - TPHCM`}
                                                            aria-describedby='validation-routeback'
                                                        />
                                                    )}
                                                />
                                                {errors.routeback && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='routeback-error'>
                                                        {errors.routeback.message}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <InputLabel id='choose-proposal'>Đề xuất</InputLabel>
                                            <FormControl fullWidth>
                                                <FormGroup row >

                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='proposal1'
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Đặt vé khứ hồi"}
                                                                    control={<Checkbox {...field} name="round-trip" color={"success"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.proposal1 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='proposal1-error'>
                                                            {errors.proposal1.message}
                                                        </FormHelperText>
                                                    )}
                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='proposal2'
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Đặt vé chiều đi, chiều về riêng"}
                                                                    control={<Checkbox {...field} name="diff-go-back" color={"primary"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.proposal2 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='proposal2-error'>
                                                            {errors.proposal2.message}
                                                        </FormHelperText>
                                                    )}
                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='proposal3'
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Đặt vé một chiều"}
                                                                    control={<Checkbox {...field} name="one-way" color={"info"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.proposal3 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='proposal3-error'>
                                                            {errors.proposal3.message}
                                                        </FormHelperText>
                                                    )}


                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name='note'
                                                    control={control}
                                                    rules={{ required: false }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <TextField
                                                            type='text'
                                                            value={value}
                                                            label='Lưu ý'
                                                            onChange={onChange}
                                                            placeholder={`<Thời gian bay đề xuất>`}
                                                            aria-describedby='validation-note'
                                                        />
                                                    )}
                                                />
                                                {errors.note && (
                                                    <FormHelperText sx={{ color: 'error.main' }} id='note-error'>
                                                        {errors.note.message}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <InputLabel id='choose-goto-airport'>Di chuyển ra sân bay</InputLabel>
                                            <FormControl fullWidth>
                                                <FormGroup row >
                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='airport1'
                                                            control={control}
                                                            rules={{ required: false }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Khoán CP"}
                                                                    control={<Checkbox {...field} name="CP" color={"success"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.airport1 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='airport1-error'>
                                                            {errors.airport1.message}
                                                        </FormHelperText>
                                                    )}
                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='airport2'
                                                            control={control}
                                                            rules={{ required: false }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Thẻ taxi"}
                                                                    control={<Checkbox {...field} name="taxi" color={"primary"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.airport2 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='airport2-error'>
                                                            {errors.airport2.message}
                                                        </FormHelperText>
                                                    )}
                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='airport3'
                                                            control={control}
                                                            rules={{ required: false }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Grab"}
                                                                    control={<Checkbox {...field} name="grab" color={"info"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.proposal3 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='proposal3-error'>
                                                            {errors.proposal3.message}
                                                        </FormHelperText>
                                                    )}
                                                    <Grid item xs={12} sm={3} >
                                                        <Controller
                                                            name='airport4'
                                                            control={control}
                                                            rules={{ required: false }}
                                                            render={({ field }) => (
                                                                <FormControlLabel label={"Phương tiên khác"}
                                                                    control={<Checkbox {...field} name="other" color={"warning"} />} />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {errors.airport4 && (
                                                        <FormHelperText sx={{ color: 'error.main' }} id='airport4-error'>
                                                            {errors.airport4.message}
                                                        </FormHelperText>
                                                    )}
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card sx={{ position: 'relative', marginTop: '20px' }}>
                                <CardHeader title='Thông tin chi phí - tạm ứng' />

                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sm={12}>
                                            <TableContainer component={Paper}>
                                                <InputLabel id='cost'>Dự trù chi phí công tác</InputLabel>
                                                <Table sx={{ minWidth: 700 }} aria-label='cost' >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell> STT </TableCell>
                                                            <TableCell> Nội dung </TableCell>
                                                            <TableCell align='center' colSpan={3}> Chi phí </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell>Số lượng</TableCell>
                                                            <TableCell>Định mức</TableCell>
                                                            <TableCell>Thành tiền</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        <TableRow>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="onsitefee.id"
                                                                        control={control}
                                                                        defaultValue="1"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="onsitefee.item"
                                                                        control={control}
                                                                        defaultValue="Công tác phí"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="onsitefee.quantity"
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-quantity'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name='onsitefee.unit'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <>
                                                                                <Input
                                                                                    type='number'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    placeholder={`0`}
                                                                                    aria-describedby='validation-unit'
                                                                                />
                                                                            </>
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='onsitefee.amount'
                                                                        control={control}
                                                                        defaultValue={onsitefeeamount}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-amount'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>


                                                        <TableRow>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="hotelfee.id"
                                                                        control={control}
                                                                        defaultValue="2"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="hotelfee.item"
                                                                        control={control}
                                                                        defaultValue="Tiền khách sạn"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="hotelfee.quantity"
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-quantity'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name='hotelfee.unit'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <>
                                                                                <Input
                                                                                    type='number'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    placeholder={`0`}
                                                                                    aria-describedby='validation-unit'
                                                                                />
                                                                            </>
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='hotelfee.amount'
                                                                        control={control}
                                                                        defaultValue={hotelfeeamount}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-amount'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>


                                                        <TableRow>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="transport.id"
                                                                        control={control}
                                                                        defaultValue="3"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="transport.item"
                                                                        control={control}
                                                                        defaultValue="CP di chuyển"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="transport.quantity"
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-quantity'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name='transport.unit'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <>
                                                                                <Input
                                                                                    type='number'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    placeholder={`0`}
                                                                                    aria-describedby='validation-unit'
                                                                                />
                                                                            </>
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='transport.amount'
                                                                        control={control}
                                                                        defaultValue={transportamount}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-amount'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>



                                                        <TableRow>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="customerfee.id"
                                                                        control={control}
                                                                        defaultValue="4"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="customerfee.item"
                                                                        control={control}
                                                                        defaultValue="Tiếp khách / Quà biếu"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="customerfee.quantity"
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-quantity'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name='customerfee.unit'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <>
                                                                                <Input
                                                                                    type='number'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    placeholder={`0`}
                                                                                    aria-describedby='validation-unit'
                                                                                />
                                                                            </>
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='customerfee.amount'
                                                                        control={control}
                                                                        defaultValue={customerfeeamount}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-amount'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>



                                                        <TableRow>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="other.id"
                                                                        control={control}
                                                                        defaultValue="5"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="other.item"
                                                                        control={control}
                                                                        defaultValue="CP khác"
                                                                        render={({ field }) => (
                                                                            <Input type='text' {...field} disableUnderline={true} disabled={true} />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name="other.quantity"
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-quantity'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl >
                                                                    <Controller
                                                                        name='other.unit'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <>
                                                                                <Input
                                                                                    type='number'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    placeholder={`0`}
                                                                                    aria-describedby='validation-unit'
                                                                                />
                                                                            </>
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='other.amount'
                                                                        control={control}
                                                                        defaultValue={otheramount}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-amount'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell rowSpan={4} />
                                                            <TableCell colSpan={3}>Tổng cộng</TableCell>
                                                            <TableCell colSpan={2} >{total}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell rowSpan={4} />
                                                            <TableCell colSpan={3}>Bằng chữ: {writtenNumber(total,{lang: 'vi'})}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                                            <TableContainer component={Paper}>
                                                <InputLabel id='advance'>Đề nghị tạm ứng</InputLabel>
                                                <Table sx={{ minWidth: 700 }} aria-label='advance' >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell> Loại tiền </TableCell>
                                                            <TableCell> Số tiền </TableCell>
                                                            <TableCell> Tỷ giá (Vietcombank) </TableCell>
                                                            <TableCell> Ghi chú </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                <FormControl variant='standard'>
                                                                    <InputLabel id='select-advance-currency'>Chọn loại tiền</InputLabel>
                                                                    <Controller
                                                                        name='advance.currency'
                                                                        control={control}
                                                                        rules={{ required: true }}
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                {...field}
                                                                                fullWidth
                                                                                id='select-advance-currency'
                                                                                label='Chọn loại tiền'
                                                                            >
                                                                                <MenuItem value='USD'>USD</MenuItem>
                                                                                <MenuItem value='VND'>VND</MenuItem>
                                                                            </Select>
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='advance.amount'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-amount'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl>
                                                                    <Controller
                                                                        name='advance.exchangereate'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='number'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                placeholder={`0`}
                                                                                aria-describedby='validation-exchangereate'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl fullWidth>
                                                                    <Controller
                                                                        name='advance.description'
                                                                        control={control}
                                                                        rules={{ required: false }}
                                                                        render={({ field: { value, onChange } }) => (
                                                                            <Input
                                                                                type='text'
                                                                                value={value}
                                                                                onChange={onChange}
                                                                                aria-describedby='validation-description'
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
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
            </DatePickerWrapper>
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