import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaRedo } from "react-icons/fa";

export default function BookingSucced() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [users, setUsers] = useState([]);
  const [bussData, setBussData] = useState({});
  const [showModal, setShowModal] = useState(false); // for delete confirmation
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  // getUsersByBusId

  const fetchData = async () => {
    try {
      console.log("https://api.3ahd.xyz/getUsersByBusId/" + id);

      //let data = await axios.get('https://api.3ahd.xyz/getUsersByBusId/' + id);
      let data = {
        data: [
          { firstName: "احمد", lastName: "محمد", phoneNumber: "123456789" },
          { firstName: "فاطمة", lastName: "علي", phoneNumber: "987654321" },
          { firstName: "يوسف", lastName: "خالد", phoneNumber: "456789123" },
          { firstName: "محمد", lastName: "احمد", phoneNumber: "321654987" },
          { firstName: "علي", lastName: "فاطمة", phoneNumber: "789123456" },
          { firstName: "خالد", lastName: "يوسف", phoneNumber: "654987321" },
          { firstName: "احمد", lastName: "محمد", phoneNumber: "123456789" },
          { firstName: "فاطمة", lastName: "علي", phoneNumber: "987654321" },
          { firstName: "يوسف", lastName: "خالد", phoneNumber: "456789123" },
          { firstName: "محمد", lastName: "احمد", phoneNumber: "321654987" },
          { firstName: "علي", lastName: "فاطمة", phoneNumber: "789123456" },
          { firstName: "خالد", lastName: "يوسف", phoneNumber: "654987321" },
          { firstName: "احمد", lastName: "محمد", phoneNumber: "123456789" },
          { firstName: "فاطمة", lastName: "علي", phoneNumber: "987654321" },
          { firstName: "يوسف", lastName: "خالد", phoneNumber: "456789123" },
          { firstName: "محمد", lastName: "احمد", phoneNumber: "321654987" },
          { firstName: "علي", lastName: "فاطمة", phoneNumber: "789123456" },
          { firstName: "خالد", lastName: "يوسف", phoneNumber: "654987321" },
          { firstName: "احمد", lastName: "محمد", phoneNumber: "123456789" },
          { firstName: "فاطمة", lastName: "علي", phoneNumber: "987654321" },
          { firstName: "يوسف", lastName: "خالد", phoneNumber: "456789123" },
          { firstName: "محمد", lastName: "احمد", phoneNumber: "321654987" },
          { firstName: "علي", lastName: "فاطمة", phoneNumber: "789123456" },
          { firstName: "خالد", lastName: "يوسف", phoneNumber: "654987321" },
          { firstName: "احمد", lastName: "محمد", phoneNumber: "123456789" },
        ],
        buss: {
          id: 1,
          date: "12/02/2025",
          dayOfWeek: "الخميس",
          go_time: "14:15",
          get_back_time: "20:00",
          max_passengers: 10,
          passengers: 5,
          name: "احمد",
          link: "/mod/buses?id=1",
        },
      };
      //data={"data":[]};
      console.log(data);
      setUsers(data.data);
      setFilteredUsers(data.data);
      setBussData(data.buss);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (index) => {
    setSelectedUser(index);
    setShowModal(true);
  };

  const handleCancelAddModel = () => {
    setShowAddModal(false);
    setNewPassenger({ firstName: "", lastName: "", phoneNumber: "" });
  };

  const confirmDelete = () => {
    if (selectedUser !== null) {
      try {
        const passengerId = users[selectedUser].id; // Get passenger ID
        // Add API call to delete passenger here:
        const result = { success: true }; // Simulate success

        if (result.success) {
          setUsers(users.filter((_, i) => i !== selectedUser)); // Update UI
          setFilteredUsers(filteredUsers.filter((_, i) => i !== selectedUser)); // Update filtered users
        } else {
          alert(result.message); // Show error if passenger was not found
        }
      } catch (error) {
        console.error("Error deleting passenger:", error);
      }
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.firstName.includes(event.target.value) ||
            user.lastName.includes(event.target.value) ||
            user.phoneNumber.includes(event.target.value)
        )
      );
    }
  };

  const handleAddPassenger = async () => {
    try {
      // Add API call to add passenger here:
      // let response = await axios.post(``, {
      //     firstName: newPassenger.firstName,
      //     lastName: newPassenger.lastName,
      //     phoneNumber: newPassenger.phoneNumber,
      //     busId: id,
      // });
      if (
        newPassenger.firstName === "" ||
        newPassenger.lastName === "" ||
        newPassenger.phoneNumber === ""
      ) {
        setShowAddModal(false);
        return;
      }
      let response = { data: { success: true, passenger: newPassenger } }; // Simulate success
      if (response.data.success) {
        let updatedUsers = [...users, response.data.passenger];
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setShowAddModal(false);
        setNewPassenger({ firstName: "", lastName: "", phoneNumber: "" });
      } else {
        alert("Error adding passenger!");
      }
    } catch (error) {
      console.error("Error adding passenger:", error);
    }
  };

  return (
    <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex justify-between items-center w-full p-1">
          {/*  Go Back Button */}
          <button
            onClick={() => navigate(`/moderator-panel?id=${bussData.id}`)}
            className="flex items-center gap-1 px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-800 transition text-sm"
          >
            <FaArrowLeft size={16} /> العودة
          </button>

          {/*  Bus ID Title (Smaller & Aligned) */}
          <h1 className="text-lg font-semibold text-center flex-grow text-white">
            باص رقم: {id}
          </h1>

          {/*  Refresh Button */}
          <button
            onClick={fetchData}
            className="flex items-center gap-1 px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-sm"
          >
            <FaRedo size={16} /> تحديث
          </button>
        </div>
        {/* Search and Add Passenger Row */}
        <div className="flex justify-between items-center w-full mt-2 bg-[#1a1a2e] p-3 rounded-lg">
          {/* Search Input */}
          <input
            type="text"
            placeholder="ابحث عن راكب..."
            className="p-2 w-1/3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          {/* Total Passengers Text  */}
          <p className="text-center font-semibold text-gray-300">
            عدد الركاب الشامل: {users.length}
          </p>
          {/* Add Passenger Button  */}
          <button
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
            onClick={() => setShowAddModal(true)}
          >
            اضف راكبا جديدا
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2 text-right">الأسم الأول</th>
              <th className="p-2 text-right">اسم العائلة</th>
              <th className="p-2 text-right">رقم الهاتف</th>
              <th className="p-2 text-right">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-2 text-right">{user.firstName}</td>
                  <td className="p-2 text-right">{user.lastName}</td>
                  <td className="p-2 text-right">{user.phoneNumber}</td>
                  <td className="p-2 text-right">
                    <button
                      className="px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                      onClick={() => handleDeleteClick(index)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  لا يوجد ركاب في الباص
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center pt-10">
          <div className="bg-[#1a1a2e] text-white border border-gray-600 shadow-xl rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-300">
              تأكيد الحذف
            </h2>
            <p className="text-center mb-6 text-gray-400">
              هل أنت متأكد أنك تريد حذف هذا الراكب؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 text-white bg-red-600 border border-red-500 rounded-lg hover:bg-red-700 transition shadow-md"
                onClick={confirmDelete}
              >
                حذف
              </button>
              <button
                className="px-6 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition shadow-md"
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Adding Passenger */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center pt-10">
          <div className="bg-[#1a1a2e] text-white border border-gray-600 shadow-xl rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-center mb-4">
              إضافة راكب جديد
            </h2>
            <input
              type="text"
              placeholder="الاسم الأول"
              className="p-2 w-full mb-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300"
              value={newPassenger.firstName}
              onChange={(e) =>
                setNewPassenger({ ...newPassenger, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="اسم العائلة"
              className="p-2 w-full mb-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300"
              value={newPassenger.lastName}
              onChange={(e) =>
                setNewPassenger({ ...newPassenger, lastName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="رقم الهاتف"
              className="p-2 w-full mb-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300"
              value={newPassenger.phoneNumber}
              onChange={(e) =>
                setNewPassenger({
                  ...newPassenger,
                  phoneNumber: e.target.value,
                })
              }
            />
            <div className="flex justify-end gap-x-3 mt-4">
              <button
                className="px-6 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition shadow-md"
                onClick={handleCancelAddModel}
              >
                إلغاء
              </button>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                onClick={handleAddPassenger}
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
