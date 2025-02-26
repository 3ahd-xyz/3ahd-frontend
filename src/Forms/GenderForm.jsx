import { useState } from "react";

// Assets
import gender from "../assets/imgs/gender.svg";
import male from "../assets/imgs/male.svg";
import female from "../assets/imgs/female.svg";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GenderForm() {
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get('phoneNumber');
  const navigate = useNavigate();
  const selectedGenderParam = searchParams.get("selected");
const [selectedGender, setSelectedGender] = useState(selectedGenderParam || "male");


  return (
    <div className="card-box w-full lg:w-4/5 xl:w-3/5 max-w-7xl">
      <div className="form-head flex flex-col gap-y-4 mb-8">
        <div className="form-icon">
          <img src={gender} alt="shield icon" />
        </div>
        <div className="form-title font-semibold text-3xl">اختر الجنس</div>
        <span className="form-note text-primary-light/50">من فضلك اختر الجنس الخاص بك</span>
      </div>

      <div className="flex">
        {/* Male */}
        <label
          className={`cursor-pointer flex-1 transition-all ease-linear p-3 rounded-lg ${
            selectedGender === "male" ?
            "ring-1 ring-primary-light ring-opacity-50 shadow-sm" : ""
          }`}
        >
          <input
            type="radio"
            name="image"
            className="hidden"
            checked={selectedGender === "male"}
            onChange={() => setSelectedGender("male")}
          />
          <img
            src={male}
            alt="male"
            className="size-20 lg:size-32 mx-auto object-contain rounded-[100px] select-none pointer-events-none"
          />
          <div className="mt-6 text-center text-secondary-light">ذَكَر</div>
        </label>

        {/* Female */}
        <label
          className={`cursor-pointer flex-1 transition-all ease-linear p-3 rounded-lg ${
            selectedGender === "female" ?
            "ring-1 ring-primary-light ring-opacity-50 shadow-sm" : ""
          }`}
        >
          <input
            type="radio"
            name="image"
            className="hidden"
            checked={selectedGender === "female"}
            onChange={() => setSelectedGender("female")}
          />
          <img
            src={female}
            alt="female"
            className="size-20 lg:size-32 mx-auto object-contain rounded-[100px] pointer-events-none"
          />
          <div className="mt-6 text-center text-secondary-light">أُنْثَى</div>
        </label>
      </div>

      {/* Fatwa Summary for Female */}
      {selectedGender === "female" && (
        <div className="mt-6 bg-gray-800 text-white p-3 rounded-lg leading-relaxed">
          <p className="text-sm text-gray-200">
          حرصًا على سلامتكِ والتزامًا بالأحكام الشرعية، لا يجوز سفر النساء إلى المسجد الأقصى بدون محرم، 
          إلا إذا كان السفر آمنًا وبصحبة نساء ثقات، مع ضرورة تجنب الاختلاط والالتزام بالضوابط الشرعية.
           يُرجى قراءة التفاصيل لمزيد من المعلومات.
          </p>
          <button
      onClick={() => navigate(`/fatwa/women-al-aqsa-travel?selected=female&phoneNumber=${phoneNumber || ""}`)}
      className="text-blue-500 hover:underline mt-2"
    >
            قراءة المزيد
          </button>
        </div>
      )}
      <button className="w-full btn btn-primary mt-8" 
      onClick={() => navigate(`/buses?selected=${selectedGender || ""} &phoneNumber=${phoneNumber || ""}`)}
      >التالي</button>
    </div>
  );
}
