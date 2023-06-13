// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'


// ** Demo Components Imports
import AccountSettings from '@/views/pages/account-settings/AccountSettings'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const AccountSettingsTab = ({ tab }: InferGetStaticPropsType<typeof getStaticProps>) => {


  return <AccountSettings tab={tab} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'security' } },
      { params: { tab: 'billing' } },
      { params: { tab: 'notifications' } },
      { params: { tab: 'connections' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }: GetStaticPropsContext) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common'])),
        tab: params?.tab
      },
      revalidate: 60, // In seconds
    }
  } catch (error) {
    console.log(error)
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
}
export default AccountSettingsTab
