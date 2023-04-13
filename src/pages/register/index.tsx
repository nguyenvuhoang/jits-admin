// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from '@/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from '@/@core/hooks/useSettings'

// ** Demo Imports
import { LogoLight } from '@/@core/components/svg'
import FooterIllustrationsV2 from '@/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
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

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    marginBottom: theme.spacing(4),
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const Register = () => {
    // ** States
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // ** Hooks
    const theme = useTheme()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    // ** Vars
    const { skin } = settings

    const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

    return (
        <Box className='content-right'>
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <RegisterIllustrationWrapper>
                        <RegisterIllustration
                            alt='register-illustration'
                            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                        />
                    </RegisterIllustrationWrapper>
                    <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
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
                            <TypographyStyled variant='h5'>Adventure starts here 🚀</TypographyStyled>
                            <Typography variant='body2'>Make your app management easy and fun!</Typography>
                        </Box>
                        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                            <TextField autoFocus fullWidth sx={{ mb: 4 }} label='Username' placeholder='johndoe' />
                            <TextField fullWidth label='Email' sx={{ mb: 4 }} placeholder='user@email.com' />
                            <FormControl fullWidth>
                                <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                                <OutlinedInput
                                    label='Password'
                                    id='auth-login-v2-password'
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControlLabel
                                control={<Checkbox />}
                                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                                label={
                                    <>
                                        <Typography variant='body2' component='span'>
                                            I agree to{' '}
                                        </Typography>
                                        <LinkStyled href='/' onClick={e => e.preventDefault()}>
                                            privacy policy & terms
                                        </LinkStyled>
                                    </>
                                }
                            />
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                Sign up
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
                                <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                    Sign in instead
                                </Typography>
                            </Box>
                        </form>
                    </BoxWrapper>
                </Box>
            </RightWrapper>
        </Box>
    )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
