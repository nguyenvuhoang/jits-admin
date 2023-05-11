import React, { useEffect } from 'react'
import { Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import PageHeader from '@/@core/components/page-header'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { ApplicationLeaveInputs } from '@/types/form/applicationForLetterType'
import { useAuth } from '@/hooks/useAuth'

type Props = {}
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const PersionalOff = (props: Props) => {

  const { employee } = useAuth()
  const defaultValues = {
    employeecd: '',
    fullname: '',
    email: '',
    departmentcd: '',
    position: '',
    leader: '',
    manager: '',
    dateoff: '',
    typeoff: '',
    reason: '',
    fromdt: '',
    todt: '',
    totaldayoff: 0,
    session: '',
    replacepersion: ''
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

  useEffect(() => {
    setValue('fullname', employee?.fullname || '');
  }, [employee, setValue]);


  const onSubmit = (data: ApplicationLeaveInputs) => {
    console.log(data)
  }

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h4'>
              Application For Leave
            </Typography>
          }
          subtitle={<Typography variant='body2'>Request your leave details down below.</Typography>}
        />

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Basic information' />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='employeecd'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Employee code'
                            onChange={onChange}
                            placeholder='JITS-HOANGNV-000019'
                            error={Boolean(errors.employeecd)}
                            aria-describedby='validation-employeecd'
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
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Full Name'
                            placeholder='JITS'
                            onChange={onChange}
                            aria-describedby='validation-fullname'
                            InputProps={{
                              value: employee?.fullname
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
                  {/* <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            defaultValue={employee?.email}
                            type='email'
                            value={value}
                            label='Email'
                            onChange={onChange}
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
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            fullWidth
                            value={value}
                            id='select-deparmentcd'
                            label='Select Department'
                            labelId='deparmentcd-select'
                            onChange={onChange}
                            inputProps={{ placeholder: 'Select Department' }}
                          >
                            <MenuItem value='SDD'>Solutions Delivery Dept</MenuItem>
                            <MenuItem value='RND-HCM'>R&D Dept in HCM</MenuItem>
                            <MenuItem value='RND-HN'>R&D Dept in Ha Noi</MenuItem>
                            <MenuItem value='BUZ'>Business & Maketing</MenuItem>
                            <MenuItem value='HR'>Human Resource</MenuItem>
                          </Select>
                        )}
                      />
                      {errors.departmentcd && (
                        <FormHelperText sx={{ color: 'error.main' }} id='deparmentcd-error'>
                          {errors.departmentcd.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Button size='large' type='submit' variant='contained'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>

              </form>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </>
  )
}

export default PersionalOff