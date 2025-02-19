import { useState, useEffect } from "react";
import fireworks from "../assets/imgs/fireworks.svg";
import {
  FaBus,
  FaUsers,
  FaRegCalendarAlt,
  FaUserTie,
  FaClock,
} from "react-icons/fa";
import "../assets/styles/AlreadyBooked.css";

export default function BookingSucced({ busInfo }) {
  //busInfo
  const [isCancelModalOpen, setCancelModalOpen] = useState(false); // Controls modal visibility
  const [showCelebration, setShowCelebration] = useState(true); // Manages celebration screen
  const [countdown, setCountdown] = useState(3); // Countdown timer state
  const [isProcessing, setIsProcessing] = useState(false); // State for cancellation process

  // Countdown effect for 3 seconds before showing the bus details
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCelebration(false); // Switch to details view after countdown
    }
  }, [countdown]);

  // const [busInfo, setBusInfo] = useState(null);
  busInfo = {
    busNumber: "123",
    max_passengers: 8,
    passengers: 6,
    dayOfWeek: "الأحد",
    manager: "محمد",
    date: "2021-09-05",
    whatsappLink: "https://wa.me/1234567890",
    go_time: "08:00",
    get_back_time: "16:00",
  };

  // Fetch bus info from API
  // useEffect(() => {
  // 	fetch(`/api/bus/${busId}`)
  // 		.then((res) => res.json())
  // 		.then((data) => setBusInfo(data))
  // 		.catch((err) => console.error("Error fetching bus info:", err));
  // }, [busId]);

  // Handle cancellation with processing state
  const handleCancel = () => {
    setIsProcessing(true);
    setCancelModalOpen(false);

    const redirectTimer = setTimeout(() => {
      // Use replace instead of href to prevent back navigation
      window.location.replace("https://3ahd.xyz/buses");
    }, 2000);

    // Cleanup function
    return () => clearTimeout(redirectTimer);
  };

  //useEffect for cleanup
  useEffect(() => {
    return () => {
      // Cleanup any pending timeouts when component unmounts
      clearTimeout(handleCancel.redirectTimer);
    };
  }, []);

  // if bus info not loaded yet:
  // if (!busInfo) {
  //  return (
  //      <p className="text-center text-gray-600">جاري تحميل معلومات الحافلة...</p>
  //  );
  // }

  return (
    <div
      className="
            p-8
            bg-gradient-to-br
            from-gray-800
            to-gray-900
            rounded-2xl
            shadow-2xl
            max-w-xl
            w-full
            mx-auto
            text-center
            border
            border-gray-700
            transform
            transition-all
            duration-300
            hover:shadow-xl
          "
    >
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="
                  bg-gray-800
                  p-8
                  rounded-2xl
                  shadow-2xl
                  max-w-md
                  w-full
                  border
                  border-gray-700
                  animate-fade-in
                "
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <h3 className="text-2xl font-bold text-white">
                جاري إلغاء الحجز
              </h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Screen */}
      {showCelebration ? (
        <div className="animate-fade-in-up">
          <div className="animate-pulse-slow">
            <img
              src={fireworks}
              alt="احتفال"
              className="mx-auto mb-8 w-24 h-24 drop-shadow-glow animate-fireworks"
            />
          </div>
          <h1
            className="
                  text-3xl
                  font-bold
                  text-center
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-600
                  bg-clip-text
                  text-transparent
                  md:text-4xl
                "
          >
            تم تسجيلك بالفعل!
          </h1>
          <p className="mt-4 text-xl text-gray-300 font-medium animate-pulse">
            يتم التوجيه خلال{" "}
            <span className="text-2xl font-bold text-emerald-400 inline-block w-8">
              {countdown}
            </span>{" "}
            ثوانٍ...
          </p>
        </div>
      ) : (
        <>
          {/* Success Header Section */}
          <div className="mb-6 space-y-2">
            <svg
              className="w-16 h-16 mx-auto text-green-500 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              تم الحجز بنجاح
              <span className="block mt-1 w-12 h-1 bg-green-600 mx-auto rounded-full"></span>
            </h2>
          </div>

          {/* Booking Details */}
          <div
            className="
              text-right
              space-y-4
              text-gray-300
              bg-gray-800
              p-6
              rounded-xl
              shadow-lg
              border
              border-gray-700
            "
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <tbody>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-400 flex items-center gap-2">
                      <FaBus className="text-yellow-400" />
                      رقم الباص:
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-100">
                      {busInfo.busNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-400 flex items-center gap-2">
                      <FaUsers className="text-green-400" />
                      ركاب:
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-100">
                      {busInfo.passengers} / {busInfo.max_passengers}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-400 flex items-center gap-2">
                      <FaRegCalendarAlt className="text-blue-300" />
                      يوم الأسبوع:
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-100">
                      {busInfo.dayOfWeek}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-400 flex items-center gap-2">
                      <FaUserTie className="text-pink-300" />
                      المسؤول:
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-100">
                      {busInfo.manager}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-400 flex items-center gap-2">
                      <FaClock className="text-blue-400" />
                      التوقيت:
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-100 whitespace-nowrap">
                      {busInfo.go_time + " - " + busInfo.get_back_time}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-400 flex items-center gap-2">
                      <FaRegCalendarAlt className="text-yellow-400" />
                      التاريخ:
                    </td>
                    <td className="py-2 px-3 font-medium text-gray-100">
                      {busInfo.date}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <button
              className="
                    group
                    relative
                    w-full
                    px-6
                    py-3
                    bg-red-600
                    hover:bg-red-700
                    rounded-xl
                    shadow-md
                    transition-all
                    duration-300
                    hover:shadow-lg
                    hover:-translate-y-0.5
                  "
              onClick={() => setCancelModalOpen(true)}
            >
              <span className="font-semibold text-white tracking-wide">
                إلغاء التسجيل
              </span>
              <span
                className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      opacity-70
                      group-hover:opacity-100
                      transition-opacity
                    "
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>

            <button
              className="
                    group
                    relative
                    w-full
                    px-6
                    py-3
                    bg-green-600
                    hover:bg-green-700
                    rounded-xl
                    shadow-md
                    transition-all
                    duration-300
                    hover:shadow-lg
                    hover:-translate-y-0.5
                  "
              onClick={() =>
                window.open(busInfo ? busInfo.whatsappLink : "#", "_blank")
              }
            >
              <span className="font-semibold text-white tracking-wide">
                انضم إلى مجموعة واتساب
              </span>
              <span
                className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      opacity-70
                      group-hover:opacity-100
                      transition-opacity
                    "
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"></path>
                </svg>
              </span>
            </button>
          </div>
        </>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div
          className="
                fixed
                inset-0
                bg-black
                bg-opacity-50
                backdrop-blur-sm
                flex
                items-center
                justify-center
                p-4
                animate-fade-in
              "
        >
          <div
            className="
                  bg-gray-800
                  p-8
                  rounded-2xl
                  shadow-2xl
                  max-w-md
                  w-full
                  border
                  border-gray-700
                  transform
                  transition-all
                  duration-300
                  scale-95
                  hover:scale-100
                "
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-900">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                تأكيد الإلغاء
              </h3>
              <p className="text-gray-300 leading-relaxed">
                هل أنت متأكد أنك تريد إلغاء التسجيل؟
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCancel}
                className="
                      px-6
                      py-3
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      font-semibold
                      rounded-lg
                      shadow-md
                      transition-all
                      duration-300
                      hover:shadow-lg
                    "
              >
                نعم، إلغاء الحجز
              </button>
              <button
                onClick={() => setCancelModalOpen(false)}
                className="
                      px-6
                      py-3
                      bg-gray-700
                      hover:bg-gray-600
                      text-white
                      font-semibold
                      rounded-lg
                      shadow-md
                      transition-all
                      duration-300
                      hover:shadow-lg
                    "
              >
                العودة إلى الخلف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
