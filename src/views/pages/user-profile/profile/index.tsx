// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverivew from '@/views/pages/user-profile/profile/AboutOverivew'

// ** Types
import { Employeeinfo } from '@/context/types'
import { useTranslation } from 'next-i18next'
import ApplicationLeaveForm from './ApplicationLeaveForm'

const ProfileTab = ({ data }: { data: Employeeinfo | null }) => {
  const { t } = useTranslation('common')

  const about = [
    { property: `${t('text-fullname')}`, value: data?.fullname, icon: 'mdi:account-outline' },
    { property: `${t('text-status')}`, value: data?.status === 'A' ? 'active' : 'inactive', icon: 'mdi:check' },
    { property: `${t('text-role')}`, value: data?.role, icon: 'eos-icons:role-binding' },
    { property: `${t('Teams')}`, value: data?.team_description, icon: 'fluent:people-team-16-filled' }
  ]

  const contacts = [
    { property: `${t('text-contact')}`, value: data?.phone, icon: 'mdi:phone-outline' },
    { property: 'Email', value: data?.email, icon: 'mdi:email-outline' },
    { property: `${t('text-address')}`, value: data?.address, icon: 'fa-regular:address-card' }
  ]

  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew
          about={about}
          contacts={contacts}
        />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ApplicationLeaveForm
              employeecd={data?.employeecd}
              currentyear={data.currentyear}
              daysofleaveavailable={data.daysofleaveavailable}
              daysleaveused={data.daysleaveused}
              lastyear={data.lastyear}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
