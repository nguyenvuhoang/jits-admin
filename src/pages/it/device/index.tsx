import CustomAvatar from '@/@core/components/mui/avatar';
import Spinner from '@/@core/components/spinner';
import { ThemeColor } from '@/@core/layouts/types';
import themeConfig from '@/configs/themeConfig';
import { DeviceInfo } from '@/context/types';
import { FetchDevice } from '@/data/device';
import TableHeader from '@/views/apps/it/device/TableHeader';
import { Icon } from '@iconify/react';
import { Box, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Typography, styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

interface CellType {
    row: DeviceInfo
}

interface TypeStatusObj {
    [key: string]: {
        icon: string
        color: ThemeColor
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

const DevicePage = () => {
    const { t } = useTranslation('common')

    const [value, setValue] = useState<string>('')
    const [refresh, setRefresh] = useState(false)

    const [type, setType] = useState<string>('')
    const handleTypeChange = useCallback((e: SelectChangeEvent) => {
        setType(e.target.value)
    }, [])

    const [department, setDepartment] = useState<string>('')
    const handleDepartmentChange = useCallback((e: SelectChangeEvent) => {
        setDepartment(e.target.value)
    }, [])

    const [office, setOffice] = useState<string>('')
    const handleOfficeChange = useCallback((e: SelectChangeEvent) => {
        setOffice(e.target.value)
    }, [])


    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })


    const { device, isLoading, refetch } = FetchDevice()

    const toggleAddUEmployeeDrawer = () => { }

    const filter = {
        departmentcd: department,
        officecd: office,
        type: type
    }

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, refresh])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])


    const typeStatusObj: TypeStatusObj = {
        'Laptop': { color: 'primary', icon: 'material-symbols:computer-outline' },
        'Phone & Ipad': { color: 'success', icon: 'bi:phone' },
        'Screen': { color: 'info', icon: 'carbon:screen' }
    }

    const renderClient = (row: DeviceInfo) => {
        const color = typeStatusObj[row.type] ? typeStatusObj[row.type].color : 'primary'
        return (
            <CustomAvatar skin='light' color={color} sx={{ width: 34, height: 34 }}>
                <Icon icon={typeStatusObj[row.type].icon} fontSize='1.25rem' />
            </CustomAvatar>
        )
    }

    const renderSpecification = (row: DeviceInfo) => {

        switch (row.type) {
            case 'Laptop': return `${row.chip} / ${row.ram} / ${row.disk}`
            case 'Screen': return `${row.resolution} / ${row.size}}`
            default: return ''
        }
    }

    const columns: GridColDef[] = [

        {
            flex: 0.2,
            minWidth: 230,
            field: 'deviceid',
            headerName: `${ t('text-code') } `,
            renderCell: ({ row }: CellType) => {
                const { deviceid } = row
                return (

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderClient(row)}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: 3 }}>
                            <Typography noWrap variant='caption'>
                                {deviceid}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 120,
            headerName: `${ t('text-device-name') } `,
            field: 'name',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
                        {row.name}
                    </Typography>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'buydate',
            headerName: `${ t('text-buydate') } `,
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.buydate}
                    </Typography>
                )
            }
        },
        {
            flex: 0.15,
            field: 'price',
            minWidth: 150,
            headerName: `${ t('text-price') } `,
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {`${ row.price.toLocaleString('en-US') } VND`}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            field: 'specifications',
            minWidth: 150,
            headerName: `${ t('text-specifications') } `,
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {renderSpecification(row)}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            field: 'owner',
            minWidth: 150,
            headerName: `${ t('text-owner') } `,
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.owner}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            field: 'officecd',
            minWidth: 150,
            headerName: `${ t('text-office') } `,
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.officecd}
                        </Typography>
                    </Box>
                )
            }
        }
    ]



    if (isLoading) return <Spinner />

    return (
        <>
            <Head>
                <title>{`${ themeConfig.templateName } - Device management`}</title>
            </Head>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Employee management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
                        <CardContent>
                            <Grid container spacing={6}>
                                <Grid item sm={4} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id='status-select'>{t('text-select-office')}</InputLabel>
                                        <Select
                                            fullWidth
                                            value={office}
                                            id='select-status'
                                            label={t('text-select-office')}
                                            labelId='status-select'
                                            onChange={handleOfficeChange}
                                            inputProps={{ placeholder: `${ t('text-select-office') } ` }}
                                        >
                                            <MenuItem value=''>{t('text-select-office')}</MenuItem>
                                            <MenuItem value='office0101'>Hồ Chí Minh - Nguyễn Hữu Thọ</MenuItem>
                                            <MenuItem value='office0102'>Hồ Chí Minh - Nguyễn Hữu Cảnh</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id='team-select'>{t('text-select-department')}</InputLabel>
                                        <Select
                                            fullWidth
                                            value={department}
                                            id='select-team'
                                            label={t('text-select-department')}
                                            labelId='team-select'
                                            onChange={handleDepartmentChange}
                                            inputProps={{ placeholder: 'Select Team' }}
                                        >
                                            <MenuItem value=''>{t('text-select-department')}</MenuItem>
                                            <MenuItem value='RND-HCM'>RND-Hồ Chí Minh</MenuItem>
                                            <MenuItem value='RND-HCM'>RND-Hà Nội</MenuItem>
                                            <MenuItem value='SDD'>Phòng Triển khai</MenuItem>
                                            <MenuItem value='HR'>Hành Chính Nhân Sự</MenuItem>
                                            
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id='role-select'>{t('text-select-type')}</InputLabel>
                                        <Select
                                            fullWidth
                                            value={type}
                                            id='select-role'
                                            label={t('text-select-type')}
                                            labelId='role-select'
                                            onChange={handleTypeChange}
                                            inputProps={{ placeholder: 'Select Role' }}
                                        >
                                            <MenuItem value=''>{t('text-select-type')}</MenuItem>
                                            <MenuItem value='Laptop'>Laptop</MenuItem>
                                            <MenuItem value='Phone & Ipad'>Phone & Ipad</MenuItem>
                                            <MenuItem value='Screen'>Screen</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                

                            </Grid>
                        </CardContent>
                        <Divider />
                        <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUEmployeeDrawer} />
                        {device &&
                            <DataGrid
                                autoHeight
                                pagination
                                pageSizeOptions={[10, 25, 50]}
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                columns={columns}
                                rows={device}
                                getRowId={(row) => row.deviceid}
                            />
                        }
                    </Card>
                </Grid>

            </Grid>
        </>
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

export default DevicePage