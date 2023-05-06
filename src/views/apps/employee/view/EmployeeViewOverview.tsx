import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import EmployeeProjectListTable from './EmployeeProjectListTable'

type Props = {}

const EmployeeViewOverview = (props: Props) => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <EmployeeProjectListTable />
            </Grid>
        </Grid>
    )
}

export default EmployeeViewOverview