// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import { API_ENDPOINTS } from '@/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, Userinfo, Employeeinfo, CandidateAccessParams } from './types'
import client from '@/data/client'
import { AUTH_TOKEN_KEY, setAuthToken } from '@/data/client/token.utils'
import Cookies from 'js-cookie'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  employee: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  candidateaccess: () => Promise.resolve(),
  token: null,
  isCandidate: false,
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
  const [employee, setEmployee] = useState<Employeeinfo | null>(defaultProvider.employee)
  const [isCandidate, setIsCandidate] = useState<boolean>(defaultProvider.isCandidate)
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = Cookies.get(AUTH_TOKEN_KEY);
      if (storedToken) {
        setLoading(true)
        const candidate = JSON.parse(storedToken)['permission']
        if (candidate[0] !== 'CANDIDATE') {
          await axios
            .get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.meEndpoint, {
              headers: {
                Authorization: `Bearer ${JSON.parse(storedToken)['token']}`
              }
            })
            .then(async response => {
              setLoading(false)
              setUser({ ...response.data.result.data })
            })
            .catch((e) => {
              setUser(null)
              setLoading(false)
              if (API_ENDPOINTS.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                router.replace('/login')
              }
            })

          await axios
            .get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.EMPLOYEE_BYUSERNAME, {
              headers: {
                Authorization: `Bearer ${JSON.parse(storedToken)['token']}`
              }
            })
            .then(async response => {
              setLoading(false)
              setEmployee({ ...response.data.result.data })
            })
            .catch((e) => {
              setEmployee(null)
              setLoading(false)
              if (API_ENDPOINTS.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                router.replace('/login')
              }
            })
        } else {
          setToken(JSON.parse(storedToken)['token'])
          setIsCandidate(true)
          setLoading(false)
          const userdetail = {
            username: '',
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
            isadmin:false,
            role: 'candidate',
          }
          setUser({ ...userdetail })
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const { username, password, rememberMe } = params
    client.users.login({
      username: username,
      password: password
    }).then(async response => {
      rememberMe ? setAuthToken(response.result.data.token, response.result.data.permission) : null

      setToken(response.result.data.token)
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
        isadmin: response.result.data.permission[0] === "ADMIN" ? true : false,
        role: response.result.data.permission[0] === "ADMIN" ? 'admin' : 'guest',
      }
      setUser({ ...userdetail })
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    }).catch(err => {
      console.error(err)
      if (errorCallback) errorCallback(err)
    })
  }

  const handleCandidateAccess = (params: CandidateAccessParams, errorCallback?: ErrCallbackType) => {
    const { email, code } = params
    client.candidate.access({
      email: email,
      code: code
    }).then(async response => {
      setAuthToken(response.result.data.token, response.result.data.permission)
      setToken(response.result.data.token)
      const userdetail = {
        username: '',
        firstname: '',
        lastname: '',
        gender: 1,
        address: '',
        email: email,
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
        isadmin: response.result.data.permission[0] === "ADMIN" ? true : false,
        role: response.result.data.permission[0] === "CANDIDATE" ? 'candidate' : 'guest',
      }
      setUser({ ...userdetail })
      setIsCandidate(true)
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    }).catch(err => {
      console.error(err)
      if (errorCallback) errorCallback(err)
    })
  }


  const handleLogout = () => {
    setUser(null)
    setEmployee(null)
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
    candidateaccess: handleCandidateAccess,
    token,
    employee,
    isCandidate
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
