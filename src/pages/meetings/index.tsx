import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import { ThemeColor } from '@/@core/layouts/types'
import { getInitials } from '@/@core/utils/get-initials'
import { EmployeeResponse, Meeting } from '@/context/types'
import { FetchBlog } from '@/data/blog'
import client from '@/data/client'
import { useAuth } from '@/hooks/useAuth'
import { EmployeeType } from '@/types/dashboards/employeeType'
import TableHeader from '@/views/apps/meeting/TableHeader'
import { Box, Card, CardHeader, Divider, Grid, IconButton, Menu, MenuItem, Typography, styled } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

interface CellType {
    row: Meeting
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





const MeetingPage = () => {
    const { t } = useTranslation('common')
    const [addEmployeeOpen, setAddEmployeeOpen] = useState<boolean>(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [value, setValue] = useState<string>('')
    const [refresh, setRefresh] = useState(false)

    const toggleAddUEmployeeDrawer = () => setAddEmployeeOpen(!addEmployeeOpen)

    const { blog, refetch } = FetchBlog()

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])



    const RowOptions = ({ id }: { id: string }) => {
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
                    }).then((response: any) => {
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
            field: 'meetingcode',
            headerName: `${t('text-meeting-code')}`,
            renderCell: ({ row }: CellType) => {
                const { meetingcode } = row
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography noWrap variant='caption'>
                                {`${meetingcode}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'title',
            headerName: `${t('text-title')}`,
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.title}
                    </Typography>
                )
            }
        },
        {
            flex: 0.15,
            field: 'category',
            minWidth: 150,
            headerName: `${t('text-category')}`,
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.category}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 120,
            headerName: `${t('Teams')}`,
            field: 'team',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
                        {row.team}
                    </Typography>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 120,
            headerName: `${t('text-public-date')}`,
            field: 'pubdt',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
                        {row.pubdt}
                    </Typography>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }: CellType) => <RowOptions id={row.meetingid} />
        }
    ]



    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={t('text-meeting-management')}
                        sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
                    />

                    <Divider />
                    <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUEmployeeDrawer} />
                    {blog &&
                        <DataGrid
                            autoHeight
                            pagination
                            pageSizeOptions={[10, 25, 50]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            columns={columns}
                            rows={[]}
                            getRowId={(row) => row.meetingid}
                        />
                    }
                </Card>
            </Grid>
        </Grid>
    )
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
        },
        revalidate: 60, // In seconds
    };
};
export default MeetingPage