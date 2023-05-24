import Icon from '@/@core/components/icon'
import { Java } from '@/context/types'
import TabPanel from '@mui/lab/TabPanel'
import { Card, CardContent, Chip, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Control, Controller } from 'react-hook-form'


type Props = {
    candidatedtl: Java[] | undefined
    control: any;
}

const SQL = ({ candidatedtl, control }: Props) => {
    return (
        <TabPanel value='sql'>
            <Card>
                <CardContent>
                    {candidatedtl?.map((group, index) => (
                        <Grid container spacing={5} key={index}>
                            <>
                                {group.content.map((controls, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <FormControl sx={{ mt: 5 }}>
                                            <FormLabel focused sx={{ mb: 3 }}>{controls.label.vn}</FormLabel>
                                            <Controller
                                                name='radio'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <>
                                                        <RadioGroup  {...field} aria-label='sql' name='validation-basic-radio'>
                                                            {controls.answer.map((answer, index) => (
                                                                <FormControlLabel key={index}
                                                                    checked={controls.choose === answer.value}
                                                                    value='a'
                                                                    label={answer.key.vn}
                                                                    control={<Radio />}
                                                                    disabled
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </>
                                                )}
                                            />
                                            <Chip
                                                label={`${controls.aswvalue === controls.choose ? 'Chính xác' : 'Không chính xác'}. Đáp án chính xác là ${controls.aswvalue}`}
                                                icon={<Icon icon={controls.aswvalue === controls.choose ? 'icon-park:correct' : 'octicon:repo-deleted-16'} fontSize={16} />}
                                                sx={{ fontSize: '12px', maxWidth: '20rem' }}
                                                color={`${controls.aswvalue === controls.choose ? 'success' : 'error'}`}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </Grid>
                                ))}
                            </>
                        </Grid>
                    ))}
                </CardContent>
            </Card>
        </TabPanel>
    )
}

export default SQL