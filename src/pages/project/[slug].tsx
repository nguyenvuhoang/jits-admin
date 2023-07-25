import CustomAvatar from '@/@core/components/mui/avatar'
import OptionsMenu from '@/@core/components/option-menu'
import Spinner from '@/@core/components/spinner'
import { ThemeColor } from '@/@core/layouts/types'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { getInitials } from '@/@core/utils/get-initials'
import { ProjectGitLab } from '@/context/types'
import { FetchProject } from '@/data/project'
import QuickSearchToolbar from '@/views/table/data-grid/QuickSearchToolbar'
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { Icon } from '@iconify/react';
import Link from 'next/link'

const ProjectPage = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const theme = useTheme()

    const renderClient = (params: GridRenderCellParams) => {
        const { row } = params!
        const stateNum = Math.floor(Math.random() * 6)
        const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
        const color = states[stateNum]

        if (row.avatar_url) {
            return <CustomAvatar src={`${row.avatar_url}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
        } else {
            return (
                <CustomAvatar
                    skin='light'
                    color={color as ThemeColor}
                    sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
                >
                    {getInitials(row.full_name ? row.full_name : 'John Doe')}
                </CustomAvatar>
            )
        }
    }


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
                        href={`/project/projectdetail/${id}`}
                    >
                        <Icon icon='akar-icons:edit' fontSize={20} />
                        View
                    </MenuItem>
                </Menu>
            </>
        )
    }

    const columns: GridColDef[] = [
        {
            flex: 0.15,
            minWidth: 290,
            field: 'name',
            headerName: 'Name',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderClient(params)}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.name}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 50,
            headerName: 'Group',
            field: 'group_name',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.group_name}
                </Typography>
            )
        },
        {
            flex: 0.1,
            minWidth: 110,
            field: 'total_issue',
            headerName: 'Total issue',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.total_issue}
                </Typography>
            )
        },
        {
            flex: 0.1,
            minWidth: 110,
            field: 'total_issue_open',
            headerName: 'Total issue open',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.total_issue_open}
                </Typography>
            )
        },
        {
            flex: 0.1,
            minWidth: 110,
            field: 'total_issue_close',
            headerName: 'Total issue close',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.total_issue_close}
                </Typography>
            )
        },
        {
            flex: 0.1,
            field: 'create_at',
            minWidth: 80,
            headerName: 'Create date',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.create_at}
                </Typography>
            )
        },
        {
            flex: 0.1,
            field: 'lastupdate',
            minWidth: 80,
            headerName: 'Last update',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.lastupdate}
                </Typography>
            )
        },
        {
            flex: 0.3,
            field: 'lastcomment',
            minWidth: 80,
            headerName: 'Last comment',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.lastcomment}
                </Typography>
            )
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }: GridRenderCellParams) => <RowOptions id={row.fullPath} />
        }



    ]

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const { project, isLoading } = FetchProject({
        per_page: 100,
        page: 0,
        order_by: "last_activity_at"
    })

    const [searchText, setSearchText] = useState<string>('')
    const [filteredData, setFilteredData] = useState<ProjectGitLab[] | undefined>([])

    const escapeRegExp = (value: string) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }
    const handleSearch = (searchValue: string) => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

        const filteredRows = project?.filter(row => {
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

    if (isLoading) return <Spinner />

    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <CardHeader
                                    title='Project List'
                                    subheader='3 Ongoing Projects'
                                    subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
                                    titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
                                    action={
                                        <OptionsMenu
                                            options={['Refresh']}
                                            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
                                        />
                                    }
                                />
                                <CardContent sx={{ pt: `${theme.spacing(5)} !important` }}>
                                    <DataGrid
                                        autoHeight
                                        columns={columns}
                                        pageSizeOptions={[10, 25, 50]}
                                        paginationModel={paginationModel}
                                        slots={{ toolbar: QuickSearchToolbar }}
                                        onPaginationModelChange={setPaginationModel}
                                        rows={filteredData?.length ? filteredData : (project ? project : [])}
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

export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
    const { slug } = params!
    return {
        props: {
            slug,
            ...(await serverSideTranslations(locale!, ['common'])),
        }
    }
}
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
export default ProjectPage