import React, { useState, useEffect } from "react";

const ResendOtpButton = () => {
  const [timer, setTimer] = useState(60); // Initial timer value
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isDisabled]);

  const handleResend = () => {
    setTimer(60); // Reset timer to 60 seconds
    setIsDisabled(true);
    console.log("OTP Resent");
  };

  return (
    <div>
      <button
        id="resendBtn"
        onClick={handleResend}
        disabled={isDisabled}
        className={isDisabled ? "disabled" : ""}
      >
        {isDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
      </button>
    </div>
  );
};

export default ResendOtpButton;
