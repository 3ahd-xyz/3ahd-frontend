// Assets
import shield from "../assets/imgs/shield.svg";
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import axios from 'axios';


export default function CodeForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);


    useEffect(() => {
        const phoneNumber = searchParams.get('phoneNumber');

        if (!phoneNumber || phoneNumber.length !== 10) {
            navigate('/signIn');
        }
    }, [searchParams, navigate]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const verify = async () => {
        let phoneNumber = searchParams.get('phoneNumber');
        setError(null);
        if (inputValue.length !== 6) return setError("الرقم المدخل لا يساوي 6 ارقام رجاءا قم بادخال رقم ملائم")
        setLoading(true);

        try {
            const response = await axios.get('https://api.3ahd.xyz/auth/login/' + phoneNumber + '?otp=' + inputValue);
            if (response?.status == 220) { // sign up
                navigate('/details?phoneNumber=' + phoneNumber + '&otp=' + inputValue);

            } else {
                try {
                    const response = await axios.get('https://api.3ahd.xyz/userBusId?phoneNumber=' + phoneNumber + '&otpCode=' + inputValue);
                    console.log(response);
                    if (response.data == null) {
                        navigate('/buses?phoneNumber=' + phoneNumber + '&otp=' + inputValue);
                    } else {
                        navigate('/alreadybooked');

                    }
                } catch (err) {
                    if (err.response?.status == 420) { // otp Error
                        setLoading(false);
                        setError('رمز التحقق خاطئ');

                    } else {
                        setLoading(false);
                        setError("حصل خطأ ما جرب مرة اخرى في وقت لاحق");
                    }
                }
            }

        } catch (err) {
            console.log(err)
            if (err.response?.status == 420) { // otp Error
                setLoading(false);
                setError('رمز التحقق خاطئ');

            } else {
                setLoading(false);
                setError("حصل خطأ ما جرب مرة اخرى في وقت لاحق");
            }

        } finally {
            setLoading(false); // Stop loading spinner

        }
    }



    return (
        <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl">
            <div className="form-head flex flex-col gap-y-4 mb-8">
                <div className="form-icon">
                    <img src={shield} alt="shield icon" />
                </div>
                <div className="form-title font-semibold text-3xl">
                    ادخل كود التَأْكيد
                </div>
                <span className="form-note text-primary-light/50">
                    ادخل الكود الذي وصلك على الواتس اب
                </span>
                {error && (
                    <div style={{ color: 'red', marginTop: '10px', textAlign: 'right' }}>
                        {error}
                    </div>
                )}
            </div>


            {loading && (
                <div className="loading-overlay">
                    <RingLoader color="#36D7B7" loading={loading} size={100} />
                </div>
            )}

            <div className="form-box">
                <input id="code" type="text" className="form-input" placeholder=" " value={inputValue} onChange={handleChange} />
                <label htmlFor="code" className="form-label">
                    كود التَأْكيد
                </label>
            </div>

            {/*<div className="text-right w-full">

            <span className="flex inline-block">
                 <button className="text-xs mt-2 text-primary-light/30" onClick={()=>{alert('wlak')}}>اعادة ارسال</button> 
                <resendBtn/>

            </span>
            </div>*/}


            <div className="flex gap-x-4">
                <button className="w-full btn btn-secondary mt-8" onClick={() => { navigate('/signIn') }}>
                    رقم هاتف مختلف
                </button>
                <button className="w-full btn btn-primary mt-8" onClick={() => {
                    verify()
                }}>
                    تأكيد
                </button>
            </div>
        </div>
    );
}