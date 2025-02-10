// Assets
import busIcon from "../assets/imgs/bus.svg";
import busIconColored from "../assets/imgs/bus-colored.svg";
import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';




export default function BusesForm() {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);  // For loading spinner
    const [error, setError] = useState(null);  // For error handling
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);


        const fetchBuses = async () => {
            // try {
            //     await axios.get('https://api.murabit.xyz/otpCheck?phoneNumber=' + searchParams.get('phoneNumber') + '&otpCode=' + searchParams.get('otp')); // Replace with your actual API endpoint
            // } catch (err) {
            //     if (err.response?.status == 400) { // otp Error
            //         setLoading(false);
            //         setError('مر وقت طويل منذ تسجيل دخولك يجب التسجيل مرة اخرى, سيتم تحويلك الان.');
            //         setTimeout(() => {
            //             navigate("/signin");
            //         }, 10000);
            //         // 10000 milliseconds = 10 seconds
            //     } else {
            //         setLoading(false);
            //         setError('خطأ داخلي في الخادم, تواصل مع رقم التطبيق على واتس اب او انتظر لحل المشكلة رجاءا');
            //     }
            //     console.log(err)
            // }
            try {
                const response = await axios.get('https://api.3ahd.xyz/buses'); // Replace with your actual API endpoint
                setBuses(response.data);  // Update state with the fetched buses
            } catch (err) {
                console.log(err)
                setError('خطأ داخلي في الخادم, تواصل مع رقم التطبيق على واتس اب او انتظر لحل المشكلة رجاءا');
            } finally {
                setLoading(false);  // Stop loading after the request is complete
            }
        };

        fetchBuses();  // Call the fetch function when the component mounts
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    const handleSubmit = async (index) => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.3ahd.xyz/setUserBusId', { phoneNumber: searchParams.get('phoneNumber'), id: buses[index].id }); // Replace with your actual API endpoint
            navigate("/BookingSuccessed?link=" + buses[index].link);
            // setBuses(response.data);  // Update state with the fetched buses
        } catch (err) {
            console.log(err)
            setError('خطأ داخلي في الخادم, تواصل مع رقم التطبيق على واتس اب او انتظر لحل المشكلة رجاءا');
        } finally {
            setLoading(false);  // Stop loading after the request is complete

        }

    }

    return (
        <div className="card-box w-full lg:w-11/12 xl:w-10/12 max-w-7xl">
            <div className="form-head flex flex-col gap-y-4 mb-8">
                <div className="form-icon">
                    <img src={busIcon} alt="shield icon" />
                </div>
                <div className="form-title font-semibold text-3xl">
                    جدول الباصات المتاحة
                </div>
                <span className="form-note text-primary-light/50">
                    هنا جدول الباصات المتاحة لبلدك
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

            <div className="busse-list flex flex-col gap-4">
                {
                    buses.map((bus, index) => {
                        if (bus.passengers >= bus.max_passengers) {
                            return null;
                        } else {

                            return (
                                <div
                                    key={index}
                                    className="grid gap-4 w-full grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 lg:auto-rows-min shadow-lg
                                        bg-primary-dark-lighten rounded-lg p-5
                                        ">

                                    <div className="hidden xl:flex items-center justify-start col-span-1 break-words">
                                        <img src={busIconColored} alt="bus icon" className="size-5 lg:size-12" />
                                    </div>
                                    <div className="flex flex-col gap-y-1 items-start justify-center col-span-2 lg:col-span-1">
                                        <div className='text-xs font-bold'>
                                            رقم الباص
                                        </div>
                                        <div className='text-secondary-light/50 text-sm'>
                                            {bus.id}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1 items-start justify-center col-span-2 lg:col-span-1">
                                        <div className='text-xs font-bold'>
                                            اسم المسؤول
                                        </div>
                                        <div className='text-secondary-light/50 text-sm'>
                                            {bus.name}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1 items-start justify-center col-span-2 lg:col-span-1">
                                        <div className='text-xs font-bold'>
                                            عدد الاماكن
                                        </div>
                                        <div className='text-secondary-light/50 text-sm'>
                                            {bus.passengers}/{bus.max_passengers}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1 items-start justify-center col-span-2 lg:col-span-1">
                                        <div className='text-xs font-bold'>
                                            التوقيت
                                        </div>
                                        <div className='text-secondary-light/50 text-sm'>
                                            {bus.go_time} -{"> " + bus.get_back_time}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1 items-start justify-center col-span-2 lg:col-span-1">
                                        <div className='text-xs font-bold'>
                                            يوم الأسبوع
                                        </div>
                                        <div className='text-secondary-light/50 text-sm'>
                                            {bus.dayOfWeek}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1 items-start justify-center col-span-2 lg:col-span-1">
                                        <div className='text-xs font-bold'>
                                            التاريخ
                                        </div>
                                        <div className='text-secondary-light/50 text-sm'>
                                            {bus.date.split('T')[0]}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center w-full col-span-4 lg:col-span-1">
                                        <button onClick={() => handleSubmit(index)} className="btn btn-primary w-full">
                                            حجز
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>

        </div>
    );
}