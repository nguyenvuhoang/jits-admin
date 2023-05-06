// ** Type import
import { HorizontalNavItemsType } from '@/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'mdi:home-outline',
      title: 'Dashboards',
      children: [
        {
          icon: 'mdi:chart-donut',
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          icon: 'mdi:account-group',
          title: 'Employee management',
          path: '/dashboards/employee-management'
        }
      ]
    },
    {
      icon: 'mdi:apps',
      title: 'Department',
      children: [
        {
          title: 'Solution Delivery Dept',
          icon: 'mdi:cog-outline',
          path: '/apps/email'
        }
      ]
    },
    {
      title: 'Others',
      icon: 'mdi:dots-horizontal',
      children: [
        {
          title: 'Raise Support',
          icon: 'mdi:lifebuoy',
          externalLink: true,
          openInNewTab: true,
          path: 'https://anhben.com/support'
        },
        {
          title: 'Documentation',
          icon: 'mdi:file-document-outline',
          externalLink: true,
          openInNewTab: true,
          path: 'https://anhben.com/documentation'
        }
      ]
    }
  ]
}

export default navigation
