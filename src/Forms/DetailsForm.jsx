// Date picker for birthday picking
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/styles/calendar.css';

// Assets
import { useState } from "react";
import userInfoIcon from "../assets/imgs/info.svg";
import React from 'react';
import { RingLoader } from 'react-spinners';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';


export default function DetailsForm() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);
    const phoneNumber = searchParams.get('phoneNumber');
    const otp = searchParams.get('otp');

    const navigate = useNavigate();

    const towens = [
        { id: 1, name: 'طمرة' }

    ];

    // get the date from the input and initialize the date picker
    const [birthDateValue, onChange] = useState(new Date('2025-01-01'));
    // const formattedBirthDate = birthDateValue.toISOString().split('T')[0];
    const formattedBirthDate = `${birthDateValue.getFullYear()}-${(birthDateValue.getMonth() + 1).toString().padStart(2, '0')}-${birthDateValue.getDate().toString().padStart(2, '0')}`;

    const handleSubmit = async () => {
        const firstName = document.getElementById('firstName').value;
        const familyName = document.getElementById('familyName').value;
        const yearOfBirth = document.getElementById('yearOfBirth').value;


        const town = "طمرة"; // to be worked on after ramadan..


        const userDetails = {
            phoneNumber: phoneNumber,
            otpCode: otp,
            firstName: firstName,
            familyName: familyName,
            yearOfBirth: yearOfBirth,
            town: town
        };

        try {
            const response = await axios.post('https://api.3ahd.xyz/userDetails', userDetails);
            navigate('/buses?phoneNumber=' + phoneNumber + "&otp=" + otp);

        } catch (err) {
            console.log(err)
            if (err.response?.status == 400) {
                setError("تأخرت في التسجيل, التسجيل متاح لمدة خمسة دقائق فقط بعد تلقيك لرمز التحقق رجاءا حاول مرة اخرى");
            } else {
                setError("حصل خطأ ما جرب مرة اخرى في وقت لاحق");
            }

        } finally {
            setLoading(false); // Stop loading spinner

        }
    }

    const getDateFromInput = (date) => {
        onChange(date);
        setDatePicker(false);
    }

    const [datePicker, setDatePicker] = useState(false);
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 99;
    const maxYear = currentYear - 16;
    const [yearOfBirth, setYearOfBirth] = useState("");

    // Generate options for years dynamically
    const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);



    return (
        <div className="card-box flex-grow-0 w-full lg:w-4/5 xl:w-3/5 max-w-7xl">
            <div className="form-head flex flex-col gap-y-4 mb-8">
                <div className="form-icon">
                    <img src={userInfoIcon} alt="shield icon" />
                </div>
                <div className="form-title font-semibold text-3xl">
                    ادخل بياناتك الشخصية من فضلك
                </div>
                <span className="form-note text-primary-light/50">
                    هذه البيانات ستبقى بسرية تامة ولن يتم ظهورها علنا
                </span>
            </div>
            {error && (
                <div style={{ color: 'red', marginBottom: '30px', textAlign: 'right' }}>
                    {error}
                </div>
            )}
            {loading && (
                <div className="loading-overlay">
                    <RingLoader color="#36D7B7" loading={loading} size={100} />
                </div>
            )}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row flex-1 gap-4">
                    <div className="form-box">
                        <input id="firstName" type="text" className="form-input missing" placeholder=" " />
                        <label htmlFor="firstName" className="form-label">
                            الاسم الاول
                        </label>
                    </div>
                    <div className="form-box">
                        <input id="familyName" type="text" className="form-input" placeholder=" " />
                        <label htmlFor="familyName" className="form-label">
                            اسم العائلة
                        </label>
                    </div>
                </div>
                <div className="form-box">
                    <select className="form-input pt-4" id="yearOfBirth"
                        value={yearOfBirth}
                        onChange={(e) => setYearOfBirth(e.target.value)} >
                        <option disabled >سنة الميلاد</option>
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="yearOfBirth" className="form-label">
                        سنة الميلاد
                    </label>
                </div>
                <div className="form-box">
                    <select className="form-input pt-4" >
                        <option disabled >المدينة</option>
                        {
                            towens.map((town) => (
                                <option key={town.id}>{town.name}</option>
                            ))
                        }
                        <option disabled >كابول (قريبا)</option>
                        <option disabled >اعبلين (قريبا)</option>
                        <option disabled >شفاعمر (قريبا)</option>
                        <option disabled >شعب (قريبا)</option>
                        <option disabled >سخنين (قريبا)</option>



                    </select>
                    <label htmlFor="town" className="form-label">
                        المدينة
                    </label>
                </div>
                {/* <div className="form-box">
                    <input id="birthday" type="text" className="form-input" placeholder=" " onClick={() => setDatePicker(!datePicker)} value={formattedBirthDate} readOnly />
                    <label htmlFor="birthday" className="form-label">
                        تاريخ الميلاد
                    </label>
                    {
                        datePicker && (
                            <Calendar className="absolute bottom-0 start-1/2 lg:start-auto lg:end-0 transform translate-y-0 translate-x-1/2 lg:translate-x-0" onChange={getDateFromInput} value={birthDateValue} defaultView="century" locale="ar" minDate={new Date('1931-01-01')} maxDate={new Date()} />
                        )
                    }
                </div> */}
            </div>

            <button className="w-full btn btn-primary mt-8" onClick={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                التالي
            </button>
        </div>
    );
}