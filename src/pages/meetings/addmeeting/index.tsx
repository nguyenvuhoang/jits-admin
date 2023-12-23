import themeConfig from '@/configs/themeConfig'
import { useAuth } from '@/hooks/useAuth'
import { Box, Card, CardContent, CardHeader, Divider, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

import EditorControlled from '@/@core/components/edittor/EditorControlled'
import { Controller, useForm } from 'react-hook-form'


type Props = {}
const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius
}))

const defaultValues = {
    title: '',
    category: 'DAILY',
    description: '',
    image: '',
    introduce: '',
    team: 'CAM'
}


const MeetingPage = (props: Props) => {
    const { t } = useTranslation('common')
    const { user } = useAuth()

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - Add Meetting`}</title>
            </Head>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={t('text-add-meeting')} />
                        <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ImgStyled src={user?.avatar} alt='Profile Pic' />
                                <div>
                                    <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                                        {user?.firstname} {user?.lastname}
                                    </Typography>
                                    <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                                        @{user?.username}
                                    </Typography>
                                </div>
                            </Box>
                        </CardContent>
                        <Divider />

                        <form>
                            <CardContent>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='title'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextField
                                                        value={value}
                                                        label={t('text-title')}
                                                        onChange={onChange}
                                                        placeholder={`${t('text-add-title')}`}
                                                        error={Boolean(errors.title)}
                                                        aria-describedby='validation-title'
                                                    />
                                                )}
                                            />
                                            {errors.title && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-title'>
                                                    {t('text-add-title')}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='team'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <Select
                                                        fullWidth
                                                        value={value}
                                                        id='select-team'
                                                        label='Select team'
                                                        labelId='team-error'
                                                        onChange={onChange}
                                                        aria-describedby='team-error'
                                                    >
                                                        <MenuItem value='CAM'>Cambodia</MenuItem>
                                                        <MenuItem value='LAO'>Lao</MenuItem>
                                                        <MenuItem value='COD'>CoDev</MenuItem>
                                                        <MenuItem value='MDW'>Middleware</MenuItem>
                                                        <MenuItem value='TES'>Test</MenuItem>
                                                        <MenuItem value='OTH'>Other</MenuItem>
                                                    </Select>
                                                )}
                                            />
                                            {errors.category && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-team'>
                                                    Vui lòng chọn đội
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='category'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <Select
                                                        fullWidth
                                                        value={value}
                                                        id='select-category'
                                                        label='Select category'
                                                        labelId='category-error'
                                                        onChange={onChange}
                                                        aria-describedby='category-error'
                                                    >
                                                        <MenuItem value='DAILY'>Daily meeting</MenuItem>
                                                        <MenuItem value='WEEKLY'>Weekly meeting</MenuItem>
                                                    </Select>
                                                )}
                                            />
                                            {errors.category && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-category'>
                                                    Vui lòng chọn loại cuộc họp
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={12} sx={{ marginTop: 10 }}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='image'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <EditorControlled />
                                                )}
                                            />
                                            {errors.image && (
                                                <FormHelperText sx={{ color: 'error.main' }} id='validation-image'>
                                                    Vui lòng chọn hình ảnh
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </form>

                    </Card>
                </Grid>
            </Grid>
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
export default MeetingPage