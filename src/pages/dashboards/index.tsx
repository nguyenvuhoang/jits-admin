import CardStatisticsVertical from '@/@core/components/card-statistics/card-stats-vertical'
import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import CustomChip from '@/@core/components/mui/chip'
import { ThemeColor } from '@/@core/layouts/types'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { getInitials } from '@/@core/utils/get-initials'
import { useAuth } from '@/hooks/useAuth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ReactElement } from 'react'




type Props = {}


interface TableBodyRowType {
    id: number
    name: string
    email: string
    username: string
    avatarSrc?: string
    status: 'active' | 'pending' | 'inactive'
    role: 'admin' | 'editor' | 'author' | 'maintainer' | 'subscriber'
}


const TrophyImg = styled('img')(({ theme }) => ({
    right: 22,
    bottom: 0,
    width: 106,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
        width: 95
    }
}))
const renderUserAvatar = (row: TableBodyRowType) => {
    if (row.avatarSrc) {
        return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
        return (
            <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '.8rem' }}>
                {getInitials(row.name ? row.name : 'John Doe')}
            </CustomAvatar>
        )
    }
}
interface CellType {
    row: TableBodyRowType
}

interface RoleObj {
    [key: string]: {
        icon: ReactElement
    }
}

interface StatusObj {
    [key: string]: {
        color: ThemeColor
    }
}

const roleObj: RoleObj = {
    admin: {
        icon: (
            <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main' }}>
                <Icon icon='mdi:laptop' />
            </Box>
        )
    },
    author: {
        icon: (
            <Box component='span' sx={{ display: 'flex', mr: 2, color: 'warning.main' }}>
                <Icon icon='mdi:cog' />
            </Box>
        )
    },
    maintainer: {
        icon: (
            <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
                <Icon icon='mdi:chart-donut' />
            </Box>
        )
    },
    editor: {
        icon: (
            <Box component='span' sx={{ display: 'flex', mr: 2, color: 'info.main' }}>
                <Icon icon='mdi:pencil-outline' />
            </Box>
        )
    },
    subscriber: {
        icon: (
            <Box component='span' sx={{ display: 'flex', mr: 2, color: 'primary.main' }}>
                <Icon icon='mdi:account-outline' />
            </Box>
        )
    }
}
const statusObj: StatusObj = {
    active: { color: 'success' },
    pending: { color: 'warning' },
    inactive: { color: 'secondary' }
}

const columns: GridColDef[] = [
    {
        flex: 0.25,
        field: 'name',
        minWidth: 200,
        headerName: 'User',
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderUserAvatar(row)}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                            {row.name}
                        </Typography>
                        <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
                            {row.username}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.3,
        minWidth: 250,
        field: 'email',
        headerName: 'Email',
        renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.email}</Typography>
    },
    {
        flex: 0.2,
        minWidth: 130,
        field: 'role',
        headerName: 'Role',
        renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {roleObj[row.role].icon}
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.role}</Typography>
            </Box>
        )
    },
    {
        flex: 0.15,
        minWidth: 110,
        field: 'status',
        headerName: 'Status',
        renderCell: ({ row }: CellType) => (
            <CustomChip
                skin='light'
                size='small'
                label={row.status}
                color={statusObj[row.status].color}
                sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
            />
        )
    }
]
const Dashboard = (props: Props) => {

    const { employee } = useAuth()

    return (
        <ApexChartWrapper>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} md={4}>
                    <Card sx={{ position: 'relative' }}>
                        <CardContent>
                            <Typography variant='h6'>
                                Hello{' '}
                                <Box component='span' sx={{ fontWeight: 'bold' }}>
                                    {employee?.fullname}
                                </Box>
                                ! 🎉
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 3.25 }}>
                                Let&lsquo;s strive to be an excellent employee
                            </Typography>
                            <Button size='small' variant='contained'>
                                View Result
                            </Button>
                            <TrophyImg alt='trophy' src='/images/cards/trophy.png' />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardStatisticsVertical
                        stats={employee?.project.length.toString()}
                        color='primary'
                        trendNumber={employee?.project.length.toString()}
                        title='Total Project'
                        chipText='Last 4 Month'
                        icon={<Icon icon='mdi:check' />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardStatisticsVertical
                        stats='$13.4k'
                        color='success'
                        trendNumber='+38%'
                        title='Total Task'
                        chipText='Last Six Month'
                        icon={<Icon icon='mdi:currency-usd' />}
                    />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                    <Card>
                        <DataGrid autoHeight hideFooter rows={[]} columns={columns} disableRowSelectionOnClick pagination={undefined} />
                    </Card>
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}

export default Dashboard