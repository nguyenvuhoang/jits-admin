import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// ** Emotion Imports
import { createEmotionCache } from '@/@core/utils/create-emotion-cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import type { NextPage } from 'next'
import Head from 'next/head'
// ** Config Imports
import { SettingsConsumer, SettingsProvider } from '@/@core/context/settingsContext'
import ThemeComponent from '@/@core/theme/ThemeComponent'
import { defaultACLObj } from '@/configs/acl'
import themeConfig from '@/configs/themeConfig'
import { Router } from 'next/router'
// ** Loader Import
import GuestGuard from '@/@core/components/GuestGuard'
import NProgress from 'nprogress'
import { ReactNode, useState } from 'react'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** Spinner Import
import AclGuard from '@/@core/components/AclGuard'
import AuthGuard from '@/@core/components/AuthGuard'
import Spinner from '@/@core/components/spinner'
import ReactHotToast from '@/@core/styles/libs/react-hot-toast'
import UserLayout from '@/layouts/UserLayout.tsx'

// ** Third Party Import
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

// ** Store Imports
import { store } from '@/store'
import { Provider } from 'react-redux'

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import "react-datepicker/dist/react-datepicker.css";


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

  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)


  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
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

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        <QueryClientProvider client={queryClient}>
                          <Hydrate state={pageProps.dehydratedState}>
                            {getLayout(<Component {...pageProps} />)}
                          </Hydrate>
                          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                        </QueryClientProvider>
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  )
}
