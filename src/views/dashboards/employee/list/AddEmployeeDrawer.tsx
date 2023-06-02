// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Store Imports
import { EmployeeData, EmployeeResponse } from '@/context/types'
import client from '@/data/client'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from '@/views/forms/pickers/PickersCustomInput';
import { DateType } from '../../../../types/form/reactDatepickerTypes';

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}



const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  employeecd: yup.string().required(),
  birthday: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .typeError('Contact Number field is required')
    .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  fullname: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  deparmentcd: yup.string().required(),
  teamcd: yup.string().required(),

})

const defaultValues = {
  employeecd: '',
  fullname: '',
  birthday: new Date('01/01/1990'),
  address: '',
  phone: '',
  email: '',
  aboutme: '',
  marketcd: '',
  teamcd: '',
  deparmentcd: '',
  gender: ''
}

const SidebarAddEmployee = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const [errorsServer, setErrorServer] = useState('')

  const { mutate: postEmployee } = useMutation(client.employee.postemployee, {
    
    onSuccess: (data) => {
      if (data.errorcode === 0) {
        handleClose()
      }else{
        setErrorServer(data.messagedetail)
      }

    },
    onError: (errorAsUnknown) => {
      const error = errorAsUnknown as AxiosError<EmployeeResponse>;
      const errorMessage = `${error?.response?.status === 400 ? error?.response?.data.messagedetail : 'Error'}`
      setErrorServer(errorMessage)
    }
  });


  const onSubmit = (data: EmployeeData) => {
    const date = new Date(data.birthday)
    setValue('birthday',date)
    postEmployee(data)

  }

  const handleClose = () => {
    toggle()
    reset()
    setErrorServer('')
  }

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Employee</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='employeecd'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Employee code'
                  onChange={onChange}
                  placeholder='Employee code'
                  error={Boolean(errors.employeecd)}
                />
              )}
            />
            {errors.employeecd && <FormHelperText sx={{ color: 'error.main' }}>{errors.employeecd.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='fullname'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Full Name'
                  onChange={onChange}
                  placeholder='JITS'
                  error={Boolean(errors.fullname)}
                />
              )}
            />
            {errors.fullname && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullname.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='jits@jits.com.vn'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='birthday'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  id='birthday'
                  selected={new Date(value)}
                  dateFormat='dd/MM/yyyy'
                  popperPlacement={popperPlacement}
                  onChange={onChange}
                  customInput={
                    <CustomInput
                      label='Birthday'
                      sx={{
                        minWidth: { lg: 340, md: 200, xs: 100 }
                      }} />
                  }
                />
              )}
            />
            {errors.birthday && <FormHelperText sx={{ color: 'error.main' }}>{errors.birthday.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Address'
                  onChange={onChange}
                  placeholder='Vietnam'
                  error={Boolean(errors.address)}
                />
              )}
            />
            {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='phone'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Phone'
                  onChange={onChange}
                  placeholder='(84) 294-5153'
                  error={Boolean(errors.phone)}
                />
              )}
            />
            {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='deparmentcd-select'>Select Department</InputLabel>
            <Controller
              name='deparmentcd'
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
                  <MenuItem value='ACC'>Human Resources - Accounting</MenuItem>
                </Select>
              )}
            />
            {errors.deparmentcd && (
              <FormHelperText sx={{ color: 'error.main' }} id='deparmentcd-error'>
                {errors.deparmentcd.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='teamcd-select'>Select Team</InputLabel>
            <Controller
              name='teamcd'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  id='select-teamcd'
                  label='Select Team'
                  labelId='teamcd-select'
                  onChange={onChange}
                  inputProps={{ placeholder: 'Select Team' }}
                >
                  <MenuItem value='CAM'>Cambodia (TSUNAMI)</MenuItem>
                  <MenuItem value='THA'>ThaiLand</MenuItem>
                  <MenuItem value='LAO'>Lao</MenuItem>
                  <MenuItem value='MDW'>Middleware team</MenuItem>
                  <MenuItem value='TEST'>Tester</MenuItem>
                  <MenuItem value='MNG'>Manager</MenuItem>
                  <MenuItem value='BOD'>Board of Director</MenuItem>
                  <MenuItem value='CODEV'>CO-DEV</MenuItem>
                  <MenuItem value='HRHCM'>BO in HCM</MenuItem>
                  <MenuItem value='HRHN'>BO in HN</MenuItem>
                </Select>
              )}
            />
            {errors.teamcd && (
              <FormHelperText sx={{ color: 'error.main' }} id='teamcd-error'>
                {errors.teamcd.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='marketcd-select'>Select Market</InputLabel>
            <Controller
              name='marketcd'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  id='select-marketcd'
                  label='Select market'
                  labelId='marketcd-select'
                  onChange={onChange}
                  inputProps={{ placeholder: 'Select Market' }}
                >
                  <MenuItem value='CAM'>Cambodia</MenuItem>
                  <MenuItem value='THA'>Lao</MenuItem>
                  <MenuItem value='LAO'>Thailand</MenuItem>
                  <MenuItem value='MDW'>Myanmar</MenuItem>

                </Select>
              )}
            />
            {errors.marketcd && (
              <FormHelperText sx={{ color: 'error.main' }} id='marketcd-error'>
                {errors.marketcd.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={Boolean(errors.gender)}>
            <FormLabel>Gender</FormLabel>
            <Controller
              name='gender'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup row {...field} aria-label='gender' name='validation-basic-gender'>
                  <FormControlLabel
                    value='0'
                    label='Female'
                    sx={errors.gender ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                  />
                  <FormControlLabel
                    value='1'
                    label='Male'
                    sx={errors.gender ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                  />
                  <FormControlLabel
                    value='2'
                    label='Other'
                    sx={errors.gender ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                  />
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>

          {errorsServer && (
            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
              {errorsServer}
            </FormHelperText>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2vh' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddEmployee
