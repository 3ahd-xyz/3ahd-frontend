/**
 * Booking Success Component:
 *
 * Displays booking confirmation with celebration animation,
 * booking details, and cancellation functionality.
 *
 * Features:
 * - 3-second countdown with fireworks animation
 * - Detailed booking information display
 * - WhatsApp group joining functionality
 * - Cancellation confirmation modal
 * - Cancellation processing overlay with redirect
 */
import { useState, useEffect } from "react";
import fireworks from "../assets/imgs/fireworks.svg";
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
		<div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl max-w-xl w-full mx-auto text-center border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
			{/* Processing Overlay */}
			{isProcessing && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 animate-fade-in">
						<div className="flex flex-col items-center space-y-4">
							{/* Loading Spinner */}
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
							<h3 className="text-2xl font-bold text-gray-900">
								جاري الغاء الحجز
							</h3>
							{/* Progress Bar */}
							<div className="w-full bg-gray-200 rounded-full h-2.5">
								<div className="bg-green-600 h-2.5 rounded-full animate-progress"></div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Celebration Screen using ternary operator */}
			{showCelebration ? (
				<div className="animate-fade-in-up">
					<div className="animate-pulse-slow">
						<img
							src={fireworks}
							alt="Celebration"
							className="mx-auto mb-8 w-24 h-24 drop-shadow-glow"
						/>
					</div>
					<h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent md:text-4xl">
						تم تسجيلك بالفعل!
						<br />
						<br />
					</h1>
					{/* Animated Countdown */}
					<p className="mt-4 text-xl text-gray-600 font-medium animate-pulse">
						يتم التوجيه خلال{" "}
						<span className="text-2xl font-bold text-emerald-600 w-8 inline-block">
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
							/* Checkmark Icon */
							className="w-16 h-16 mx-auto text-green-600 animate-checkmark"
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
						<h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
							تم الحجز بنجاح
							<span className="block mt-1 w-12 h-1 bg-green-600 mx-auto rounded-full"></span>
						</h2>
					</div>

					{/* Booking Details Grid */}
					<div className="text-right space-y-4 text-gray-700 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
						<div className="grid grid-cols-2 gap-4">
							{/* Labels Column */}
							<div className="space-y-4">
								<p className="font-semibold text-gray-600">رقم الباص:</p>
								<p className="font-semibold text-gray-600">الأماكن المتاحة:</p>
								<p className="font-semibold text-gray-600">يوم الأسبوع:</p>
								<p className="font-semibold text-gray-600">المسؤول:</p>
								<p className="font-semibold text-gray-600">التوقيت:</p>
								<p className="font-semibold text-gray-600">التاريخ:</p>
							</div>
							<div className="space-y-4 text-gray-800">
								<p className="font-medium">{"10"}</p>
								<p className="font-medium">{"7/50"}</p>
								<p className="font-medium">{"الأحد"}</p>
								<p className="font-medium">{"busInfo.manager"}</p>
								<p className="font-medium">{"busInfo.time"}</p>
								<p className="font-medium">{"busInfo.date"}</p>
							</div>
						</div>
					</div>

					<div className="mt-8 space-y-4">
						<button
							className="group relative w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
							onClick={() => setCancelModalOpen(true)}
						>
							<span className="font-semibold text-white tracking-wide">
								إلغاء التسجيل
							</span>
							<span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 group-hover:opacity-100 transition-opacity">
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
							className="group relative w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
							onClick={() => window.open("busInfo.whatsappLink", "_blank")}
						>
							<span className="font-semibold text-white tracking-wide">
								انضم إلى مجموعة واتساب
							</span>
							<span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 group-hover:opacity-100 transition-opacity">
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

			{/* Enhanced Modal */}
			{isCancelModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
					<div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 transform transition-all duration-300 scale-95 hover:scale-100">
						{/* Modal Content */}
						<div className="mb-6 text-center">
							{/* Warning Icon */}
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
								<svg
									className="h-6 w-6 text-red-600"
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
							<h3 className="text-2xl font-bold text-gray-900 mb-2">
								تأكيد الإلغاء
							</h3>
							<p className="text-gray-600 leading-relaxed">
								هل أنت متأكد أنك تريد إلغاء التسجيل؟
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<button
								onClick={handleCancel}
								className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
							>
								نعم، إلغاء الحجز
							</button>
							<button
								onClick={() => setCancelModalOpen(false)}
								className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
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
