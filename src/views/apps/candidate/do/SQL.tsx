import { Java } from '@/context/types'
import TabPanel from '@mui/lab/TabPanel'
import { Card, CardContent, FormHelperText, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useState } from 'react'
import { Controller } from 'react-hook-form'


type Props = {
    question: Java[] | undefined
    control: any
    errors: any,
    setValue: any
}
type SelectedValues = {
    [key: string]: string | undefined;
};
const SQL = ({ question, control, errors }: Props) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValues>({});

    const handleChange = (name: string, value: string) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <TabPanel value='sql'>
            <Card>
                <CardContent>
                    {question?.map((group, index) => (
                        <Grid container spacing={5} key={index}>
                            <>
                                {group.content.map((controls, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <FormControl sx={{ mt: 5 }}>
                                            <FormLabel sx={{ mb: 3, color: '#04a8f9' }} >{controls.label.vn}</FormLabel>
                                            <Controller
                                                name={controls.name}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <>
                                                        <RadioGroup
                                                            {...field}
                                                            value={selectedValues[controls.name] || ''}
                                                            onChange={(event) => {
                                                                field.onChange(event.target.value);
                                                                handleChange(controls.name, event.target.value);
                                                            }}
                                                        >
                                                            {controls.answer.map((answer, index) => (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    value={answer.value}
                                                                    label={answer.key.vn}
                                                                    control={<Radio />}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </>
                                                )}
                                            />

                                            {errors[controls.name] && (
                                                <FormHelperText sx={{ color: 'error.main', fontSize: '14px' }} id={controls.name}>
                                                    Vui lòng chọn một đáp án
                                                </FormHelperText>
                                            )}

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