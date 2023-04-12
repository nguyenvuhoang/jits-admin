import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// ** Emotion Imports
import { CacheProvider, EmotionCache } from '@emotion/react'
import type { NextPage } from 'next'
import { createEmotionCache } from '@/@core/utils/create-emotion-cache'
import Head from 'next/head'
// ** Config Imports
import { defaultACLObj } from '@/configs/acl'
import themeConfig from '@/configs/themeConfig'
import { SettingsConsumer, SettingsProvider } from '@/@core/context/settingsContext'
import ThemeComponent from '@/@core/theme/ThemeComponent'
import { Router } from 'next/router'
// ** Loader Import
import NProgress from 'nprogress'
import { ReactNode } from 'react'
import GuestGuard from '@/@core/components/GuestGuard'

// ** Spinner Import
import Spinner from '@/@core/components/spinner'
import AuthGuard from '@/@core/components/AuthGuard'
import AclGuard from '@/@core/components/AclGuard'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}
type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}
const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: ExtendedAppProps) {

  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Admin`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Admin Dashboard allowing JITS employees to manage their work.`}
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='keywords' content='JITS Admin' />
      </Head>

      <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
        <SettingsConsumer>
          {({ settings }) => {

            return (
              <ThemeComponent settings={settings}>
                <Guard authGuard={authGuard} guestGuard={guestGuard}>
                  <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                    <Component {...pageProps} />
                  </AclGuard>
                </Guard>

              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>




    </CacheProvider>
  )
}
