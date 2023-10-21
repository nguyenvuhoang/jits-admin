import Icon from '@/@core/components/icon'
import CustomChip from '@/@core/components/mui/chip'
import { ThemeColor } from '@/@core/layouts/types'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { ApproveStatus } from '@/@core/utils/approve-status'
import { ApplicationForLeave } from '@/context/types'
import { FetchListOfApplicationForLeave } from '@/data/employee'
import ExportApplicationForLeave from '@/views/table/data-grid/ExportApplicationForLeave'
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { ChangeEvent, MouseEvent, useState } from 'react'

interface CellType {
    row: ApplicationForLeave
}

interface ApplicationForLeaveStatusType {
    [key: string]: ThemeColor
}
const personalStatusObj: ApplicationForLeaveStatusType = {
    A: 'success',
    P: 'warning',
    R: 'error',
    C: 'info'
}


const ApproveForApplicationForLeave = () => {

    const theme = useTheme()

    const { applicationforleave } = FetchListOfApplicationForLeave()

    const { t } = useTranslation('common')

    const RowOptions = ({ id }: { id: string }) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
        const rowOptionsOpen = Boolean(anchorEl)

        const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget)
        }
        const handleRowOptionsClose = () => {
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
                        href={`/apps/form/view/${id}`}
                    >
                        <Icon icon='mdi:eye-outline' fontSize={20} />
                        View
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
            headerName: `${t('text-fullname')}`,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            field: 'startdate',
            headerName: `${t('text-from-date')}`,
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.startdate}
                </Typography>
            )
        },
        {
            flex: 0.2,
            minWidth: 110,
            field: 'enddate',
            headerName: `${t('text-to-date')}`,
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.enddate}
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
            renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
        }

    ]

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [filteredData, setFilteredData] = useState<ApplicationForLeave[] >()
    const [searchText, setSearchText] = useState<string>('')


    const escapeRegExp = (value: string) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }
    const handleSearch = (searchValue: string) => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

        const filteredRows = applicationforleave?.filter(row => {
            
            return Object.keys(row).some(field => {
                // @ts-ignore
                return searchRegex.test(row[field]?.toString())
            })
        })

        if (searchValue.length) {
            setFilteredData(filteredRows!)
        } else {
            setFilteredData(applicationforleave!)
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
                                    title={t('text-approve-application-for-leave')}
                                    subheader={t('text-list-approve-application-for-leave')}
                                    subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
                                    titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
                                />
                                <CardContent sx={{ pt: `${theme.spacing(5)} !important` }}>
                                    <DataGrid
                                        autoHeight
                                        pagination
                                        columns={columns}
                                        pageSizeOptions={[10, 25, 50]}
                                        paginationModel={paginationModel}
                                        slots={{ toolbar: ExportApplicationForLeave }}
                                        onPaginationModelChange={setPaginationModel}
                                        rows={filteredData ? filteredData : (applicationforleave ? applicationforleave : [])}
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
export default ApproveForApplicationForLeave

