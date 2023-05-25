import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CustomPhoneNumber from './PhoneNumber'

import {
	E164Number
} from 'libphonenumber-js/core';

type Props = {
    value: any
    onChange: (value?: E164Number | undefined) => void
}

const CustomerPhone = ({ value, onChange }: Props) => {
    return (
        <PhoneInput
            value={value}
            onChange={onChange}
            defaultCountry="VN"
            id="phone-input"
            inputComponent ={
                CustomPhoneNumber
            }
        />
    )
}

export default CustomerPhone