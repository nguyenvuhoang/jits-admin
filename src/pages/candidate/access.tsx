// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Imports

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Hooks
import { useSettings } from '@/@core/hooks/useSettings'
import { useAuth } from '@/hooks/useAuth'

// ** Configs
import themeConfig from '@/configs/themeConfig'

// ** Layout Import
import BlankLayout from '@/@core/layouts/BlankLayout'

// ** Demo Imports
import { LogoLight } from '@/@core/components/svg'
import FooterIllustrationsV2 from '@/views/pages/auth/FooterIllustrationsV2'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
    maxWidth: '48rem',
    [theme.breakpoints.down('xl')]: {
        maxWidth: '38rem'
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: '30rem'
    }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 400
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 450
    }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: 400
    }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: '0.18px',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))


const schema = yup.object().shape({
    email: yup.string().required(),
    code: yup.string().min(6).required()
})


interface FormData {
    email: string | string[] | undefined
    code: string
}

const CandidateAccess = () => {

    // ** Hooks
    const auth = useAuth()
    const theme = useTheme()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    const { query } = useRouter()

    // ** Vars
    const { skin } = settings

    const defaultValues = {
        email: query.email,
        code: ''
    }

    const {
        control,
        setError,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: FormData) => {
        const { email, code } = data
        auth.candidateaccess({ email, code }, () => {
            setError('email', {
                type: 'manual',
                message: 'Email or Code is invalid'
            })
        })
    }
    const initData = (email: string | string[] | undefined) => {
        setValue('email', email || '')
    }

    useEffect(() => {
        initData(query.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

    return (
        <Box className='content-right'>
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <LoginIllustrationWrapper>
                        <LoginIllustration
                            alt='login-illustration'
                            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                        />
                    </LoginIllustrationWrapper>
                    <FooterIllustrationsV2 />
                </Box>
            ) : null}
            <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
                <Box
                    sx={{
                        p: 7,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.paper'
                    }}
                >
                    <BoxWrapper>
                        <Box
                            sx={{
                                top: 30,
                                left: 40,
                                display: 'flex',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <LogoLight width={183} height={55} />

                        </Box>
                        <Box sx={{ mb: 6 }}>
                            <TypographyStyled variant='h5'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
                            <Typography variant='body2'>Please input access code to start the test</Typography>
                        </Box>

                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Email'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            InputProps={{
                                                value: query.email,
                                                readOnly: true
                                            }}
                                        />
                                    )}
                                />
                                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='code'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Code'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.code)}
                                            placeholder='123456'
                                            autoComplete='code'
                                        />
                                    )}
                                />
                                {errors.code && <FormHelperText sx={{ color: 'error.main' }}>{errors.code.message}</FormHelperText>}
                            </FormControl>
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                Access
                            </Button>


                        </form>
                    </BoxWrapper>
                </Box>
            </RightWrapper>
        </Box>
    )
}

CandidateAccess.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CandidateAccess.guestGuard = true


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        return {
            props: {
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
};

export default CandidateAccess
