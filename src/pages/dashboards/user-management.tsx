import TableHeader from '@/views/dashboards/user/list/TableHeader'
import { Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, styled } from '@mui/material'
import { useCallback, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { UsersType } from '@/types/dashboards/userTypes'
import CustomAvatar from '@/@core/components/mui/avatar'
import { getInitials } from '@/@core/utils/get-initials'
import Link from 'next/link'

type Props = {}


interface CellType {
    row: UsersType
}

// ** renders client column
const renderClient = (row: UsersType) => {
    if (row.avatar.length) {
        return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
        return (
            <CustomAvatar
                skin='light'
                color={row.avatarColor || 'primary'}
                sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
            >
                {getInitials(row.fullName ? row.fullName : 'John Doe')}
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

const columns: GridColDef[] = [
    {
        flex: 0.2,
        minWidth: 230,
        field: 'fullName',
        headerName: 'User',
        // renderCell: ({ row }: CellType) => {
        //     const { fullName, username } = row
        //     return (
        //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //             {renderClient(row)}
        //             <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        //                 <LinkStyled href='/apps/user/view/overview/'>{fullName}</LinkStyled>
        //                 <Typography noWrap variant='caption'>
        //                     {`@${username}`}
        //                 </Typography>
        //             </Box>
        //         </Box>
        //     )
        // }
    },
    {
        flex: 0.2,
        minWidth: 250,
        field: 'email',
        headerName: 'Email',
        // renderCell: ({ row }: CellType) => {
        //     return (
        //         <Typography noWrap variant='body2'>
        //             {row.email}
        //         </Typography>
        //     )
        // }
    },
    {
        flex: 0.15,
        field: 'role',
        minWidth: 150,
        headerName: 'Role',
        // renderCell: ({ row }: CellType) => {
        //   return (
        //     <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userRoleObj[row.role].color } }}>
        //       <Icon icon={userRoleObj[row.role].icon} fontSize={20} />
        //       <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
        //         {row.role}
        //       </Typography>
        //     </Box>
        //   )
        // }
    },
    {
        flex: 0.15,
        minWidth: 120,
        headerName: 'Team',
        field: 'team',
        // renderCell: ({ row }: CellType) => {
        //   return (
        //     <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
        //       {row.currentPlan}
        //     </Typography>
        //   )
        // }
    },
    {
        flex: 0.1,
        minWidth: 110,
        field: 'status',
        headerName: 'Status',
        // renderCell: ({ row }: CellType) => {
        //   return (
        //     <CustomChip
        //       skin='light'
        //       size='small'
        //       label={row.status}
        //       color={userStatusObj[row.status]}
        //       sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        //     />
        //   )
        // }
    },
    {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        // renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
]


const UserList = (props: Props) => {

    const [role, setRole] = useState<string>('')
    const [team, setTeam] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])
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
                                        <MenuItem value='cam'>Cambodia</MenuItem>
                                        <MenuItem value='thai'>Thailand</MenuItem>
                                        <MenuItem value='lao'>Lao</MenuItem>
                                        <MenuItem value='middle'>Middleware</MenuItem>
                                        <MenuItem value='codev'>Codev</MenuItem>

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
                                        <MenuItem value='pending'>Pending</MenuItem>
                                        <MenuItem value='active'>Active</MenuItem>
                                        <MenuItem value='inactive'>Block</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                    <DataGrid
                        autoHeight
                        columns={columns}
                        rows={[]} />


                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList