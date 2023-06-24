// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from '@/@core/context/settingsContext'

// ** Components
import LanguageDropdown from '@/@core/layouts/components/shared-components/LanguageDropdown'
import ModeToggler from '@/@core/layouts/components/shared-components/ModeToggler'
import NotificationDropdown from '@/@core/layouts/components/shared-components/NotificationDropdown'
import { ShortcutsType } from '@/@core/layouts/components/shared-components/ShortcutsDropdown'
import UserDropdown from '@/@core/layouts/components/shared-components/UserDropdown'

// ** Hook Import
import { useAuth } from '@/hooks/useAuth'
import { FetchNotification } from '@/data/employee'

interface Props {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
}

const shortcuts: ShortcutsType[] = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    subtitle: 'Appointments',
    icon: 'mdi:calendar-month-outline'
  },
  {
    title: 'Users',
    url: '/apps/user/list',
    subtitle: 'Manage Users',
    icon: 'mdi:account-outline'
  },
  {
    url: '/apps/roles',
    title: 'Role Management',
    subtitle: 'Permissions',
    icon: 'mdi:shield-check-outline'
  },
  {
    url: '/',
    title: 'Dashboard',
    icon: 'mdi:chart-pie',
    subtitle: 'User Dashboard'
  },
  {
    title: 'Settings',
    icon: 'mdi:cog-outline',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    title: 'Help Center',
    subtitle: 'FAQs & Articles',
    icon: 'mdi:help-circle-outline',
    url: '/pages/help-center'
  }
]

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings } = props

  // ** Hook
  const auth = useAuth()

  const { notification } = FetchNotification()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {
        !auth.isCandidate ?
          <>

            <LanguageDropdown settings={settings} saveSettings={saveSettings} />
            <ModeToggler settings={settings} saveSettings={saveSettings} />
            {auth.user && (
              <>
                <NotificationDropdown settings={settings} notifications={notification} />
                <UserDropdown settings={settings} />
              </>
            )}
          </>
          :
          <></>
      }
    </Box>
  )
}

export default AppBarContent
