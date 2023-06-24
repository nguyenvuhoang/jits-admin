// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Type Import
import { Settings } from '@/@core/context/settingsContext'

// ** Components
import Autocomplete from '@/layouts/components/Autocomplete'
import ModeToggler from '@/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '@/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from '@/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from '@/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown, { ShortcutsType } from '@/@core/layouts/components/shared-components/ShortcutsDropdown'

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
        {auth.user && <Autocomplete hidden={hidden} settings={settings} />}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {auth.user && (
          <>
            <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
            {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
            <UserDropdown settings={settings} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
