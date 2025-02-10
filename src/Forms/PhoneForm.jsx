import PhoneVerifyInput from "../Components/PhoneVerifyInput";

import React, { useState } from 'react';
import axios from 'axios';




// Assets
import shield from "../assets/imgs/shield.svg";
import { Ring } from "@react-three/drei";
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export default function PhoneForm() {

    const [error, setError] = useState(null);
    const [phoneValue, setPhoneValue] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const fetchData = async (phoneNumber) => {
        setError(null);
        if (phoneNumber.length !== 10) return setError("الرقم المدخل لا يساوي 10 ارقام رجاءا قم بادخال رقم ملائم")
        if (!phoneNumber.startsWith("05")) return setError("الرقم المدخل لا يبدأ ب 05 رجاءا قم بادخال رقم ملائم")
        setLoading(true);

        try {
            const response = await axios.get('https://api.3ahd.xyz/auth/otpSend/' + phoneNumber);
            navigate('/code?phoneNumber=' + phoneNumber)

        } catch (err) {
            console.log(err)
            if (err.response?.status == 429) {
                setError("لا يمكن ارسال اكثر من طلب خلال خمس دقائق, الرجاء الانتظار");
            } else {
                setError("حصل خطأ ما جرب مرة اخرى في وقت لاحق");
            }

        } finally {
            setLoading(false); // Stop loading spinner

        }
    };
    const handlePhoneValueChange = (newValue) => {
        setPhoneValue(newValue);
    };

    return (
        <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl text-left" dir="ltr">
            <div className="form-head flex flex-col gap-y-4 mb-8">
                <div className="form-icon">
                    <img src={shield} alt="shield icon" />
                </div>
                <div className="form-title font-semibold text-3xl right">
                    ادخل رقم هاتفك من فضلك
                </div>
                <span className="form-note text-primary-light/50 right">
                    لا تقبل ارقام الهواتف التي ليس لديها وصول الى واتس اب
                </span>
                {error && (
                    <div style={{ color: 'red', marginTop: '10px', textAlign: 'right' }}>
                        {error}
                    </div>
                )}
            </div>
            <div>
                <PhoneVerifyInput value={phoneValue} onChange={handlePhoneValueChange} />
            </div>

            {loading && (
                <div className="loading-overlay">
                    <RingLoader color="#36D7B7" loading={loading} size={100} />
                </div>
            )}
            <button className="w-full btn btn-primary mt-8" onClick={() => { fetchData(phoneValue) }}>
                ارسال
            </button>
        </div>
    );
}
