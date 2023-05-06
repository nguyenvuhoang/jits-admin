import React, { ChangeEvent, useState } from 'react'

import Grid from '@mui/material/Grid'
import { Alert, AlertTitle, Button, Card, CardContent, CardHeader, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Icon from '@/@core/components/icon'

type Props = {}
interface State {
    newPassword: string
    showNewPassword: boolean
    confirmNewPassword: string
    showConfirmNewPassword: boolean
}
const EmployeeViewSecurity = (props: Props) => {
    const [values, setValues] = useState<State>({
        newPassword: '',
        showNewPassword: false,
        confirmNewPassword: '',
        showConfirmNewPassword: false
    })

    // Handle Password
    const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword })
    }
    // Handle Confirm Password
    const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowConfirmNewPassword = () => {
        setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
    }


    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Change Password' />
                    <CardContent>
                        <Alert icon={false} severity='warning' sx={{ mb: 6 }}>
                            <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                                Ensure that these requirements are met
                            </AlertTitle>
                            Minimum 8 characters long, uppercase & symbol
                        </Alert>
                        <form onSubmit={e => e.preventDefault()}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                                        <OutlinedInput
                                            label='New Password'
                                            value={values.newPassword}
                                            id='user-view-security-new-password'
                                            onChange={handleNewPasswordChange('newPassword')}
                                            type={values.showNewPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={handleClickShowNewPassword}
                                                        onMouseDown={e => e.preventDefault()}
                                                        aria-label='toggle password visibility'
                                                    >
                                                        <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                                        <OutlinedInput
                                            label='Confirm New Password'
                                            value={values.confirmNewPassword}
                                            id='user-view-security-confirm-new-password'
                                            type={values.showConfirmNewPassword ? 'text' : 'password'}
                                            onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onMouseDown={e => e.preventDefault()}
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowConfirmNewPassword}
                                                    >
                                                        <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type='submit' variant='contained'>
                                        Change Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default EmployeeViewSecurity
