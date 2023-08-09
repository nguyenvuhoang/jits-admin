import { DeviceInfo } from '@/context/types'
import { FetchEmployee, useSubmitModifyDevice } from '@/data/employee'
import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    device: DeviceInfo | undefined
}

const DeviceInfoPage = ({ device }: Props) => {

    const defaultValues = {
        deviceid: device?.deviceid,
        name: device?.name,
        buydate: device?.buydate,
        price: device?.price,
        chip: device?.chip,
        ram: device?.ram,
        disk: device?.disk,
        owner: device?.owner,
        whoreceived: '',
        historyfix: '',
    }
    const {
        control,
        handleSubmit
    } = useForm({   
        defaultValues,
        mode: 'onChange'
    })
    const {mutate: SubmitModifyDevice} = useSubmitModifyDevice()

    const onSubmit = (data: any) => {
        data.owner = data.whoreceived
        data.whoreceived = device?.owner
        SubmitModifyDevice(data)
    }

    const { employees } = FetchEmployee({
        teamcd: undefined,
        status: undefined
    })

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
                                        defaultValue={device?.deviceid || ''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Mã thiết bị'
                                                onChange={onChange}
                                                aria-describedby='validation-deviceid'
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
                                        name='name'
                                        control={control}
                                        defaultValue={device?.name || ''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Tên thiết bị'
                                                onChange={onChange}
                                                aria-describedby='validation-name'
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
                                        name='buydate'
                                        control={control}
                                        defaultValue={device?.buydate || ''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Ngày mua'
                                                onChange={onChange}
                                                aria-describedby='validation-buydate'
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
                </Card>


                <Card sx={{ position: 'relative', marginTop: '20px' }}>
                    <CardHeader title='Thông tin trang thiết bị hiện tại' />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='chip'
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={device?.chip || ''}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Bộ vi xử lý'
                                                onChange={onChange}
                                                aria-describedby='validation-chip'
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
                                        name='ram'
                                        control={control}
                                        defaultValue={device?.ram || ''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Dung lượng ram'
                                                onChange={onChange}
                                                aria-describedby='validation-ram'
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
                                        defaultValue={device?.disk || ''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Loại ổ cứng và dung lượng'
                                                onChange={onChange}
                                                aria-describedby='validation-disk'
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='owner'
                                        control={control}
                                        rules={{ required: false }}
                                        defaultValue={device?.owner || ''}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Đối tượng đang sử dụng'
                                                onChange={onChange}
                                                aria-describedby='validation-owner'
                                                InputProps={{
                                                    readOnly: true
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card sx={{ position: 'relative', marginTop: '20px' }}>
                    <CardHeader title='Cập nhật thông tin trang thiết bị' />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='select-whoreceived'>Chọn người cần bàn giao</InputLabel>
                                    <Controller
                                        name='whoreceived'
                                        control={control}
                                        rules={{ required: false }}
                                        render={({ field }) => (

                                            <Select
                                                {...field}
                                                fullWidth
                                                id='select-whoreceived'
                                                label='Chọn người bàn giao'
                                                labelId='whoreceived-select'
                                                inputProps={{
                                                    placeholder: 'Chọn người cần bàn giao',
                                                }}
                                            >
                                                <MenuItem value=''>Chọn người bàn giao</MenuItem>
                                                {employees?.map((employee) => (
                                                    <MenuItem key={employee.employeecd} value={employee.fullname}>
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
                                    <Controller
                                        name='historyfix'
                                        control={control}
                                        rules={{ required: false }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Thông tin sửa chửa'
                                                onChange={onChange}
                                                aria-describedby='validation-historyfix'
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
        </>
    )
}

export default DeviceInfoPage