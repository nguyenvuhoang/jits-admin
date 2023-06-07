// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import UserProfile from '@/views/pages/user-profile/UserProfile'

// ** Types
import { useAuth } from '@/hooks/useAuth'

const UserProfileTab = ({ tab, data }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const {employee} = useAuth()
  console.log(employee)

  return ( 
    <>
      <UserProfile tab={tab} employeeprofile={employee} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'profile' } },
      { params: { tab: 'teams' } },
      { params: { tab: 'projects' } },
      { params: { tab: 'connections' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {

  return {
    props: {
      tab: params?.tab
    }
  }
}

export default UserProfileTab
