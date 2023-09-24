import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'
import CustomChip from '@/@core/components/mui/chip'
import Spinner from '@/@core/components/spinner'
import { ThemeColor } from '@/@core/layouts/types'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { Candidate } from '@/context/types'
import { FetchCandidate, useCandidateOnJob } from '@/data/candidate'
import Translations from '@/layouts/components/Translations'
import QuickSearchToolbar from '@/views/table/data-grid/QuickSearchToolbar'
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { ChangeEvent, MouseEvent, useState } from 'react'
import Swal from "sweetalert2"


interface CellType {
    row: Candidate
}

interface OnJobStatusObj {
    [key: string]: {
        icon: string
        color: ThemeColor
    }
}
interface CandidateStatusType {
    [key: string]: ThemeColor
}
const candidateStatusObj: CandidateStatusType = {
    Đạt: 'success',
    Rớt: 'error'
}

// ** Vars
const onJobStatusObj: OnJobStatusObj = {
    true: { color: 'success', icon: 'mdi:check' },
    false: { color: 'error', icon: 'typcn:delete-outline' }
}

const CandidateManagement = () => {

    const theme = useTheme()

    const { candidate, isLoading } = FetchCandidate()

    const { mutate: SubmitCandidateOnJob } = useCandidateOnJob()

    const RowOptions = ({ id }: { id: string }) => {
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

        const handleOnJob = () => {
            handleRowOptionsClose()
            Swal.fire({
                position: 'center',
                icon: 'question',
                color: 'primary',
                title: 'Bắt đầu thử việc',
                text: 'Bạn có chắc chắn chọn bạn này vào thử việc?',
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
            }).then((response: any) => {
                if (response.isConfirmed) {
                    SubmitCandidateOnJob({
                        candidateid: id,
                        isTryJob: true
                    })
                }
            })
        }

        if (isLoading) return <Spinner />

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
                        href={`/apps/candidate/view/${id}`}
                    >
                        <Icon icon='mdi:eye-outline' fontSize={20} />
                        <Translations text={'text-view-point'} />
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        sx={{ '& svg': { mr: 2 } }}
                        onClick={handleRowOptionsClose}
                        href={`/apps/candidate/view/profile/${id}`}
                    >
                        <Icon icon='mdi:eye-outline' fontSize={20} />
                        <Translations text={'text-view-profile'} />
                    </MenuItem>
                    <MenuItem
                        sx={{ '& svg': { mr: 2 } }}
                        onClick={handleOnJob}
                    >
                        <Icon icon='carbon:batch-job' fontSize={20} />
                        <Translations text={'text-on-job'} />
                    </MenuItem>
                </Menu>
            </>
        )
    }


    const columns: GridColDef[] = [
        {
            flex: 0.275,
            minWidth: 290,
            field: 'fullname',
            headerName: 'Full name',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar src={row.sex === 'Male' ? '/images/avatars/1.png' : '/images/avatars/8.png'} sx={{ mr: 3, width: 34, height: 34 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.fullname}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 120,
            headerName: 'Phone',
            field: 'phone',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.phone}
                </Typography>
            )
        },
        {
            flex: 0.2,
            minWidth: 110,
            field: 'email',
            headerName: 'Email',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.email}
                </Typography>
            )
        },
        {
            flex: 0.1,
            minWidth: 110,
            field: 'result',
            headerName: 'Result',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    <CustomChip
                        skin='light'
                        size='small'
                        label={params.row.result}
                        color={candidateStatusObj[params.row.result]}
                        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
                    />
                </Typography>
            )
        },
        {
            flex: 0.1,
            field: 'datejob',
            minWidth: 80,
            headerName: 'Date job',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.datejob}
                </Typography>
            )
        },
        {
            flex: 0.125,
            field: 'isTryJob',
            minWidth: 100,
            headerName: 'On Job',
            renderCell: (params: GridRenderCellParams) => {
                const color = onJobStatusObj[params.row.isTryJob] ? onJobStatusObj[params.row.isTryJob].color : 'primary'
                return (
                    <CustomAvatar skin='light' color={color} sx={{ width: 34, height: 34 }}>
                        <Icon icon={onJobStatusObj[params.row.isTryJob]?.icon} fontSize='1.25rem' />
                    </CustomAvatar>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }: CellType) => <RowOptions id={row.candidateid} />
        }

    ]

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [filteredData, setFilteredData] = useState<Candidate[] | undefined>([])
    const [searchText, setSearchText] = useState<string>('')


    const escapeRegExp = (value: string) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }
    const handleSearch = (searchValue: string) => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

        const filteredRows = candidate?.filter(row => {
            return Object.keys(row).some(field => {
                // @ts-ignore
                return searchRegex.test(row[field]?.toString())
            })
        })
        if (searchValue.length) {
            setFilteredData(filteredRows)
        } else {
            setFilteredData([])
        }
    }
    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <CardHeader
                                    title='Candidate mangement'
                                    subheader={`Ongoing Projects`}
                                    subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
                                    titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}

                                />
                                <CardContent sx={{ pt: `${theme.spacing(5)} !important` }}>
                                    <DataGrid
                                        autoHeight
                                        columns={columns}
                                        pageSizeOptions={[10, 25, 50]}
                                        paginationModel={paginationModel}
                                        slots={{ toolbar: QuickSearchToolbar }}
                                        onPaginationModelChange={setPaginationModel}
                                        rows={filteredData?.length ? filteredData : (candidate ? candidate : [])}
                                        slotProps={{
                                            baseButton: {
                                                variant: 'outlined'
                                            },
                                            toolbar: {
                                                value: searchText,
                                                clearSearch: () => handleSearch(''),
                                                onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                                            }
                                        }}
                                        getRowId={(row) => row.candidateid}
                                    />
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
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
export default CandidateManagement