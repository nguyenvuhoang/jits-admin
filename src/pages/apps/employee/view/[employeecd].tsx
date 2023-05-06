// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'


// ** Demo Components Imports
import UserViewPage from '@/views/apps/employee/view/EmployeeViewPage'
import { FetchEmployeeByCode } from '@/data/employee'
import client from '@/data/client'
import { useEffect } from 'react'
import Head from 'next/head'
import themeConfig from '@/configs/themeConfig'

const EmployeeView = ({ employeecd, employeedtl }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const { employeesdtl, refetch } = FetchEmployeeByCode(employeecd, employeedtl)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeecd])

  return (
    <>
      <Head >
        <title>{`${themeConfig.templateName} - User Detail`}</title>
      </Head>
      <UserViewPage employeecd = {employeecd } employee={employeesdtl} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { employeecd } = params!
  const employeedtl = await client.employee.getbycode({ employeecd: employeecd })
  return {
    props: {
      employeedtl: employeedtl,
      employeecd: employeecd
    }
  }
}

export default EmployeeView
