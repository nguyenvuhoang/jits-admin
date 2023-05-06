import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import CustomChip from '@/@core/components/mui/chip'
import { ThemeColor } from '@/@core/layouts/types'
import { getInitials } from '@/@core/utils/get-initials'
import { Status } from '@/@core/utils/system'
import { FetchEmployee } from '@/data/employee'
import { EmployeeType } from '@/types/dashboards/employeeType'
import AddUserDrawer from '@/views/dashboards/employee/list/AddEmployeeDrawer'
import TableHeader from '@/views/dashboards/employee/list/TableHeader'
import { Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, Typography, styled } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Link from 'next/link'
import { MouseEvent, useCallback, useEffect, useState } from 'react'

interface CellType {
    row: EmployeeType
}

// ** renders client column
const renderClient = (row: EmployeeType) => {
    if (row.avatar.length) {
        return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
        return (
            <CustomAvatar
                skin='light'
                color='primary'
                sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
            >
                {getInitials(row.fullname ? row.fullname : 'John Doe')}
            </CustomAvatar>
        )
    }
}

const LinkStyled = styled(Link)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.primary.main
    }
}))

interface UserStatusType {
    [key: string]: ThemeColor
}

const userStatusObj: UserStatusType = {
    A: 'success',
    P: 'warning',
    B: 'error'
}


const RowOptions = ({ id }: { id: number | string }) => {

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = () => {
        handleRowOptionsClose()
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
                    href={`/apps/employee/view/${id}`}
                >
                    <Icon icon='mdi:eye-outline' fontSize={20} />
                    View
                </MenuItem>
                <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
                    <Icon icon='mdi:pencil-outline' fontSize={20} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
                    <Icon icon='mdi:delete-outline' fontSize={20} />
                    Delete
                </MenuItem>
            </Menu>
        </>
    )
}


const columns: GridColDef[] = [
    {
        flex: 0.2,
        minWidth: 230,
        field: 'employeecd',
        headerName: 'Code',
        renderCell: ({ row }: CellType) => {
            const { employeecd } = row
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderClient(row)}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <LinkStyled href='/apps/user/view/overview/'>{employeecd}</LinkStyled>
                        <Typography noWrap variant='caption'>
                            {`@${employeecd}`}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 250,
        field: 'email',
        headerName: 'Email',
        renderCell: ({ row }: CellType) => {
            return (
                <Typography noWrap variant='body2'>
                    {row.email}
                </Typography>
            )
        }
    },
    {
        flex: 0.15,
        field: 'department_descr',
        minWidth: 150,
        headerName: 'Department',
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                    <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {row.department_descr}
                    </Typography>
                </Box>
            )
        }
    },
    {
        flex: 0.15,
        minWidth: 120,
        headerName: 'Team',
        field: 'team_descr',
        renderCell: ({ row }: CellType) => {
            return (
                <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
                    {row.team_descr}
                </Typography>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 110,
        field: 'status',
        headerName: 'Status',
        renderCell: ({ row }: CellType) => {
            return (
                <CustomChip
                    skin='light'
                    size='small'
                    label={Status(row.status)}
                    color={userStatusObj[row.status]}
                    sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
                />
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: CellType) => <RowOptions id={row.employeecd} />
    }
]


const EmployeeList = () => {

    const [role, setRole] = useState<string>('')
    const [team, setTeam] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

    
    const handleRoleChange = useCallback((e: SelectChangeEvent) => {
        setRole(e.target.value)
    }, [])
    const handleTeamChange = useCallback((e: SelectChangeEvent) => {
        setTeam(e.target.value)
    }, [])
    const handleStatusChange = useCallback((e: SelectChangeEvent) => {
        setStatus(e.target.value)
    }, [])

    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    const filter = {
        teamcd: team,
        status: status,
        role: role
    }
    const { employees, refetch } = FetchEmployee(filter)

    useEffect(() => {
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])


    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='User management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='role-select'>Select Role</InputLabel>
                                    <Select
                                        fullWidth
                                        value={role}
                                        id='select-role'
                                        label='Select Role'
                                        labelId='role-select'
                                        onChange={handleRoleChange}
                                        inputProps={{ placeholder: 'Select Role' }}
                                    >
                                        <MenuItem value=''>Select Role</MenuItem>
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='author'>Developer</MenuItem>
                                        <MenuItem value='editor'>Tester</MenuItem>
                                        <MenuItem value='maintainer'>Supporter</MenuItem>
                                        <MenuItem value='subscriber'>CoDev</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='team-select'>Select Team</InputLabel>
                                    <Select
                                        fullWidth
                                        value={team}
                                        id='select-team'
                                        label='Select Team'
                                        labelId='team-select'
                                        onChange={handleTeamChange}
                                        inputProps={{ placeholder: 'Select Team' }}
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
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='status-select'>Select Status</InputLabel>
                                    <Select
                                        fullWidth
                                        value={status}
                                        id='select-status'
                                        label='Select Status'
                                        labelId='status-select'
                                        onChange={handleStatusChange}
                                        inputProps={{ placeholder: 'Select Role' }}
                                    >
                                        <MenuItem value=''>Select Role</MenuItem>
                                        <MenuItem value='P'>Pending</MenuItem>
                                        <MenuItem value='A'>Active</MenuItem>
                                        <MenuItem value='B'>Block</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    {employees &&
                        <DataGrid
                            autoHeight
                            pagination
                            pageSizeOptions={[10, 25, 50]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            columns={columns}
                            rows={employees}
                            getRowId={(row) => row.employeeid}
                        />
                    }
                </Card>
            </Grid>
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
    )
}

export default EmployeeList