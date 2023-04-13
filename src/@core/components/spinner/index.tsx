// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { LogoLight } from '../svg'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg width="183" height="55" viewBox="0 0 183 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48.6087 48.9203H6.12715V5.95867H48.7405V24.2382H54.8281V0H0L0.03953 55H54.8676V30.4793H48.78L48.6087 48.9203Z" fill="#F16623" />
        <path d="M55.5524 25.0853H34.2704C33.3207 22.3818 30.7792 20.4314 27.7561 20.4314C23.9171 20.4314 20.8137 23.552 20.8137 27.4123C20.8137 31.2592 23.9171 34.3932 27.7561 34.3932C30.7658 34.3932 33.3073 32.4429 34.2704 29.7393H38.3502V33.9897H40.3968V32.5639H43.8212V33.9897H46.0551V29.7393H55.5524L57.9601 27.4796L55.5524 25.0853ZM27.7561 29.7393C26.472 29.7393 25.442 28.6901 25.442 27.4123C25.442 26.1345 26.472 25.0853 27.7561 25.0853C29.0402 25.0853 30.0702 26.1345 30.0702 27.4123C30.0702 28.6901 29.0402 29.7393 27.7561 29.7393Z" fill="#F16623" />
        <path d="M112.121 20.594H107.707V18.7109H112.121V20.594Z" fill="#F16623" />
        <path d="M135.316 20.594H130.608V18.7109H135.316V20.594Z" fill="#F16623" />
        <path d="M175.687 9.14738C175.7 8.25963 175.994 7.53329 176.596 6.94146C177.171 6.36308 177.894 6.05371 178.763 6.05371C179.633 6.06716 180.368 6.36308 180.943 6.94146C181.519 7.51984 181.813 8.25963 181.826 9.13393C181.813 10.0082 181.519 10.7346 180.943 11.3129C180.368 11.9048 179.633 12.2141 178.763 12.2141C177.894 12.2007 177.185 11.9048 176.596 11.3129C175.994 10.7346 175.7 10.0082 175.687 9.14738ZM175.847 9.14738C175.86 9.96787 176.141 10.6539 176.703 11.2053C177.252 11.7703 177.934 12.0527 178.75 12.0662C179.579 12.0527 180.261 11.7703 180.81 11.2053C181.358 10.6539 181.639 9.96787 181.652 9.13393C181.639 8.29998 181.358 7.61399 180.81 7.06252C180.261 6.51104 179.579 6.21512 178.75 6.21512C177.934 6.22857 177.252 6.51104 176.703 7.06252C176.141 7.61399 175.86 8.31343 175.847 9.14738ZM177.72 7.42568H178.883C179.659 7.43914 180.047 7.76195 180.047 8.38069C180.047 8.6766 179.954 8.89181 179.78 9.03977C179.592 9.18773 179.378 9.28188 179.138 9.29534L180.221 10.9632H180.007L178.95 9.30879C178.87 9.30879 178.79 9.32224 178.696 9.32224H177.894V10.9767H177.733V7.42568H177.72ZM178.736 9.16083C178.857 9.16083 178.991 9.14738 179.124 9.12048C179.191 9.10703 179.258 9.09357 179.325 9.08012C179.378 9.05322 179.445 9.03977 179.499 9.01287C179.619 8.95907 179.713 8.87836 179.78 8.77076C179.847 8.66315 179.887 8.52864 179.887 8.35378C179.887 8.17893 179.86 8.04442 179.806 7.95026C179.753 7.84266 179.673 7.76195 179.579 7.70815C179.378 7.60054 179.151 7.54674 178.87 7.56019H177.894V9.13393H178.736V9.16083Z" fill="#F16623" />
        <path d="M178.75 12.4025C177.84 12.3891 177.064 12.0662 176.462 11.4475C175.833 10.8288 175.512 10.0621 175.512 9.14743C175.526 8.21933 175.847 7.43919 176.476 6.82046C177.091 6.20172 177.853 5.89236 178.763 5.87891C179.686 5.89236 180.462 6.20172 181.077 6.82046C181.692 7.43919 182 8.21933 182.013 9.13398C182 10.0486 181.692 10.8288 181.077 11.4475C180.448 12.0662 179.673 12.3891 178.75 12.4025ZM178.75 6.39003C177.974 6.40348 177.345 6.65905 176.823 7.18363C176.288 7.7082 176.034 8.35384 176.021 9.13398C176.034 9.91412 176.288 10.5463 176.823 11.0709C177.345 11.6089 177.974 11.8645 178.75 11.8779C179.525 11.8645 180.154 11.6089 180.676 11.0709C181.197 10.5463 181.465 9.91412 181.465 9.12053C181.452 8.34039 181.197 7.69475 180.676 7.17018C180.167 6.65905 179.539 6.40348 178.75 6.39003ZM180.529 11.1516H179.9L178.843 9.49715C178.79 9.49715 178.736 9.49715 178.683 9.49715H178.054V11.1516H177.532V7.25088H178.87C179.98 7.26433 180.221 7.88306 180.208 8.39419C180.194 8.74391 180.087 9.01292 179.873 9.20124C179.739 9.32229 179.579 9.403 179.405 9.44335L180.529 11.1516ZM178.054 8.98602H178.723C178.843 8.98602 178.95 8.97257 179.084 8.95912C179.151 8.94567 179.204 8.93222 179.271 8.91877C179.311 8.90532 179.365 8.87842 179.418 8.86497C179.499 8.82461 179.566 8.77081 179.606 8.70356C179.659 8.62285 179.686 8.51525 179.686 8.38074C179.686 8.23278 179.673 8.12518 179.632 8.04447C179.592 7.97722 179.539 7.92342 179.472 7.88306C179.311 7.80236 179.124 7.74856 178.897 7.74856H178.054V8.98602Z" fill="#F16623" />
        <path d="M74.5871 19.4647C74.5871 21.1057 74.2125 22.3567 73.4501 23.2175C72.701 24.0918 71.6041 24.5222 70.1729 24.5222C69.5308 24.5222 68.9422 24.4146 68.3938 24.186V21.6034C68.862 21.9666 69.3837 22.1414 69.9722 22.1414C71.2162 22.1414 71.8449 21.2133 71.8449 19.3437V12.0938H74.5737V19.4647H74.5871Z" fill="#F16623" />
        <path d="M85.4087 19.0209C85.4087 22.6929 83.8437 24.5222 80.7002 24.5222C77.6504 24.5222 76.1255 22.7333 76.1255 19.1554V12.0938H78.6536V19.1823C78.6536 21.1595 79.3626 22.1414 80.7805 22.1414C82.1716 22.1414 82.8672 21.1864 82.8672 19.2764V12.0938H85.3954V19.0209H85.4087Z" fill="#F16623" />
        <path d="M106.155 14.34H102.744V24.307H100.042V14.34H96.6448V12.0938H106.155V14.34Z" fill="#F16623" />
        <path d="M116.564 24.307H113.673V12.0938H116.564V24.307Z" fill="#F16623" />
        <path d="M129.056 24.307H126.287L121.271 16.6401C120.977 16.1962 120.776 15.86 120.656 15.6313H120.616C120.656 16.0617 120.682 16.7208 120.682 17.6085V24.3205H118.087V12.0938H121.044L125.872 19.532C126.1 19.8683 126.301 20.2045 126.488 20.5274H126.528C126.488 20.2449 126.461 19.68 126.461 18.846V12.0938H129.056V24.307Z" fill="#F16623" />
        <path d="M146.365 14.34H142.954V24.307H140.252V14.34H136.854V12.0938H146.365V14.34Z" fill="#F16623" />
        <path d="M150.58 24.307H147.89V12.0938H150.58V24.307Z" fill="#F16623" />
        <path d="M165.948 24.307H163.26V17.0033C163.26 16.2097 163.3 15.3488 163.367 14.3938H163.3C163.153 15.1471 163.032 15.6851 162.925 16.0079L160.103 24.307H157.882L155.006 16.0886C154.926 15.8734 154.806 15.295 154.632 14.3804H154.552C154.618 15.5775 154.659 16.6401 154.659 17.5413V24.2936H152.211V12.0938H156.197L158.658 19.3302C158.859 19.9086 158.993 20.487 159.086 21.0788H159.14C159.287 20.4063 159.447 19.8145 159.621 19.3168L162.083 12.0938H165.962V24.307H165.948Z" fill="#F16623" />
        <path d="M173.961 24.307H167.487V12.0938H173.68V14.34H170.443V17.0571H173.399V19.2899H170.443V22.0876H173.961V24.307Z" fill="#F16623" />
        <path d="M87.2946 23.8479V21.1713C87.7092 21.6824 88.0169 21.8841 88.5787 22.0859C89.1405 22.2877 89.7157 22.3953 90.2909 22.3953C90.6253 22.3953 90.9196 22.3684 91.1737 22.3011C91.4279 22.2339 91.6419 22.1532 91.8024 22.0456C91.9763 21.9379 92.0967 21.8034 92.177 21.6555C92.2572 21.5075 92.2974 21.3461 92.2974 21.1713C92.2974 20.9426 92.2305 20.7274 92.0967 20.5391C91.963 20.3508 91.7757 20.1894 91.5483 20.0279C91.3209 19.8665 91.04 19.7186 90.7323 19.5706C90.4113 19.4227 90.0769 19.2747 89.7157 19.1267C88.7794 18.7367 88.0838 18.2659 87.629 17.701C87.1742 17.136 86.9468 16.4635 86.9468 15.6565C86.9468 15.0377 87.0672 14.4997 87.3213 14.0424C87.5755 13.585 87.9099 13.2219 88.3379 12.9394C88.766 12.6569 89.2609 12.4417 89.8361 12.2938C90.4113 12.1727 91.0132 12.1055 91.6419 12.1055C92.2572 12.1055 92.819 12.1458 93.2872 12.2131C93.7688 12.2938 94.2102 12.4014 94.6115 12.5628V15.0646C94.4109 14.9301 94.1968 14.8091 93.956 14.7015C93.7153 14.5939 93.4745 14.5131 93.2337 14.4324C92.9796 14.3652 92.7388 14.3114 92.4846 14.2845C92.2439 14.2576 92.0031 14.2307 91.7757 14.2307C91.468 14.2307 91.1871 14.2576 90.9463 14.3248C90.6922 14.3786 90.4915 14.4593 90.3176 14.567C90.1437 14.6746 90.01 14.7956 89.9164 14.9436C89.8227 15.0915 89.7692 15.2529 89.7692 15.4412C89.7692 15.643 89.8227 15.8179 89.9297 15.9793C90.0367 16.1407 90.1839 16.2886 90.3845 16.4366C90.5852 16.5846 90.8126 16.7191 91.0935 16.8536C91.3744 16.9881 91.6821 17.136 92.0298 17.2705C92.5114 17.4723 92.9394 17.6875 93.314 17.9162C93.6885 18.1448 94.0229 18.4004 94.2905 18.6829C94.558 18.9653 94.772 19.2882 94.9192 19.6513C95.0663 20.0145 95.1332 20.4449 95.1332 20.9291C95.1332 21.6017 95.0128 22.1666 94.7586 22.6105C94.5045 23.0678 94.1701 23.431 93.7286 23.7134C93.3006 23.9959 92.7923 24.1977 92.2171 24.3187C91.6419 24.4398 91.04 24.507 90.3979 24.507C89.7425 24.507 89.1271 24.4532 88.5252 24.3456C87.95 24.238 87.7226 24.0632 87.2946 23.8479Z" fill="#F16623" />
        <path d="M116.67 37.3941C116.67 41.0662 115.104 42.8955 111.961 42.8955C108.911 42.8955 107.386 41.1065 107.386 37.5286V30.4805H109.914V37.569C109.914 39.5463 110.623 40.5282 112.041 40.5282C113.432 40.5282 114.128 39.5732 114.128 37.6632V30.4805H116.656V37.3941H116.67Z" fill="#F16623" />
        <path d="M74.9215 42.2091V39.5324C75.3362 40.0435 75.6438 40.2453 76.2057 40.447C76.7675 40.6488 77.3427 40.7564 77.9178 40.7564C78.2523 40.7564 78.5465 40.7295 78.8007 40.6622C79.0548 40.595 79.2689 40.5143 79.4294 40.4067C79.6033 40.2991 79.7237 40.1645 79.8039 40.0166C79.8842 39.8686 79.9243 39.7072 79.9243 39.5324C79.9243 39.3037 79.8574 39.0885 79.7237 38.9002C79.5899 38.7119 79.4026 38.5505 79.1752 38.3891C78.9478 38.2276 78.6669 38.0797 78.3593 37.9317C78.0382 37.7838 77.7038 37.6358 77.3427 37.4879C76.4063 37.0978 75.7107 36.627 75.2559 36.0621C74.8011 35.4971 74.5737 34.8246 74.5737 34.0176C74.5737 33.3988 74.6941 32.8608 74.9483 32.4035C75.2024 31.9462 75.5368 31.583 75.9649 31.3005C76.3929 31.0181 76.8879 30.8028 77.463 30.6549C78.0249 30.5204 78.6268 30.4531 79.2555 30.4531C79.8708 30.4531 80.4326 30.4935 80.9008 30.5607C81.3823 30.6414 81.8238 30.749 82.2251 30.9104V33.4123C82.0244 33.2778 81.8104 33.1567 81.5696 33.0491C81.3288 32.9415 81.0881 32.8608 80.8473 32.7801C80.5931 32.7128 80.3524 32.659 80.0982 32.6321C79.8574 32.6052 79.6167 32.5783 79.3893 32.5783C79.0816 32.5783 78.8007 32.6052 78.5599 32.6725C78.3191 32.7398 78.1051 32.807 77.9312 32.9146C77.7573 33.0222 77.6236 33.1433 77.5299 33.2912C77.4363 33.4392 77.3828 33.6006 77.3828 33.7889C77.3828 33.9907 77.4363 34.1655 77.5433 34.3269C77.6503 34.4883 77.7975 34.6363 77.9981 34.7843C78.1988 34.9322 78.4262 35.0667 78.7071 35.2012C78.988 35.3357 79.2956 35.4837 79.6434 35.6182C80.125 35.82 80.553 36.0352 80.9276 36.2638C81.3021 36.4925 81.6365 36.7481 81.904 37.0305C82.1716 37.313 82.3856 37.6358 82.5327 37.999C82.6799 38.3622 82.7467 38.7926 82.7467 39.2768C82.7467 39.9493 82.6264 40.5143 82.3722 40.9581C82.1181 41.4155 81.7836 41.7786 81.3422 42.0611C80.9142 42.3436 80.4059 42.5453 79.8307 42.6664C79.2555 42.7874 78.6536 42.8547 78.0115 42.8547C77.356 42.8547 76.7407 42.8009 76.1388 42.6933C75.577 42.5991 75.3496 42.4377 74.9215 42.2091Z" fill="#F16623" />
        <path d="M159.688 42.2091V39.5324C160.103 40.0435 160.41 40.2453 160.972 40.447C161.534 40.6488 162.109 40.7564 162.684 40.7564C163.019 40.7564 163.313 40.7295 163.567 40.6622C163.821 40.595 164.035 40.5143 164.196 40.4067C164.37 40.2991 164.49 40.1645 164.571 40.0166C164.651 39.8686 164.691 39.7072 164.691 39.5324C164.691 39.3037 164.624 39.0885 164.49 38.9002C164.357 38.7119 164.169 38.5505 163.942 38.3891C163.714 38.2276 163.434 38.0797 163.126 37.9317C162.805 37.7838 162.47 37.6358 162.109 37.4879C161.173 37.0978 160.477 36.627 160.023 36.0621C159.568 35.4971 159.34 34.8246 159.34 34.0176C159.34 33.3988 159.461 32.8608 159.715 32.4035C159.969 31.9462 160.303 31.583 160.731 31.3005C161.16 31.0181 161.654 30.8028 162.23 30.6549C162.805 30.5069 163.393 30.4531 164.022 30.4531C164.637 30.4531 165.199 30.4935 165.667 30.5607C166.149 30.6414 166.59 30.749 166.992 30.9104V33.4123C166.791 33.2778 166.577 33.1567 166.336 33.0491C166.095 32.9415 165.855 32.8608 165.614 32.7801C165.36 32.7128 165.119 32.659 164.865 32.6321C164.624 32.6052 164.383 32.5783 164.156 32.5783C163.848 32.5783 163.567 32.6052 163.327 32.6725C163.072 32.7263 162.872 32.807 162.698 32.9146C162.524 33.0222 162.39 33.1433 162.297 33.2912C162.203 33.4392 162.149 33.6006 162.149 33.7889C162.149 33.9907 162.203 34.1655 162.31 34.3269C162.417 34.4883 162.564 34.6363 162.765 34.7843C162.965 34.9322 163.193 35.0667 163.474 35.2012C163.755 35.3357 164.062 35.4837 164.41 35.6182C164.892 35.82 165.32 36.0352 165.694 36.2638C166.069 36.4925 166.403 36.7481 166.671 37.0305C166.938 37.313 167.152 37.6358 167.299 37.999C167.446 38.3622 167.513 38.7926 167.513 39.2768C167.513 39.9493 167.393 40.5143 167.139 40.9581C166.885 41.4155 166.55 41.7786 166.109 42.0611C165.681 42.3436 165.172 42.5453 164.597 42.6664C164.022 42.7874 163.42 42.8547 162.778 42.8547C162.123 42.8547 161.507 42.8009 160.905 42.6933C160.344 42.5991 160.116 42.4377 159.688 42.2091Z" fill="#F16623" />
        <path d="M90.3847 42.8799C88.5923 42.8799 87.1343 42.3149 86.0106 41.1985C84.887 40.0821 84.3252 38.6294 84.3252 36.827C84.3252 34.9305 84.9004 33.3971 86.0374 32.2269C87.1878 31.0567 88.6993 30.4648 90.5854 30.4648C92.3644 30.4648 93.8091 31.0298 94.9193 32.1462C96.0162 33.2626 96.578 34.7422 96.578 36.5849C96.578 38.468 96.0028 39.988 94.8658 41.1447C93.7155 42.3015 92.2307 42.8799 90.3847 42.8799ZM90.5051 32.8053C89.5153 32.8053 88.726 33.155 88.1509 33.8679C87.5623 34.5808 87.2814 35.5223 87.2814 36.6925C87.2814 37.8762 87.5757 38.8177 88.1509 39.5172C88.726 40.2032 89.4885 40.5529 90.4382 40.5529C91.4147 40.5529 92.1772 40.2166 92.7524 39.5441C93.3275 38.8715 93.6085 37.9434 93.6085 36.7463C93.6085 35.5089 93.3275 34.5404 92.7791 33.841C92.2307 33.155 91.4682 32.8053 90.5051 32.8053Z" fill="#F16623" />
        <path d="M139.342 42.8799C137.55 42.8799 136.092 42.3149 134.968 41.1985C133.845 40.0821 133.283 38.6294 133.283 36.827C133.283 34.9305 133.858 33.3971 134.995 32.2269C136.146 31.0567 137.657 30.4648 139.543 30.4648C141.322 30.4648 142.767 31.0298 143.877 32.1462C144.974 33.2626 145.536 34.7422 145.536 36.5849C145.536 38.468 144.961 39.988 143.824 41.1447C142.673 42.3015 141.188 42.8799 139.342 42.8799ZM139.476 32.8053C138.486 32.8053 137.697 33.155 137.122 33.8679C136.533 34.5808 136.253 35.5223 136.253 36.6925C136.253 37.8762 136.547 38.8177 137.122 39.5172C137.697 40.2032 138.46 40.5529 139.409 40.5529C140.386 40.5529 141.148 40.2166 141.723 39.5441C142.299 38.8715 142.58 37.9434 142.58 36.7463C142.58 35.5089 142.299 34.5404 141.75 33.841C141.188 33.155 140.426 32.8053 139.476 32.8053Z" fill="#F16623" />
        <path d="M105.848 42.679H98.1831V30.5195H100.872V40.4596H105.848V42.679V42.679Z" fill="#F16623" />
        <path d="M127.504 32.7111H124.174V42.705H121.538V32.7111H118.234V30.4648H127.504V32.7111Z" fill="#F16623" />
        <path d="M131.733 42.6798H129.043V30.4531H131.733V42.6798Z" fill="#F16623" />
        <path d="M157.815 42.6803H155.1L150.191 35.0134C149.896 34.5695 149.709 34.2332 149.589 34.0046H149.562C149.602 34.435 149.629 35.0941 149.629 35.9818V42.6937H147.087V30.4805H149.977L154.712 37.9187C154.926 38.255 155.127 38.5913 155.314 38.9141H155.341C155.301 38.6316 155.274 38.0667 155.274 37.2327V30.4805H157.815V42.6803Z" fill="#F16623" />
      </svg>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
