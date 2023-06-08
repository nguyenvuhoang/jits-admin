// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import UserProfile from '@/views/pages/user-profile/UserProfile'

// ** Types
import { useAuth } from '@/hooks/useAuth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const UserProfileTab = ({ tab }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const { employee } = useAuth()
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
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }: GetStaticPropsContext) => {
  try {
    return {
      props: {
        tab: params?.tab,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    console.log(error)
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }

}

export default UserProfileTab
