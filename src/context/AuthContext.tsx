// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import { API_ENDPOINTS } from '@/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, Userinfo } from './types'
import client from '@/data/client'
import { AUTH_TOKEN_KEY, setAuthToken } from '@/data/client/token.utils'
import Cookies from 'js-cookie'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  token: null
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<Userinfo | null>(defaultProvider.user)
  const [token, setToken] = useState<string | null>(defaultProvider.token)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = Cookies.get(AUTH_TOKEN_KEY);
      if (storedToken) {
        setLoading(true)
        await axios
          .get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.result })
          })
          .catch(() => {
            setUser(null)
            setLoading(false)
            if (API_ENDPOINTS.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const { username, password, rememberMe } = params
    client.users.login({
      username: username,
      password: password
    }).then(async response => {
      rememberMe ? setAuthToken(response.result.token) : null

      setToken(response.result.token)
      const userdetail = {
        username: username,
        firstname: '',
        lastname: '',
        gender: 1,
        address: '',
        email: '',
        birthday: '',
        phone: '',
        status: '',
        usercreated: '',
        datecreated: '',
        expiretime: '',
        isshow: '',
        failnumber: '',
        fastmode: '',
        scores: 0,
        avatar: '',
        isadmin: response.result.permission[0] === 2 ? true : false,
        role: response.result.permission[0] === 2 ? 'admin' : 'guest',
      }
      setUser({ ...userdetail })
      const returnUrl = router.query.returnUrl

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    Cookies.remove(AUTH_TOKEN_KEY);
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    token
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
