// ** Type import
import { VerticalNavItemsType } from '@/@core/layouts/types'
import { FetchMenu } from '@/data/system/menu'

const navigation = (): VerticalNavItemsType => {
  const { menu } = FetchMenu()
  return menu!
}

export default navigation
