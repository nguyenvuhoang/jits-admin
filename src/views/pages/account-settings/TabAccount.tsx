// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useTranslation } from 'next-i18next'
import Spinner from '@/@core/components/spinner'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from '@/@core/components/icon'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import { useSubmitUpdateEmployeeInfo } from '@/data/employee'

interface Data {
  email: string | undefined
  fullname: string | undefined
  address: string | undefined
  phone: string | undefined
  description: string | undefined
}



const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  const { t } = useTranslation('common')

  const { employee, loading } = useAuth()

  const initialData: Data = {
    address: employee?.address || '',
    fullname: employee?.fullname || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    description: employee?.description || ''
  }

  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('yes')
  const [formData, setFormData] = useState<Data>(initialData)
  const [imgSrc, setImgSrc] = useState<string>(employee?.cover || '/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const onSubmit = () => setOpen(true)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/1.png')
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  useEffect(() => {
    if (employee) {
      setFormData((prevData) => ({
        ...prevData,
        fullname: employee.fullname || '',
        email: employee.email || '',
        address: employee.address || '',
        phone: employee.phone || '',
        description: employee.description || '',
      }));
      setImgSrc(employee.cover)
    }
  }, [employee]);


  const { isLoading, mutate: SubmitUpdateEmployeeInfo } = useSubmitUpdateEmployeeInfo()

  const saveChange = () => {
    const submitData = {
      address: formData.address,
      phone: formData.phone,
      aboutme: formData.description
    }
    SubmitUpdateEmployeeInfo(submitData)
    
  }

  if (isLoading) return <Spinner />
  return (
    <>
      {!loading &&
        <Grid container spacing={6}>
          {/* Account Details Card */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title={t('text-employee-information')} />
              <form >
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                  </Box>
                </CardContent>
                <Divider />
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('text-fullname')}
                        fullWidth
                        value={formData.fullname}
                        onChange={e => handleFormChange('fullname', e.target.value)}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('text-email')}
                        fullWidth
                        type='email'
                        value={formData.email}
                        onChange={e => handleFormChange('email', e.target.value)}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('text-address')}
                        fullWidth
                        value={formData.address}
                        onChange={e => handleFormChange('address', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('text-phone')}
                        fullWidth
                        value={formData.phone}
                        onChange={e => handleFormChange('phone', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label={t('text-description-employee')}
                        fullWidth
                        multiline
                        rows={8}
                        value={formData.description}
                        onChange={e => handleFormChange('description', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button variant='contained' sx={{ mr: 3 }} onClick={() => saveChange()}>
                        {t('text-save-change')}
                      </Button>
                      <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
                        {t('text-reset')}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </Card>
          </Grid>
        </Grid>
      }
    </>
  )
}

export default TabAccount
