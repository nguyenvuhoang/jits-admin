/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  else if (role === 'candidate') return '/candidate/dotest'
  else return '/dashboards'
}

export default getHomeRoute
