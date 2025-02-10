import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function BookingSucced() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('https://api.3ahd.xyz/getUsersByBusId/' + id)

                let data = await axios.get('https://api.3ahd.xyz/getUsersByBusId/' + id);
                console.log(data)
                setUsers(data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    // getUsersByBusId



    const deleteUser = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    return (
        <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
            <div className="flex flex-col gap-y-4 w-full">
                <h1 className="text-3xl font-semibold text-center">
                    باص رقم: {id}
                </h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="p-2 text-right">الأسم الأول</th>
                            <th className="p-2 text-right">اسم العائلة</th>
                            <th className="p-2 text-right">رقم الهاتف</th>
                            {/* <th className="p-2 text-right">إجراء</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2 text-right">{user.firstName}</td>
                                <td className="p-2 text-right">{user.lastName}</td>
                                <td className="p-2 text-right">{user.phoneNumber}</td>
                                <td className="p-2 text-right">
                                    {/* <button
                                        className="text-red-600 hover:underline btn-secondary"
                                        onClick={() => deleteUser(index)}
                                    >
                                        حذف
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-center font-semibold mt-2">عدد الركاب الشامل: {users.length}</p>
                {/* <button className="w-full btn btn-primary mt-8" onClick={() => { navigate('/mods/newPassenger') }}>
                    اضف راكبا جديدا
                </button> */}
            </div>
        </div>
    );
}
