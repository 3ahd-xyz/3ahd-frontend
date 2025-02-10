// Assets
import celebrateIcon from "../assets/imgs/progress.svg";
import syana from "../assets/imgs/syana.svg";
import { useNavigate } from 'react-router-dom';

export default function BookingSucced() {
    const navigate = useNavigate();
    return (
        <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
            <img src={celebrateIcon} alt="celebrate icon" className="mx-auto mb-8" />
            <div className="flex flex-col gap-y-4">
                <h1 className="text-3xl font-semibold text-center">
                    شكرا لثقتكم بنا!
                </h1>
                <p className="text-center text-primary-light/50">
                    نعتذر عن أي تقصير قد بدر منا في التطبيق، فالكمال لله وحده، ونحن بشر نصيب أحيانًا ونخطئ أحيانًا أخرى، ونسعى دائمًا لتقديم الأفضل لكم. شكراً لتفهمكم ودعمكم المستمر.
                </p>
                <button className="w-full btn btn-primary mt-8" onClick={() => { navigate('/signIn') }}>
                    اكمل الى التسجيل
                </button>
            </div>
        </div>
    );
}


// export default function BookingSucced() {
//     const navigate = useNavigate();
//     return (
//         <div className="card-box w-full lg:w-3/5 xl:w-2/5 max-w-7xl flex flex-col items-center">
//             <img src={celebrateIcon} alt="celebrate icon" className="mx-auto mb-8" />
//             <div className="flex flex-col gap-y-4">
//                 <h1 className="text-3xl font-semibold text-center">
//                     الموقع تحت الصيانة
//                 </h1>
//                 <p className="text-center text-primary-light/50">
//                     ان الموقع تحت الصيانة حتى يوم الثلاثاء القادم بأذن الله تعالى..
//                 </p>
//             </div>
//         </div>
//     );
// }