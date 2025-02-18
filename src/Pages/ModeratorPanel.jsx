import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { FaBus, FaUsers, FaClock, FaRedo, FaPlus, FaTrash } from "react-icons/fa";

export default function ModeratorPanel() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [busToDelete, setBusToDelete] = useState(null);
    const [newBus, setNewBus] = useState({
        date: "",
        go_time: "",
        get_back_time: "",
        max_passengers: 54, // default
        passengers: 0, // default
    });
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

    const getDayOfWeek = (dateString) => {
        const daysOfWeek = [
            "الأحد", 
            "الإثنين", 
            "الثلاثاء", 
            "الأربعاء", 
            "الخميس", 
            "الجمعة", 
            "السبت", 
        ];
        const date = new Date(dateString); 
        const dayIndex = date.getDay(); 
        return daysOfWeek[dayIndex]; 
    };

    const handleAddBus = async () => {
        try {
            const newDayOfWeek = getDayOfWeek(newBus.date);
    
            // Prepare data for API call
            const busData = {
                date: newBus.date,
                go_time: newBus.go_time,
                get_back_time: newBus.get_back_time,
                max_passengers: newBus.max_passengers || 54, 
                passengers: newBus.passengers || 0, 
                dayOfWeek: newDayOfWeek,
                "id" : 3
            };
    
            //api call here
            //example response
            const response = { data: { success: true, busId: 3 } };
    
            if (response.data.success) {
                let newBusEntry = { ...busData, id: response.data.busId }; 
                setBuses([...buses, newBusEntry]);
                setShowAddModal(false);
    
                // Reset...
                setNewBus({
                    date: "",
                    go_time: "",
                    get_back_time: "",
                    max_passengers: 54,
                    passengers: 0
                });
            }
    
        } catch (error) {
            console.error("Error adding bus:", error);
        }
    };
    

    const handleRemoveBus = async () => {
        if (busToDelete !== null) {
            try {
                //api call here
                //example response
                const response = { data: { success: true } };
    
                if (response.data.success) {
                    setBuses(buses.filter(bus => bus.id !== busToDelete));
                    setShowConfirmDelete(false);
                    setBusToDelete(null);
                } else {
                    alert("فشل في حذف الباص!");
                }
    
            } catch (error) {
                console.error("Error deleting bus:", error);
            }
        }
    };
     


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

                {/* Add Bus Button */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition self-start"
                >
                    <FaPlus size={18} /> إضافة باص جديد
                </button>

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
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                                            
                                            {/* Bus Details */}
                                            <div 
                                                className="flex flex-col sm:flex-row sm:items-center w-full cursor-pointer"
                                                onClick={() => navigate(bus.link)}
                                            >
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

                                             {/*  Delete Button */}
                                             <button 
                                                className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition self-start"
                                                onClick={() => {
                                                    setBusToDelete(bus.id);
                                                    setShowConfirmDelete(true);
                                                }}
                                            >
                                                <FaTrash size={18} /> حذف الباص
                                            </button>
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
            {/* Confirm Delete Modal */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-[#1a1a2e] text-white border border-gray-600 shadow-xl rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold text-center mb-4 text-red-400">
                            تأكيد الحذف
                        </h2>
                        <p className="text-center mb-6 text-gray-300">
                            هل أنت متأكد أنك تريد حذف هذا الباص؟
                        </p>
                        <div className="flex justify-between">
                            <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                                onClick={() => setShowConfirmDelete(false)}>إلغاء</button>
                            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                onClick={handleRemoveBus}>حذف</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal for Adding a Bus */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-[#1a1a2e] text-white border border-gray-600 shadow-xl rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold text-center mb-4">إضافة باص جديد</h2>

                        {/* Inputs */}
                        <label className="block text-gray-400 text-sm mb-1">📅 تاريخ الرحلة:</label>
                        <input 
                            type="date" 
                            className="p-2 w-full mb-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={newBus.date} 
                            onChange={(e) => setNewBus({ ...newBus, date: e.target.value })} 
                        />

                        <label className="block text-gray-400 text-sm mb-1">🕒 وقت الذهاب:</label>
                        <input 
                            type="time" 
                            className="p-2 w-full mb-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={newBus.go_time} 
                            onChange={(e) => setNewBus({ ...newBus, go_time: e.target.value })} 
                        />

                        <label className="block text-gray-400 text-sm mb-1">🕒 وقت العودة:</label>
                        <input 
                            type="time" 
                            className="p-2 w-full mb-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={newBus.get_back_time} 
                            onChange={(e) => setNewBus({ ...newBus, get_back_time: e.target.value })} 
                        />

                        <label className="block text-gray-400 text-sm mb-1">👤 عدد الركاب الحالي:</label>
                        <input 
                            type="number" 
                            className="p-2 w-full mb-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={newBus.passengers} 
                            onChange={(e) => setNewBus({ ...newBus, passengers: parseInt(e.target.value) || 0 })} 
                            min="0" 
                        />

                        <label className="block text-gray-400 text-sm mb-1">🚍 الحد الأقصى للركاب:</label>
                        <input 
                            type="number" 
                            className="p-2 w-full mb-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={newBus.max_passengers} 
                            onChange={(e) => setNewBus({ ...newBus, max_passengers: parseInt(e.target.value) || 54 })} 
                            min="1"
                        />

                        {/* Buttons */}
                        <div className="flex justify-between mt-4">
                            <button 
                                className="px-6 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                                onClick={() => setShowAddModal(false)}
                            >
                                إلغاء
                            </button>
                            <button 
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                onClick={handleAddBus}
                            >
                                إضافة
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}