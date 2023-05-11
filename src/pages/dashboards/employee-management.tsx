import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import CustomChip from '@/@core/components/mui/chip'
import { ThemeColor } from '@/@core/layouts/types'
import { getInitials } from '@/@core/utils/get-initials'
import { Status } from '@/@core/utils/system'
import { EmployeeResponse } from '@/context/types'
import client from '@/data/client'
import { FetchEmployee } from '@/data/employee'
import { useAuth } from '@/hooks/useAuth'
import { EmployeeType } from '@/types/dashboards/employeeType'
import AddEmployeeDrawer from '@/views/dashboards/employee/list/AddEmployeeDrawer'
import TableHeader from '@/views/dashboards/employee/list/TableHeader'
import { Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, Typography, styled } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

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





const EmployeeList = () => {

    const [role, setRole] = useState<string>('')
    const [team, setTeam] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [addEmployeeOpen, setAddEmployeeOpen] = useState<boolean>(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [value, setValue] = useState<string>('')
    const [refresh, setRefresh] = useState(false)

    const handleRoleChange = useCallback((e: SelectChangeEvent) => {
        setRole(e.target.value)
    }, [])
    const handleTeamChange = useCallback((e: SelectChangeEvent) => {
        setTeam(e.target.value)
    }, [])
    const handleStatusChange = useCallback((e: SelectChangeEvent) => {
        setStatus(e.target.value)
    }, [])

    const toggleAddUEmployeeDrawer = () => setAddEmployeeOpen(!addEmployeeOpen)

    const filter = {
        teamcd: team,
        status: status,
        role: role
    }
    const { employees, refetch } = FetchEmployee(filter)

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, refresh])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])



    const RowOptions = ({ id, status }: { id: string, status: string }) => {
        const { user } = useAuth()
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

        const { mutate: approveCustomer } = useMutation(client.employee.approve, {
            onSuccess: (data) => {
                if (data.errorcode === 0) {
                    setAnchorEl(null)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        color: 'green',
                        title: 'Approved!',
                        text: 'Approved customer successfully'
                    }).then((response) => {
                        if (response.isConfirmed) {
                            setRefresh(true)
                        }
                    })
                }

            },
            onError: (errorAsUnknown) => {
                const error = errorAsUnknown as AxiosError<EmployeeResponse>;
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    color: 'red',
                    title: 'Oops...',
                    text: `${error?.response?.status === 400 ? error?.response?.data.messagedetail : 'Error'}`,
                })

            }
        });

        const handleApprove = (id: any) => {
            const data = {
                employeecd: id,
                status: 'A'
            }
            approveCustomer(data)
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
                    {user?.isadmin && status === 'P' &&
                        <MenuItem onClick={() => handleApprove(id)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='mdi:account-convert' fontSize={20} />
                            Approve
                        </MenuItem>
                    }
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
                const { employeecd,username } = row
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderClient(row)}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <LinkStyled href='/apps/user/view/overview/'>{employeecd}</LinkStyled>
                            <Typography noWrap variant='caption'>
                                {`@${username}`}
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
            renderCell: ({ row }: CellType) => <RowOptions id={row.employeecd} status={row.status} />
        }
    ]

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Employee management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
                                        <MenuItem value='HRHCM'>Human Resource in HCM</MenuItem>
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
                    <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUEmployeeDrawer} />
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
            <AddEmployeeDrawer open={addEmployeeOpen} toggle={toggleAddUEmployeeDrawer} />
        </Grid>
    )
}

export default EmployeeList