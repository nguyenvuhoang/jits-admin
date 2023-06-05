// ** Type import
import { HorizontalNavItemsType } from '@/@core/layouts/types'
import { FetchMenu } from '@/data/system/menu'

const navigation = (): HorizontalNavItemsType => {
  const { menu } = FetchMenu()
  return menu!
}

export default navigation
