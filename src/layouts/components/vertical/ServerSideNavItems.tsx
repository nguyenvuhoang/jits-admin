import { FetchMenu } from '@/data/system/menu'

const ServerSideNavItems = () => {
  const { menu } = FetchMenu()
  return { menu }
}

export default ServerSideNavItems
