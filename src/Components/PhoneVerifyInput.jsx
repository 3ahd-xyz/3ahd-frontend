import { useState } from 'react';
import './PhoneVerifyInput.css';

export default function PhoneVerifyInput({ value, onChange })  {

    const handleChange = (e) => {
        const input = e.target.value;
        // Allow only numbers
        if (/^\d*$/.test(input)) {
            onChange(input);
        }
    };

    return (
        <div className="form-box">
            <div className="PhoneInput">
                <input
                    id="phone"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="رقم الهاتف"
                    className="PhoneInputInput"
                    maxLength={10} // Adjust length as needed
                />
            </div>
        </div>
    );
}
