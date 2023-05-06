// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import EmployeeViewLeft from '@/views/apps/employee/view/EmployeeViewLeft'
import { EmployeeDetail } from '@/context/types'
import EmployeeViewRight from './EmployeeViewRight'

type Props = {
  employeecd: string
  employee?: EmployeeDetail
}

const EmployeeView = ({ employeecd, employee }: Props) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <EmployeeViewLeft employeecd={employeecd} employee={employee} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <EmployeeViewRight employeecd={employeecd} employee={employee} />
      </Grid>
    </Grid>
  )
}

export default EmployeeView
