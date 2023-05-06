import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, CardContent, LinearProgress, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ProjectListDataType } from '@/types/dashboards/userTypes'

type Props = {}

const Img = styled('img')(({ theme }) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    marginRight: theme.spacing(3)
}))
interface CellType {
    row: ProjectListDataType
}
const columns: GridColDef[] = [
    {
        flex: 0.3,
        minWidth: 230,
        field: 'projectTitle',
        headerName: 'Project',
        renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Img src={row.img} alt={`project-${row.projectTitle}`} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{row.projectTitle}</Typography>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {row.projectType}
                    </Typography>
                </Box>
            </Box>
        )
    },
    {
        flex: 0.15,
        minWidth: 100,
        field: 'totalTask',
        headerName: 'Total Tasks',
        renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.totalTask}</Typography>
    },
    {
        flex: 0.15,
        minWidth: 200,
        headerName: 'Progress',
        field: 'progressValue',
        renderCell: ({ row }: CellType) => (
            <Box sx={{ width: '100%' }}>
                <Typography variant='body2'>{row.progressValue}%</Typography>
                <LinearProgress
                    variant='determinate'
                    value={row.progressValue}
                    color={row.progressColor}
                    sx={{ height: 6, mt: 1, borderRadius: '5px' }}
                />
            </Box>
        )
    },
    {
        flex: 0.15,
        minWidth: 100,
        field: 'hours',
        headerName: 'Hours',
        renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.hours}</Typography>
    }
]
const EmployeeProjectListTable = (props: Props) => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
    const [value, setValue] = useState<string>('')

    return (
        <>
            <Card>
                <CardHeader title="Employee's Projects List" />
            </Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography variant='body2' sx={{ mr: 2 }}>
                        Search:
                    </Typography>
                    <TextField size='small' placeholder='Search Project' value={value} onChange={e => setValue(e.target.value)} />
                </Box>
            </CardContent>
            <DataGrid
                autoHeight
                rows={[]}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[7, 10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />
        </>
    )
}

export default EmployeeProjectListTable