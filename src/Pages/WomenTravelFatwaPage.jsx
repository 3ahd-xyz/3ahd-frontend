import { useState } from "react";
import { FaArrowLeft, FaShareAlt, FaBook } from "react-icons/fa";
import { useNavigate,useSearchParams } from "react-router-dom";

export default function WomenTravelFatwaPage() {
  const [searchParams] = useSearchParams();
  const selectedGender = searchParams.get("selected");
  const phoneNumber = searchParams.get("phoneNumber");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    const fatwaUrl = window.location.href;
    navigator.clipboard.writeText(fatwaUrl);

    // Show toast notification
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  return (
    <div className="bg-[#1a1a2e] min-h-screen text-white flex flex-col items-center px-4 py-6">
      <div className="sticky top-0 z-50 w-full bg-[#2e2e3a] shadow-md p-4 flex justify-between items-center rounded-lg">
      <button
          onClick={() => navigate(`/gender?selected=${selectedGender || "female"}&phoneNumber=${phoneNumber || ""}`)}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <FaArrowLeft /> العودة
        </button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <FaBook className="text-yellow-400" /> الفتوى الشرعية
        </h1>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaShareAlt /> مشاركة
        </button>
      </div>
      {showToast && (
  <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[100] text-center text-sm w-11/12 max-w-xs animate-fade-in-out">
    ✅ تم نسخ رابط الفتوى إلى الحافظة
  </div>
)}



      {/* Fatwa Content */}
      <div className="bg-gray-800 rounded-lg p-4 mt-6 w-full max-w-md text-right leading-relaxed overflow-y-auto">
        <h2 className="text-xl font-semibold border-b border-gray-500 pb-2 mb-4">
          تحريم سفر النساء للأقصى بدون محرم
        </h2>
        <p className="text-gray-300">
          عمم مكتب د. مشهور فوّاز - رئيس المجلس الاسلامي للإفتاء في البلاد فتوى
          شرعية بتحريم سفر النّساء لأداء صلاة التّراويح في الاقصى بلا محرم.
        </p>
        <p className="text-gray-300 mt-4">
          "لقد بلغنا أنّ هنالك ظاهرة سفر النّساء للمسجد الاقصى بلا محرم بهدف
          أداء صلاة التّراويح ويرجعن إلى البيوت بساعات متأخرة في اللّيل، وإنّنا
          وإن كنّا نشدّد ونؤكّد على ضرورة شدّ الرحال للمسجد الاقصى رجالا ونساء،
          لكن بالوقت نفسه ينبغي ألا يكون ذلك على حساب حدود الشّرع وضوابطه،
          فالغاية كما قيل لا تبرر الوسيلة، فالخير كلّ الخير في الاتباع والشّر
          كلّ الشر في الابتعاد عن نهج الشّرع وأحكامه، وإنّ المرأة إن صدقت بنيتها
          لزيارة المسجد الاقصى وحبسها عن ذلك عذر من الاعذار الشّرعية، كفقد
          المحرم، فإنّها تحصّل الاجر والثّواب وكأنّها وصلت المسجد الاقصى المبارك
          وصلّت فيه".{" "}
        </p>
        <p className="text-gray-300 mt-4 font-semibold">
          ملاحظة : يجب أن يكون المحرم بالغاً عاقلاً ولا تكفي مجموعة نساء ولو كنّ
          ثقات وكبيرات في السنّ" ، وفق ما جاء في البيان الصادر عن مجلس الافتاء
          في البلاد.{" "}
        </p>
        <p className="text-gray-300 mt-4">
          ولقد أفتى المجلس الاسلامي للافتاء بجواز سفر المرأة إلى المسجد الاقصى
          بغير محرم بشرط أمن الفتنة ومع عصبة نساء ثقات على أن تسافر نهاراً وترجع
          نهاراً ، وهذا قول ابن تيمية رحمه الله تعالى حيث أجاز سفر المرأة لكل
          طاعة بلا محرم بشرط أمن الفتنة وهو ما تبناه مجمع فقهاء الشريعة بأمريكا
          .{" "}
        </p>
        <p className="text-gray-300 mt-4">
          ثم إنّ الحنفية أجازوا للمرأة أن تسافر دون مسافة القصر وهي ١١٦ كيلو متر
          عندهم بلا محرم مطلقاً فأصبح هنالك مذهب فقهي من المذاهب الاربعة وهو قول
          لبعض المالكية وبعض الشافعية.{" "}
        </p>
        <p className="text-gray-300 mt-4 font-semibold">
          هذا وأنّنا نؤكد على حرمة مزاحمة المرأة للرجال ووجوب تجنب الاختلاط
          والحفاظ على الضوابط الشرعية من حيث الخروج والسّفر .
        </p>
        <p className="text-gray-300 mt-4 font-semibold">
          ~ المجلس الإسلامي للإفتاء ~
        </p>
      </div>
    </div>
  );
}
