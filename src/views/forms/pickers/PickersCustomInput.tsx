/* eslint-disable react/display-name */
// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import { SxProps, Theme } from '@mui/material';

interface PickerProps {
  label?: string
  readOnly?: boolean
  sx?: SxProps<Theme>;
}

const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})

export default PickersComponent
