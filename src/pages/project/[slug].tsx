import CustomAvatar from '@/@core/components/mui/avatar'
import OptionsMenu from '@/@core/components/option-menu'
import { ThemeColor } from '@/@core/layouts/types'
import ApexChartWrapper from '@/@core/styles/libs/react-apexcharts'
import { getInitials } from '@/@core/utils/get-initials'
import { Project, ProjectGitLab } from '@/context/types'
import client from '@/data/client'
import { FetchProject } from '@/data/project'
import QuickSearchToolbar from '@/views/table/data-grid/QuickSearchToolbar'
import { Box, Card, CardContent, CardHeader, Grid, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { ChangeEvent, useState } from 'react'

const DepartmentPage = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
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



    const columns: GridColDef[] = [
        {
            flex: 0.275,
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
            flex: 0.2,
            minWidth: 120,
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
            flex: 0.125,
            field: 'owner',
            minWidth: 80,
            headerName: 'Owner',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.owner}
                </Typography>
            )
        },
        {
            flex: 0.2,
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
            flex: 0.125,
            field: 'create_at',
            minWidth: 80,
            headerName: 'Create date',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.create_at}
                </Typography>
            )
        }

    ]

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const { project } = FetchProject({
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
                                            options={['Refresh', 'Update', 'Share']}
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

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const { slug } = params!
    return {
        props: {
            slug
        }
    }
}
export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: false
    }
}
export default DepartmentPage