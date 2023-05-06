import { Box, Button, Card, CardHeader, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { MouseEvent, useState } from 'react'
import Icon from '@/@core/components/icon'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import CustomAvatar from '@/@core/components/mui/avatar'
import Link from 'next/link'
import OptionsMenu from '@/@core/components/option-menu'
import { TaskType } from '@/types/dashboards/employeeType'

type Props = {}

interface CellType {
    row: TaskType   
}
const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main
}))
const columns: GridColDef[] = [
    {
        flex: 0.2,
        field: 'id',
        minWidth: 90,
        headerName: '# ID',
        renderCell: ({ row }: CellType) => <LinkStyled href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</LinkStyled>
    },
    {
        flex: 0.25,
        minWidth: 90,
        field: 'issuename',
        headerName: 'Issue',
        renderCell: ({ row }: CellType) => <Typography variant='body2'>${row.issuename}</Typography>
    },
    {
        flex: 0.3,
        minWidth: 125,
        field: 'issueddate',
        headerName: 'Issued Date',
        renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.issueddate}</Typography>
    }
]


const EmployeeViewTask = (props: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

    const open = Boolean(anchorEl)
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title='Task List'
                    sx={{ '& .MuiCardHeader-action': { m: 0 } }}
                    action={
                        <>
                            <Button
                                variant='contained'
                                aria-haspopup='true'
                                onClick={handleClick}
                                aria-expanded={open ? 'true' : undefined}
                                endIcon={<Icon icon='mdi:chevron-down' />}
                                aria-controls={open ? 'user-view-overview-export' : undefined}
                            >
                                Export
                            </Button>
                            <Menu open={open} anchorEl={anchorEl} onClose={handleClose} id='user-view-overview-export'>
                                <MenuItem onClick={handleClose}>PDF</MenuItem>
                                <MenuItem onClick={handleClose}>XLSX</MenuItem>
                                <MenuItem onClick={handleClose}>CSV</MenuItem>
                            </Menu>
                        </>
                    }
                />
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={[]}
                    disableRowSelectionOnClick
                    pageSizeOptions={[7, 10, 25, 50]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                />
            </Card>
        </Grid>
    )
}

export default EmployeeViewTask