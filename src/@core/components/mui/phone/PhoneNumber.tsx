import { TextField } from '@mui/material'
import { forwardRef } from 'react'



const CustomPhoneNumber = (props: any, ref: any) => {

    return (

        <TextField
            {...props}
            inputRef={ref}
            fullWidth
            label='Số điện thoại'
            variant='outlined'
            name='phone'
        />
    )
}
export default forwardRef(CustomPhoneNumber)