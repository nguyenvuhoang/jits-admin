// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Type Import
import { LayoutProps } from '@/@core/layouts/types'

// ** Theme Config Import
import themeConfig from '@/configs/themeConfig'

interface Props {
  hidden: LayoutProps['hidden']
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  appBarContent: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['content']
  appBarBranding: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['branding']
}

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const { appBarContent: userAppBarContent, appBarBranding: userAppBarBranding } = props

  // ** Hooks
  const theme = useTheme()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userAppBarBranding ? (
        userAppBarBranding(props)
      ) : (
        <LinkStyled href='/'>
          <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48.6087 48.9203H6.12715V5.95867H48.7405V24.2382H54.8281V0H0L0.03953 55H54.8676V30.4793H48.78L48.6087 48.9203Z" fill="#F16623" />
            <path d="M55.5524 25.0853H34.2704C33.3207 22.3818 30.7792 20.4314 27.7561 20.4314C23.9171 20.4314 20.8137 23.552 20.8137 27.4123C20.8137 31.2592 23.9171 34.3932 27.7561 34.3932C30.7658 34.3932 33.3073 32.4429 34.2704 29.7393H38.3502V33.9897H40.3968V32.5639H43.8212V33.9897H46.0551V29.7393H55.5524L57.9601 27.4796L55.5524 25.0853ZM27.7561 29.7393C26.472 29.7393 25.442 28.6901 25.442 27.4123C25.442 26.1345 26.472 25.0853 27.7561 25.0853C29.0402 25.0853 30.0702 26.1345 30.0702 27.4123C30.0702 28.6901 29.0402 29.7393 27.7561 29.7393Z" fill="#F16623" />
          </svg>

          
        </LinkStyled>
      )}
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
