// ** React Imports
import { MouseEvent, useState } from 'react'

// ** MUI Components
import CustomChip from '@/@core/components/mui/chip'
import { ApproveStatus } from '@/@core/utils/approve-status'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

// ** Types Imports
import { ThemeColor } from '@/@core/layouts/types'

// ** Utils Import
import { FetchListOfApplicationForLeave } from '@/data/employee'
import { Button, CardContent, Grid, GridProps, IconButton, Menu, MenuItem } from '@mui/material'

import Icon from '@/@core/components/icon'
import { ApplicationForLeave } from '@/context/types'
import Link from 'next/link'
import Swal from 'sweetalert2'


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

interface ApplicationForLeaveStatusType {
  [key: string]: ThemeColor
}
const personalStatusObj: ApplicationForLeaveStatusType = {
  A: 'success',
  P: 'warning',
  R: 'error'
}

interface CellType {
  row: ApplicationForLeave
}

const ApplicationLeaveForm = ({ employeecd }: { employeecd: string }) => {
  const theme = useTheme()
  const { t } = useTranslation('common')

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const { applicationforleave } = FetchListOfApplicationForLeave({ employeecd: employeecd })


  const RowOptions = ({ id }: { id: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        color: 'gold',
        title: 'Hold on!',
        text: 'This feature is not available. Please come back later'
    })
      setAnchorEl(null)
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleRowOptionsClose}
            href="#"
          >
            <Icon icon='flat-color-icons:cancel' fontSize={20} />
            {t('text-request-cancel')}
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 110,
      field: 'leader',
      headerName: 'Leader',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.leader}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'formalitycaption',
      headerName: `${t('text-formality')}`,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {t(params.row.formalitycaption)}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 110,
      field: 'reason',
      headerName: `${t('text-reason')}`,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.reason}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'totaldayoff',
      headerName: `${t('text-totaldayoff')}`,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.totaldayoff}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'createdate',
      headerName: `${t('text-date-request')}`,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.createdate}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'status',
      headerName: `${t('text-status')}`,
      renderCell: (params: GridRenderCellParams) => (
        <CustomChip
          skin='light'
          size='small'
          label={ApproveStatus(params.row.status)}
          color={personalStatusObj[params.row.status]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => < RowOptions id={row.id} />
    }

  ]



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
