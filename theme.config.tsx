import { DocsThemeConfig } from 'nextra-theme-docs'
const config: DocsThemeConfig =
{
  docsRepositoryBase: 'https://github.com/shuding/nextra/blob/master', // base URL for the docs repository
  darkMode: false,
  search: {
    placeholder: "Tìm kiếm"
  },
  primaryHue: 200,
  primarySaturation: 100,
  footer: {
    component: false
  },
  logo: (
    <>
      <svg>...</svg>
    </>
  ),

  logoLink: false,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="JITS - documentation" />
      <meta name="og:title" content="JITS - documentation" />
    </>
  ),
  navbar: {
    component: (
      <div style={{ background: '#2D3048' }}>

      </div>
    )
  },
  feedback: {
    content: (
      <></>
    )
  },
  editLink: {
    component: () => {
      return (
        <></>
      )
    }
  }

}
export default config