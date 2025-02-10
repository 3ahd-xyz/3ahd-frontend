// Assets
import errorFaceIcon from "../assets/imgs/error-face.svg";
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {

    const navigate = useNavigate();
    return (
        <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
            <img src={errorFaceIcon} alt="error face icon" className="mx-auto mb-8" />
            <div className="flex flex-col gap-y-4">
                <h1 className="text-3xl font-semibold text-center">
                    عذراً، حدث خطأ!
                </h1>
                <p className="text-center text-primary-light/50">
                    قد تكون الصفحة التي تبحث عنها غير متاحة أو تم نقلها
                </p>
            </div>
            <button className="btn btn-primary w-fit mt-8" onClick={() => navigate('/')}>
                الرجوع للخلف
            </button>
        </div>
    );
}