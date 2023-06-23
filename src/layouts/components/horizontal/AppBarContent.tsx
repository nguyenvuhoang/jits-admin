// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from '@/@core/context/settingsContext'

// ** Components
import LanguageDropdown from '@/@core/layouts/components/shared-components/LanguageDropdown'
import ModeToggler from '@/@core/layouts/components/shared-components/ModeToggler'
import NotificationDropdown, {
  NotificationsType
} from '@/@core/layouts/components/shared-components/NotificationDropdown'
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

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Xin nghỉ phép🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Ngô Văn Đang Xin nghỉ phép từ ngày 6/23/2023 12:00:00 AMđến ngày 6/23/2023 12:00:00 AM'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

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
