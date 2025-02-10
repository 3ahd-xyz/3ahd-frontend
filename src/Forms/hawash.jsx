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
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const towens = [
        { id: 1, name: 'طمرة' }

    ];


    const handleSubmit = async () => {
        const busId = document.getElementById('busId').value;

        const town = "طمرة"; // to be worked on after ramadan..


        const userDetails = {
            busId: busId
        };

        try {
            const response = await axios.post('https://api.3ahd.xyz/admin/addUser', userDetails);
            setError("تم تسجيله, جزاك الله الف خير!");

        } catch (err) {
            console.log(err)
            if (err.response?.status == 400) {
                setError("تأخرت في التسجيل, التسجيل متاح لمدة خمسة دقائق فقط بعد تلقيك لرمز التحقق رجاءا حاول مرة اخرى");
            } else {
                c
                setError("حصل خطأ ما جرب مرة اخرى في وقت لاحق");
            }

        } finally {
            setLoading(false); // Stop loading spinner

        }
    }


    return (
        <div className="card-box flex-grow-0 w-full lg:w-4/5 xl:w-3/5 max-w-7xl">
            <div className="form-head flex flex-col gap-y-4 mb-8">
                <div className="form-icon">
                    <img src={userInfoIcon} alt="shield icon" />
                </div>
                <div className="form-title font-semibold text-3xl">
                    اضف المتسجل
                </div>

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
                        <input id="firstName" type="text" className="form-input" placeholder=" " />
                        <label htmlFor="firstName" className="form-label">
                            الاسم الكامل
                        </label>

                    </div>

                    <div className="form-box">
                        <input id="busId" type="text" className="form-input" placeholder=" " />
                        <label htmlFor="busId" className="form-label">
                            رقم الباص
                        </label>
                    </div>
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
                تسجيل
            </button>
        </div>
    );
}