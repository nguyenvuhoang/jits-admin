// ** React Import

// ** Icon Imports
import Icon from '@/@core/components/icon';

// ** Third Party Import

// ** Custom Components Imports
import OptionsMenu from '@/@core/components/option-menu';

// ** Type Import
import { Settings } from '@/@core/context/settingsContext';
import { useRouter } from 'next/router';

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const router = useRouter();
  const { locale } = router
  // ** Vars
  const { layout } = settings

  const handleLangItemClick = (lang: 'en' | 'vn') => {
    router.push(router.pathname, router.asPath, {
      locale: lang,
      scroll: false
    })
  }


  return (
    <OptionsMenu
      icon={<Icon icon='mdi:translate' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: locale === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: 'Vietnam',
          menuItemProps: {
            sx: { py: 2 },
            selected: locale === 'vn',
            onClick: () => {
              handleLangItemClick('vn')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
