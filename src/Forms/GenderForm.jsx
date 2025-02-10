import { useState } from "react";

// Assets
import gender from "../assets/imgs/gender.svg";
import male from "../assets/imgs/male.svg";
import female from "../assets/imgs/female.svg";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GenderForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        const phoneNumber = searchParams.get('phoneNumber');
        if (phoneNumber) {
            navigate("/buses?phoneNumber=" + phoneNumber);
        } else {
            navigate("/");
        }
    }, []);
    const [selectedGender, setSelectedGender] = useState('male');

    return (
        <div className="card-box w-full lg:w-4/5 xl:w-3/5 max-w-7xl">
            <div className="form-head flex flex-col gap-y-4 mb-8">
                <div className="form-icon">
                    <img src={gender} alt="shield icon" />
                </div>
                <div className="form-title font-semibold text-3xl">
                    اختر الجنس
                </div>
                <span className="form-note text-primary-light/50">
                    من فضلك اختر الجنس الخاص بك
                </span>
            </div>

            <div className="flex">
                {/* male */}
                <label
                    className={`cursor-pointer flex-1 transition-all ease-linear p-3 rounded-lg ${selectedGender === 'male' ?
                        'ring-1 ring-primary-light ring-opacity-50 shadow-sm' : ' '}`
                    }>
                    <input
                        type="radio"
                        name="image"
                        className="hidden"
                        checked={selectedGender === 'male'}
                        onChange={() => setSelectedGender('male')}
                    />
                    <img src={male} alt="male" className="size-20 lg:size-32 mx-auto object-contain rounded-[100px] select-none pointer-events-none" />
                    <div className="mt-6 text-center text-secondary-light">
                        ذَكَر
                    </div>
                </label>

                {/* Female */}
                <label
                    className={`cursor-pointer flex-1 transition-all ease-linear p-3 rounded-lg ${selectedGender === 'female' ?
                        'ring-1 ring-primary-light ring-opacity-50 shadow-sm' : ' '}`
                    }>
                    <input
                        type="radio"
                        name="image"
                        className="hidden"
                        checked={selectedGender === 'female'}
                        onChange={() => setSelectedGender('female')}
                    />
                    <img src={female} alt="female" className="size-20 lg:size-32 mx-auto object-contain rounded-[100px] pointer-events-none" />
                    <div className="mt-6 text-center text-secondary-light">
                        أُنْثَى
                    </div>
                </label>
            </div>

            <button className="w-full btn btn-primary mt-8">
                التالي
            </button>

        </div>
    );
}