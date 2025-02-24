import "./App.css";
import { useRef } from "react";
import { Routes, Route } from 'react-router-dom';
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";

// import forms
import PhoneForm from './Forms/PhoneForm';
import CodeForm from './Forms/CodeForm';
import GenderForm from './Forms/GenderForm';
import DetailsForm from './Forms/DetailsForm';
import BusesForm from './Forms/BusesForm';
import ErrorPage from './Pages/ErrorPage';
import BookingSuccessed from './Pages/BookingSuccessed';
import Home from './Pages/home';
import AlreadyBooked from './Pages/AlreadyBooked';
import Hawash from './mods/busList';
import WomenTravelFatwaPage from "./Pages/WomenTravelFatwaPage";

// Assets
import bgWave from "./assets/imgs/background-wave.svg";
import bgMosque from "./assets/imgs/background-mosque.svg";

// Background stars script
function MovingStars() {
  const starsRef = useRef(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.x = elapsedTime * 0.01;
      starsRef.current.rotation.y = elapsedTime * 0.01;
    }
  });

  return <Stars ref={starsRef} radius={40} count={5000} factor={4} fade />;
}


function App() {

  return (
    <div>
      <motion.section className="relative overflow-hidden text-gray-200 min-h-screen w-screen px-2 py-4 lg:py-2">
        <div className="fixed inset-0 top-0 z-0">
          <Canvas>
            <MovingStars />
          </Canvas>
        </div>
        <div className="relative z-10 flex justify-center items-center min-h-screen h-full -bottom-4">
          <div className="background-wave absolute bottom-0 transform -translate-y-50 -left-24 lg:left-0 w-full -z-50 select-none pointer-events-none">
            <img src={bgWave} alt="background waves stock" className="object-cover w-full" />
          </div>
          <div className="background-mosque absolute bottom-0 transform -translate-y-50 left-8 lg:left-0 w-full -z-40 select-none pointer-events-none">
            <img src={bgMosque} alt="background mosque image" className="object-contain w-64 lg:w-[30vw]" />
          </div>
          <div className="w-full flex justify-center gap-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signIn" element={<PhoneForm />} />
              <Route path="/code" element={<CodeForm />} />
              <Route path="/gender" element={<GenderForm />} />
              <Route path="/details" element={<DetailsForm />} />
              <Route path="/buses" element={<BusesForm />} />
              <Route path="/fatwa/women-al-aqsa-travel" element={<WomenTravelFatwaPage />} />
              <Route path="/bookingSuccessed" element={<BookingSuccessed />} />
              <Route path="/AlreadyBooked" element={<AlreadyBooked />} />
              <Route path="/mod/buses" element={<Hawash />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
