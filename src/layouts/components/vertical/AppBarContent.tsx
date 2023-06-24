// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Type Import
import { Settings } from '@/@core/context/settingsContext'

// ** Components
import LanguageDropdown from '@/@core/layouts/components/shared-components/LanguageDropdown'
import ModeToggler from '@/@core/layouts/components/shared-components/ModeToggler'

import { ShortcutsType } from '@/@core/layouts/components/shared-components/ShortcutsDropdown'
import UserDropdown from '@/@core/layouts/components/shared-components/UserDropdown'

// ** Hook Import
import { useAuth } from '@/hooks/useAuth'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
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
    title: 'Invoice App',
    url: '/apps/invoice/list',
    subtitle: 'Manage Accounts',
    icon: 'mdi:receipt-text-outline'
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
  },
  {
    title: 'Dialogs',
    subtitle: 'Useful Dialogs',
    icon: 'mdi:window-maximize',
    url: '/pages/dialog-examples'
  }
]

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {auth.user && (
          <>
            {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
            <UserDropdown settings={settings} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
