// ** Type import
import { HorizontalNavItemsType } from '@/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {

  return [
    {
      icon: 'mdi:home-outline',
      title: 'Dashboards',
      children: [
        {
          icon: 'ant-design:team-outlined',
          title: 'Team',
          path: '/team'
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
        },
        {
          title: 'Management AFL',
          icon: 'material-symbols:order-approve-outline',
          path: '/form/approve-personal-off'
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
      title: 'Blog',
      icon: 'grommet-icons:blog',
      path: '/blog'
    }
  ]
}

export default navigation
