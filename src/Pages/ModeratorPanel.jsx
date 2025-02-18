import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { FaBus, FaUsers, FaClock, FaRedo } from "react-icons/fa";

export default function ModeratorPanel() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Fetch buses assigned to the driver
    const fetchBuses = async () => {
        setLoading(true);
        // api call here 
        console.log(id);
        let data = {
            "buses": [
                {
                    "id": 1,
                    "date": "12/02/2025",
                    "dayOfWeek": "الخميس",
                    "go_time": "14:15",
                    "get_back_time": "20:00",
                    "max_passengers": 10,
                    "passengers": 5,
                    "name": "احمد",
                    "link": "/mod/buses?id=1"
                },
                {
                    "id": 2,
                    "date": "13/02/2025",
                    "dayOfWeek": "الجمعة",
                    "go_time": "15:30",
                    "get_back_time": "21:00",
                    "max_passengers": 8,
                    "passengers": 6,
                    "name": "محمد",
                    "link": "/mod/buses?id=2"
                }
            ]
        };

        setBuses(data.buses);
        setLoading(false);
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    return (
        <div className="w-full max-w-7xl flex flex-col items-center">
            <div className="flex flex-col gap-y-4 w-full">
                
                {/*  Header Section */}
                <div className="flex justify-between items-center w-full p-4 bg-[#1a1a2e] rounded-lg">
                    <h1 className="text-2xl lg:text-3xl font-semibold text-center flex-1 text-white">
                        لوحة تحكم السائق
                    </h1>
                    
                    {/* Refresh Button */}
                    <button
                        onClick={fetchBuses}
                        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        <FaRedo size={18} /> تحديث
                    </button>
                    
                </div>

                {/* Bus List */}
                <div className="bg-[#1a1a2e] p-4 rounded-lg w-full">
                    {loading ? (
                        <p className="text-center text-gray-300 text-lg">جارٍ تحميل البيانات...</p>
                    ) : (
                        <ul className="space-y-4">
                            {buses.length > 0 ? (
                                buses.map((bus) => (
                                    <li 
                                        key={bus.id} 
                                        className="bg-gray-800 p-5 rounded-lg text-white shadow-md transition cursor-pointer hover:bg-gray-700"
                                        onClick={() => navigate(bus.link)}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                                            
                                            {/* 🚌 Bus Details */}
                                            <div className="flex flex-col sm:flex-row sm:items-center w-full">
                                                <FaBus className="text-yellow-400 text-3xl sm:text-2xl mb-2 sm:mb-0" />
                                                <div className="ml-3">
                                                    <p className="text-lg sm:text-xl font-semibold">
                                                        باص رقم: {bus.id}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        {bus.dayOfWeek} - {bus.date}
                                                    </p>
                                                </div>
                                            </div>

                                            {/*  Timing & Passengers */}
                                            <div className="flex flex-col sm:flex-row sm:items-center w-full sm:justify-between mt-3 sm:mt-0">
                                                <div className="flex items-center text-sm sm:text-lg text-gray-300">
                                                    <FaClock className="mr-2 text-blue-400" />
                                                    <span> {bus.go_time} - {bus.get_back_time} </span>
                                                </div>

                                                <div className="flex items-center text-sm sm:text-lg text-gray-300 mt-2 sm:mt-0">
                                                    <FaUsers className="mr-2 text-green-400" />
                                                    <span>{bus.passengers} / {bus.max_passengers} ركاب</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-300 text-lg">🚍 لا توجد باصات متاحة</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
