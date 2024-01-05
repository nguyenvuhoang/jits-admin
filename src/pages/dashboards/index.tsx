import CardStatisticsVertical from '@/@core/components/card-statistics/card-stats-vertical'
import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import CustomChip from '@/@core/components/mui/chip'
import { ThemeColor } from '@/@core/layouts/types'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { getInitials } from '@/@core/utils/get-initials'
import { FetchUser } from '@/data/user'
import { useAuth } from '@/hooks/useAuth'
import CalendarEmployee from '@/views/apps/employee/view/CalendarEmployee'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'


interface TableBodyRowType {
    id: number
    name: string
    email: string
    username: string
    avatarSrc?: string
    status: 'active' | 'pending' | 'inactive' | 'N'
    role: 'admin' | 'editor' | 'author' | 'maintainer' | 'subscriber'
    firstname: string
    lastname: string
    isleave: boolean
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
interface StatusObj {
    [key: string]: {
        color: ThemeColor
    }
}

const statusObj: StatusObj = {
    active: { color: 'success' },
    pending: { color: 'warning' },
    inactive: { color: 'secondary' },
    N: { color: 'success' },
    P: { color: 'warning' },
    B: { color: 'error' },
    C: { color: 'warning' }
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
        field: 'firstname',
        headerName: 'Họ Tên',
        renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{`${row.firstname} ${row.lastname}`}</Typography>
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
                color={statusObj[row.status]?.color}
                sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
            />
        )
    }
]


const Dashboard = () => {
    const { t } = useTranslation('common')
    const { employee, user } = useAuth()
    const { users } = FetchUser()
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

    return (
        <ApexChartWrapper>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} md={4}>
                    <Card sx={{ position: 'relative' }}>
                        <CardContent>
                            <Typography variant='h6'>
                                {t('text-hello')}{' '}
                                <Box component='span' sx={{ fontWeight: 'bold' }}>
                                    {employee?.fullname}
                                </Box>
                                ! 🎉
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 3.25 }}>
                                {t('text-let-try')}
                            </Typography>
                            <Button size='small' variant='contained'>
                                {t('text-view-result')}
                            </Button>
                            <TrophyImg alt='trophy' src='/images/cards/trophy.png' />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardStatisticsVertical
                        stats={employee?.project?.length.toString()}
                        color='primary'
                        trendNumber={employee?.project?.length.toString()}
                        title={t('text-total-project')}
                        chipText='Last 4 Month'
                        icon={<Icon icon='arcticons:projectm' />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardStatisticsVertical
                        stats={employee?.totaltask.toString()}
                        color='success'
                        trendNumber={employee?.totaltask.toString()}
                        title={t('text-total-task')}
                        chipText='Last Six Month'
                        icon={<Icon icon='iconoir:task-list' />}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <CalendarEmployee />
                </Grid>
                {users && user?.permission?.includes('MANAGER') &&
                    <Grid item xs={12} md={12} sm={12}>
                        <Card>
                            <DataGrid
                                pageSizeOptions={[10, 25, 50]}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                autoHeight
                                rows={users}
                                columns={columns}
                                disableRowSelectionOnClick
                                getRowId={(row) => row.username}
                            />
                        </Card>
                    </Grid>
                }
            </Grid>
        </ApexChartWrapper>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        return {
            props: {
                ...(await serverSideTranslations(locale!, ['common'])),
            },
            revalidate: 60, // In seconds
        };
    } catch (error) {
        console.log(error)
        //* if we get here, the product doesn't exist or something else went wrong
        return {
            notFound: true,
        };
    }
};

export default Dashboard