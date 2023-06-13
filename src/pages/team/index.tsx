import themeConfig from '@/configs/themeConfig'
import { FetchEmployeeByTeamcode } from '@/data/employee'
import { Avatar, Box, Button, CardContent, CardContentProps, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const StyledCardContent = styled(CardContent)<CardContentProps>(({ theme }) => ({
    paddingTop: `${theme.spacing(20)} !important`,
    paddingBottom: `${theme.spacing(20)} !important`,
    [theme.breakpoints.up('sm')]: {
        paddingLeft: `${theme.spacing(20)} !important`,
        paddingRight: `${theme.spacing(20)} !important`
    }
}))

const TeamPage = () => {
    const { t } = useTranslation('common')

    const [team, setTeam] = useState('')

    const { employees, refetch } = FetchEmployeeByTeamcode(team)


    const handleChange = (event: SelectChangeEvent) => {
        setTeam(event.target.value as string)
    };

    useEffect(() => {
        refetch()
    }, [team, refetch]);

    const leader = employees?.leader
    const members = employees?.memember

    return (
        <>
            <Head >
                <title>{`${themeConfig.templateName} - Team Profile`}</title>
            </Head>
            <Card>
                <CardContent
                    sx={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundSize: 'cover',
                        py: theme => `${theme.spacing(25)} !important`,
                        backgroundImage: theme => `url(/images/pages/pages-header-bg-${theme.palette.mode}.png)`
                    }}
                >
                    <Typography variant='h5' sx={{ fontWeight: 600, fontSize: '1.5rem !important' }}>
                        {t('text-team-profile')}
                    </Typography>
                    <FormControl sx={{ mt: 6 }}>
                        <InputLabel id='teamcd-select'>Select Team</InputLabel>
                        <Select
                            value={team}
                            sx={{ width: 300, textAlign: 'center', alignItems: 'center' }}
                            id='select-teamcd'
                            label='Select Team'
                            labelId='teamcd-select'
                            onChange={handleChange}
                            inputProps={{ placeholder: 'Select Team' }}
                        >
                            <MenuItem value={undefined}>Select Team</MenuItem>
                            <MenuItem value='CAM'>Cambodia (TSUNAMI)</MenuItem>
                            <MenuItem value='THA'>ThaiLand</MenuItem>
                            <MenuItem value='LAO'>Lao</MenuItem>
                            <MenuItem value='MDW'>Middleware team</MenuItem>
                            <MenuItem value='TEST'>Tester</MenuItem>
                            <MenuItem value='CODEV'>CO-DEV</MenuItem>
                            <MenuItem value='HRHCM'>BO in HCM</MenuItem>
                            <MenuItem value='HRHN'>BO in HN</MenuItem>
                        </Select>

                    </FormControl>
                </CardContent>

                {leader &&

                    <StyledCardContent>
                        <Typography variant='h5' sx={{ mb: 6, fontWeight: 600, textAlign: 'center' }}>
                            {t('text-team-leader')}
                        </Typography>
                        <Grid item xs={12} sm={6} md={4} >
                            <Box
                                sx={{
                                    p: 5,
                                    height: '100%',
                                    display: 'flex',
                                    borderRadius: 1,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    border: theme => `1px solid ${theme.palette.divider}`
                                }}
                            >
                                <Box sx={{ minHeight: 58, display: 'flex' }}>
                                    <Avatar
                                        alt={leader?.fullname}
                                        sx={{ width: 160, height: 160, mb: 5 }}
                                        src={leader?.cover}
                                    />
                                </Box>
                                <Typography variant='h6' sx={{ mb: 1.5, fontWeight: 600 }}>
                                    {leader?.fullname}
                                </Typography>
                                <Typography
                                    sx={{
                                        my: 'auto',
                                        overflow: 'hidden',
                                        WebkitLineClamp: '2',
                                        display: '-webkit-box',
                                        color: 'text.secondary',
                                        textOverflow: 'ellipsis',
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    {leader?.aboutme}
                                </Typography>
                                <Button
                                    sx={{ mt: 4 }}
                                    component={Link}
                                    variant='outlined'
                                    href='/pages/help-center/getting-started/account/changing-your-username'
                                >
                                    Read More
                                </Button>
                            </Box>
                        </Grid>
                    </StyledCardContent>
                }
                {members &&
                    <StyledCardContent sx={{ backgroundColor: 'action.hover' }}>
                        <Typography variant='h5' sx={{ mb: 6, fontWeight: 600, textAlign: 'center' }}>
                            {t('text-team-member')}
                        </Typography>
                        <Grid container spacing={6}>
                            {members.map((member, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index} >
                                    <Box
                                        sx={{
                                            p: 5,
                                            boxShadow: 6,
                                            height: '100%',
                                            display: 'flex',
                                            borderRadius: 1,
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            backgroundColor: 'background.paper',
                                            opacity: `${member.isleave ? 0.5 : 1}`,
                                            position: 'relative', // Thêm thuộc tính position
                                        }}
                                    >
                                        {member.isleave && (
                                            <Box sx={{color: 'primary.main'}}>
                                                <Typography
                                                    variant="h5"
                                                    className="rotating-text"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '35%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: 'inherit'
                                                    }}
                                                >
                                                    OFF TODAY
                                                </Typography>
                                            </Box>
                                        )}
                                        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                alt={member?.fullname}
                                                sx={{ width: 120, height: 120, mb: 5 }}
                                                src={member?.cover}
                                            />
                                            <Typography
                                                variant='h6'
                                                component={Link}
                                                href={`/user-profile/${member.employeecd}`}
                                                sx={{ fontWeight: 600, marginLeft: 5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                                            >
                                                {member.fullname}
                                            </Typography>
                                        </Box>
                                        <Box component='ul' sx={{ mt: 0, mb: 5, pl: 6.75, '& li': { mb: 2, color: 'primary.main' } }}>
                                            <li>
                                                <Typography
                                                    variant='body1'
                                                    sx={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {t('text-birthday')}: {member.birthday}
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant='body1'
                                                    sx={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {t('text-phone')}: {member.phone}
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant='body1'
                                                    sx={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {t('text-email')}: {member.email}
                                                </Typography>
                                            </li>
                                            <li>

                                                <Typography
                                                    variant='body1'
                                                    sx={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {t('text-position')}: {member.position}
                                                </Typography>
                                            </li>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                    </StyledCardContent>
                }
            </Card>
        </>
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

export default TeamPage