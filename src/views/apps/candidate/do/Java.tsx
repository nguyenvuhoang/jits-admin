import { Java } from '@/context/types'
import TabPanel from '@mui/lab/TabPanel'
import { Card, CardContent, FormHelperText, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useEffect, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'


type Props = {
    question: Java[] | undefined
    errors: any
    setIsJavaValid: any
    control: any
}
type SelectedValues = {
    [key: string]: string | undefined;
};
const Java = ({ question, control, errors, setIsJavaValid }: Props) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValues>({});

    const handleChange = (name: string, value: string) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const watchedJavaValues = useWatch({control});

    console.log(watchedJavaValues)
    useEffect(() => {
        if (Object.keys(watchedJavaValues).length !== 0) {
            let hasKey = false;
            for (const key in watchedJavaValues) {
                if (key.startsWith('NET')) {
                    hasKey = true;
                    break;
                }
            }
            if (hasKey) {
                const allJavaValuesSelected = Object.values(watchedJavaValues).every(value => value !== undefined);
                setIsJavaValid(allJavaValuesSelected);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedJavaValues]);

    return (
        <TabPanel value='java'>
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

export default Java