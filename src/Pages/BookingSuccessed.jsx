// Assets
import celebrateIcon from "../assets/imgs/celebrate.svg";
import { useSearchParams } from "react-router-dom";

export default function BookingSucced() {
    const [searchParams] = useSearchParams();
    const url = searchParams.get("link"); // Get the link from query params

    const handleSubmit = () => {

        window.location.href = url; // Redirects the user

    }
    return (
        <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
            <img src={celebrateIcon} alt="celebrate icon" className="mx-auto mb-8" />
            <div className="flex flex-col gap-y-4">
                <h1 className="text-3xl font-semibold text-center">
                    تقديسة مباركة!
                </h1>
                <p className="text-center text-primary-light/50">
                    تم تسجيل بياناتك بنجاح!
                </p>
                <p className="text-center text-primary-light/50">
                    يجب عليك دخول مجموعة الباص في واتس اب عبر الزر التالي:
                </p>
                <div className="flex items-center justify-center w-full col-span-4 lg:col-span-1">
                    <button onClick={() => handleSubmit()} className="btn btn-primary w-full">
                        دخول
                    </button>
                </div>
                <p className="text-center text-primary-light/50">
                    في حال حدوث أي خطأ, رغبة في الغاء التسجيل أو اضافة اطفال او كبار في السن معك في التسجيل, رقم الهاتف الذي ارسل لك على واتس اب مفتوح للتواصل.
                </p>
            </div>
        </div>
    );
}