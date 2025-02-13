// Assets
import fireworks from "../assets/imgs/fireworks.svg";

export default function BookingSucced() {
	// const navigate = useNavigate();
	return (
		<div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
			<h1>Hi</h1>
			<img src={fireworks} alt="celebrate icon" className="mx-auto mb-8" />
			<div className="flex flex-col gap-y-4">
				<h1 className="text-3xl font-semibold text-center">
					تم تسجيلك بالفعل!
				</h1>
				<p className="text-center text-primary-light/50">
					لقد تم بالفعل تسجيلك للباص, لا يمكنك الحجز لباصين في ان واحد.{" "}
				</p>
			</div>
			<p className="text-center text-primary-light/50">
				يمكنك التواصل مع الرقم الذي ارسل لك على واتس اب لألغاء الحجز.
			</p>
		</div>
	);
}
