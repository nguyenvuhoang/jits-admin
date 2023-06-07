// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverivew from '@/views/pages/user-profile/profile/AboutOverivew'
import ActivityTimeline from '@/views/pages/user-profile/profile/ActivityTimeline'
import ProjectsTable from '@/views/pages/user-profile/profile/ProjectsTable'

// ** Types
import { Employeeinfo } from '@/context/types'

const ProfileTab = ({ data }: { data: Employeeinfo | null }) => {
  const about = [
    { property: 'Full Name', value: 'John Doe', icon: 'mdi:account-outline' },
    { property: 'Status', value: 'active', icon: 'mdi:check' },
    { property: 'Role', value: 'Developer', icon: 'mdi:star-outline' },
    { property: 'Country', value: 'USA', icon: 'mdi:flag-outline' },
    { property: 'Language', value: 'English', icon: 'mdi:translate' }
  ]

  const contacts= [
    { property: 'Contact', value: '(123) 456-7890', icon: 'mdi:phone-outline' },
    { property: 'Skype', value: 'john.doe', icon: 'mdi:message-outline' },
    { property: 'Email', value: 'john.doe@example.com', icon: 'mdi:email-outline' }
  ]
  const overview = [
    { property: 'Task Compiled', value: '13.5k', icon: 'mdi:check' },
    { property: 'Connections', value: '897', icon: 'mdi:account-outline' },
    { property: 'Projects Compiled', value: '146', icon: 'mdi:view-grid-plus-outline' }
  ]

  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew
          about={about}
          contacts={contacts}
          overview={overview} 
        />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
          {/* <ConnectionsTeams connections={data.connections} teams={data.teamsTech} /> */}
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
