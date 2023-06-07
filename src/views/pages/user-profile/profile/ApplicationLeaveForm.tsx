// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AvatarGroup from '@mui/material/AvatarGroup'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import axios from 'axios'

// ** Types Imports
import { ThemeColor } from '@/@core/layouts/types'
import { ProjectTableRowType } from '@/types/views'

// ** Custom Components Imports
import OptionsMenu from '@/@core/components/option-menu'
import CustomAvatar from '@/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from '@/@core/utils/get-initials'
import { FetchApplicationForLeavebyid, FetchListOfApplicationForLeave } from '@/data/employee'
import { Button, CardContent, Grid, GridProps } from '@mui/material'
import Link from 'next/link'

interface CellType {
  row: ProjectTableRowType
}

// ** renders name column
const renderName = (row: ProjectTableRowType) => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2, width: 35, height: 35 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{ mr: 2, width: 35, height: 35, fontSize: '0.875rem' }}
        color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 220,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      const { name, date } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderName(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled', textTransform: 'capitalize' }}>
              {date}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'leader',
    headerName: 'Leader',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.leader}</Typography>
  },
  {
    flex: 0.1,
    field: 'team',
    minWidth: 120,
    headerName: 'Team',
    renderCell: ({ row }: CellType) => (
      <AvatarGroup className='pull-up'>
        {row.avatarGroup.map((src, index) => (
          <CustomAvatar key={index} src={src} sx={{ height: 26, width: 26 }} />
        ))}
      </AvatarGroup>
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => (
      <>
        <LinearProgress
          color='primary'
          value={row.status}
          variant='determinate'
          sx={{
            mr: 4,
            height: 6,
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'background.default',
            '& .MuiLinearProgress-bar': {
              borderRadius: 8
            }
          }}
        />
        <Typography sx={{ color: 'text.secondary' }}>{`${row.status}%`}</Typography>
      </>
    )
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => (
      <OptionsMenu
        iconButtonProps={{ size: 'small' }}
        options={[
          'Details',
          'Archive',
          { divider: true },
          { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } }
        ]}
      />
    )
  }
]

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const ApplicationLeaveForm = ({ employeecd }: { employeecd: string }) => {
  const theme = useTheme()

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const { applicationforleave } = FetchListOfApplicationForLeave({ employeecd: employeecd })
  console.log(applicationforleave)

  return applicationforleave ? (
    <Card>
      <CardHeader
        title='Thông tin nghỉ phép'
      />
      {applicationforleave &&
        <DataGrid
          autoHeight
          pagination
          rows={applicationforleave}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 7, 10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      }
    </Card>
  ) : <Card sx={{ position: 'relative' }}>
    <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h5' sx={{ mb: 4.5 }}>
            Thông tin nghỉ phép{' '}
            ! 🎉
          </Typography>
          <Typography variant='body2'>
            Trong năm nay bạn chưa gửi phép nào{' '}
          </Typography>
          <Typography sx={{ mb: 4.5 }} variant='body2'>
            Bạn muốn nghỉ phép vui lòng nhấn vào nút gửi đơn xin phép bên dưới
          </Typography>
          <Button href="/form/personal-off/" target="_blank" component={Link} variant='contained'>Gửi đơn xin nghỉ phép</Button>
        </Grid>
        <StyledGrid item xs={12} sm={6}>
          <Img alt='Congratulations John' src={`/images/cards/illustration-john-${theme.palette.mode}.png`} />
        </StyledGrid>
      </Grid>
    </CardContent>
  </Card>
}

export default ApplicationLeaveForm
