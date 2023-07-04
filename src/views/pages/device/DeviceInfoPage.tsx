import { Button, Card, CardContent, CardHeader, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

type Props = {}

const DeviceInfoPage = (props: Props) => {


    const defaultValues = {
        deviceid: '',
        name: '',
        buydate: '',
        price: '',
        chip: '',
        ram: '',
        disk: '',
        owner: '',
        whoreceived: '',
        historyfix: ''
    }
    const {
        control,
        setValue,
        handleSubmit
    } = useForm({
        defaultValues,
        mode: 'onChange'
    })

    const onSubmit = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            color: 'gold',
            title: 'Hold on!',
            text: 'This feature is not available. Please come back later'
        })
    }

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
                                        name='buydate'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Ngày mua'
                                                onChange={onChange}
                                                aria-describedby='validation-buydate'
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
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Bộ vi xử lý'
                                                onChange={onChange}
                                                aria-describedby='validation-chip'
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
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Đối tượng đang sử dụng'
                                                onChange={onChange}
                                                aria-describedby='validation-disk'
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
                                    <Controller
                                        name='whoreceived'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='Người nhận bàn giao'
                                                onChange={onChange}
                                                aria-describedby='validation-whoreceived'
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='historyfix'
                                        control={control}
                                        rules={{ required: true }}
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