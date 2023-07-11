import { DeviceInputData } from '@/context/types'
import { FetchEmployee } from '@/data/employee'
import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import CustomInput from '@/views/forms/pickers/PickersCustomInput';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next'


const AddDeviceInfoPage = () => {

    const { t } = useTranslation('common')

    const defaultValues = {
        deviceid: '',
        name: '',
        buydate: undefined,
        price: '',
        chip: '',
        ram: '',
        disk: '',
        owner: '',
        type: '',
        size: '',
        resolution: ''
    }
    const {
        control,
        setValue,
        handleSubmit
    } = useForm({
        defaultValues,
        mode: 'onChange'
    })

    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'


    const onSubmit = (data: DeviceInputData) => {
        console.log(data)
        Swal.fire({
            position: 'center',
            icon: 'warning',
            color: 'gold',
            title: 'Hold on!',
            text: 'This feature is not available. Please come back later'
        })
    }

    const { employees } = FetchEmployee({
        teamcd: undefined,
        status: undefined
    })

    const [laptopInfo, setLapTopInfo] = useState(true)
    const [screenInfo, setScreenInfo] = useState(true)

    const handleTypeChange = useCallback((e: SelectChangeEvent) => {
        console.log(e.target.value)
        if (e.target.value === 'Laptop') {
            setLapTopInfo(false)
        }
        if (e.target.value === 'Screen') {
            setScreenInfo(false)
        }
        
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ position: 'relative', marginTop: '20px' }}>
                    <CardHeader title='Thông tin mua hàng' />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='deviceid'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Mã thiết bị'
                                                onChange={onChange}
                                                aria-describedby='validation-deviceid'
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='name'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Tên thiết bị'
                                                onChange={onChange}
                                                aria-describedby='validation-name'
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="buydate"
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <DatePicker
                                                id="buydate"
                                                selected={value}
                                                dateFormat='dd/MMM/yyyy'
                                                popperPlacement={popperPlacement}
                                                onChange={(e: any) => onChange(e)}
                                                customInput={
                                                    <CustomInput
                                                        label='Ngày mua'
                                                        sx={{
                                                            minWidth: { lg: 885, md: 585, xs: 285 }
                                                        }} />
                                                }
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='price'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Giá mua'
                                                onChange={onChange}
                                                aria-describedby='validation-price'
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </CardContent>

                    <CardHeader title='Thông tin trang thiết bị' />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='select-type'>Loại thiết bị</InputLabel>
                                    <Controller
                                        name='type'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                fullWidth
                                                id='select-type'
                                                label='Select Type'
                                                labelId='type-select'
                                                onChange={handleTypeChange}
                                                inputProps={{
                                                    placeholder: 'Select type'
                                                }}
                                            >
                                                <MenuItem value=''>Chọn loại trang thiết bị</MenuItem>
                                                <MenuItem value='Laptop'>Laptop</MenuItem>
                                                <MenuItem value='Screen'>Màn hình</MenuItem>
                                                <MenuItem value='Phone & Ipad'>Phone & Ipad</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='chip'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Bộ vi xử lý'
                                                onChange={onChange}
                                                aria-describedby='validation-chip'
                                                inputProps={{
                                                    readOnly: { laptopInfo }
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='ram'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Dung lượng ram'
                                                onChange={onChange}
                                                aria-describedby='validation-ram'
                                                inputProps={{
                                                    readOnly: { laptopInfo }
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='disk'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Loại ổ cứng và dung lượng'
                                                onChange={onChange}
                                                aria-describedby='validation-disk'
                                                inputProps={{
                                                    readOnly: { laptopInfo }
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='size'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Kích thước'
                                                onChange={onChange}
                                                aria-describedby='validation-size'
                                                inputProps={{
                                                    readOnly: { screenInfo }
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='resolution'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Độ phân giải'
                                                onChange={onChange}
                                                aria-describedby='validation-resolution'
                                                inputProps={{
                                                    readOnly: { screenInfo }
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='select-owner'>Người sử hữu</InputLabel>
                                    <Controller
                                        name='owner'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (

                                            <Select
                                                {...field}
                                                fullWidth
                                                id='select-owner'
                                                label='Chọn người bàn giao'
                                                labelId='owner-select'
                                                inputProps={{
                                                    placeholder: 'Chọn người cần bàn giao',
                                                }}
                                            >
                                                <MenuItem value=''>Chọn người bàn giao</MenuItem>
                                                {employees?.map((employee) => (
                                                    <MenuItem key={employee.employeecd} value={employee.employeecd}>
                                                        {employee.fullname}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='select-office'>Văn phòng</InputLabel>
                                    <Controller
                                        name='type'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                fullWidth
                                                id='select-office'
                                                label='Select office'
                                                labelId='office-select'
                                                inputProps={{
                                                    placeholder: 'Select office'
                                                }}
                                            >
                                                <MenuItem value=''>{t('text-select-office')}</MenuItem>
                                                <MenuItem value='office0101'>Hồ Chí Minh - Nguyễn Hữu Thọ</MenuItem>
                                                <MenuItem value='office0102'>Hồ Chí Minh - Nguyễn Hữu Cảnh</MenuItem>
                                                <MenuItem value='office02'>Hà Nội</MenuItem>
                                            </Select>
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
        </>
    )
}

export default AddDeviceInfoPage