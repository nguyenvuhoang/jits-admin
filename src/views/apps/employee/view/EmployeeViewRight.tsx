import Icon from '@/@core/components/icon'
import { EmployeeDetail } from '@/context/types'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import MuiTab, { TabProps } from '@mui/material/Tab'
import { styled } from '@mui/material/styles'
import { SyntheticEvent, useState } from 'react'
import EmployeeViewOverview from './EmployeeViewOverview'
import EmployeeViewTask from './EmployeeViewTask'

type Props = {
    employeecd: string
    employee?: EmployeeDetail
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
    minHeight: 48,
    flexDirection: 'row',
    '& svg': {
        marginBottom: '0 !important',
        marginRight: theme.spacing(1)
    }
}))


const EmployeeViewRight = ({ employeecd, employee }: Props) => {
    const [activeTab, setActiveTab] = useState<string>('project')

    const handleChange = (event: SyntheticEvent, value: string) => {
        setActiveTab(value)
    }

    return (
        <TabContext value={activeTab}>
            <TabList
                variant='scrollable'
                scrollButtons='auto'
                onChange={handleChange}
                aria-label='forced scroll tabs example'
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
                <Tab value='project' label='Project' icon={<Icon icon='mdi:bookmark-outline' />} />
                <Tab value='task' label='Task' icon={<Icon icon='mdi:link-variant' />} />
            </TabList>
            <Box sx={{ mt: 6 }}>
                <TabPanel sx={{ p: 0 }} value='project'>
                    <EmployeeViewOverview />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='task'>
                    <EmployeeViewTask />
                </TabPanel>
            </Box>
        </TabContext >
    )
}

export default EmployeeViewRight