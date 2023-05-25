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
      title: 'Project',
      children: [
        {
          title: 'Solution Delivery Dept',
          icon: 'mdi:cog-outline',
          path: '/project/solution-delivery-dept'
        }
      ]
    },
    {
      icon: 'mdi:text-box',
      title: 'Forms',
      children: [
        {
          title: 'Application for leave',
          icon: 'mdi:text-box-remove',
          path: '/form/personal-off'
        }
      ]
    },
    {
      icon: 'mdi:badge-account-horizontal-outline',
      title: 'Candidate',
      children: [
        {
          title: 'Candidate management',
          icon: 'mdi:bag-personal-off',
          path: '/candidate/management'
        },
        {
          title: 'Create candidate profile',
          icon: 'fluent:form-new-48-regular',
          path: '/candidate/create-profile'
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
