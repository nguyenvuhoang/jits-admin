// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Custom Components
import CustomChip from '@/@core/components/mui/chip'
import CustomAvatar from '@/@core/components/mui/avatar'
import EmployeeSuspendDialog from '@/views/apps/employee/view/EmployeeSuspendDialog'
import EmployeeSubscriptionDialog from '@/views/apps/employee/view/EmployeeSubscriptionDialog'

// ** Types
import { ThemeColor } from '@/@core/layouts/types'
import { UsersType } from '@/types/dashboards/userTypes'

// ** Utils Import
import { getInitials } from '@/@core/utils/get-initials'
import { EmployeeDetail } from '@/context/types'
import { Status } from '@/@core/utils/system'
import { statusColors } from '@/@core/utils/status-color'
import { roleColors } from '@/@core/utils/role-color'

interface ColorsType {
  [key: string]: ThemeColor
}


// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

type Props = {
  employeecd: string
  employee?: EmployeeDetail
}

const UserViewLeft = ({ employeecd , employee }: Props) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  if (employee) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {employee.image ? (
                <CustomAvatar
                  src={employee.image}
                  variant='rounded'
                  alt={employee.fullname}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color='success'
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(employee.fullname)}
                </CustomAvatar>
              )}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {employee.fullname}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={employee.position}
                color={roleColors[employee.position]}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />

            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Icon icon='mdi:check' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {employee.totaltask}
                    </Typography>
                    <Typography variant='body2'>Task Done</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Icon icon='mdi:briefcase-variant-outline' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {employee.project.length}
                    </Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{employee.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Status:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={Status(employee.status)}
                    color={statusColors[employee.status]}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Position:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {employee.position}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Category:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {employee.category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>{employee.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Address:</Typography>
                  <Typography variant='body2'>{employee.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Team:</Typography>
                  <Typography variant='body2'>{employee.team_description}</Typography>
                </Box>

              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit Employee Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating Employee details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Name' defaultValue={employee.fullname} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={employee.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={employee.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='P'>Pending</MenuItem>
                          <MenuItem value='A'>Active</MenuItem>
                          <MenuItem value='B'>Block</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`${employee.phone}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField fullWidth type='address' label='Address' defaultValue={employee.address} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Team</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={employee.teamcd}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value=''>Select Team</MenuItem>
                          <MenuItem value='CAM'>Cambodia</MenuItem>
                          <MenuItem value='THA'>Thailand</MenuItem>
                          <MenuItem value='LAO'>Lao</MenuItem>
                          <MenuItem value='MIDDLE'>Middleware</MenuItem>
                          <MenuItem value='CODEV'>Codev</MenuItem>
                          <MenuItem value='MNG'>Manager</MenuItem>
                          <MenuItem value='BOD'>Board of Directors</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <EmployeeSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} employeecd = {employeecd} />
            <EmployeeSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
