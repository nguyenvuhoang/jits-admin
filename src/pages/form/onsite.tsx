import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'

type Props = {}

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: '90vw'
    }
}))

const Img = styled('img')(({ theme }) => ({
    marginTop: theme.spacing(15),
    [theme.breakpoints.down('lg')]: {
        height: 450,
        marginTop: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
        height: 400
    }
}))

const OnsitePage = (props: Props) => {
    return (
        <Box className='content-center'>
            <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BoxWrapper>
                    <Box sx={{ mb: 10, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
                            We are launching soon 🚀
                        </Typography>
                        <Typography variant='body2'>
                            Our website is opening soon. Please register to get notified when it&prime;s ready!
                        </Typography>
                    </Box>
                    <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField autoFocus size='small' type='email' sx={{ mr: 6 }} placeholder='Enter your email' />
                            <Button type='submit' variant='contained'>
                                Notify
                            </Button>
                        </Box>
                    </form>
                </BoxWrapper>
                <Img alt='coming-soon' src='/images/misc/commingsoon.gif' />
            </Box>
        </Box>
    )
}
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
export default OnsitePage