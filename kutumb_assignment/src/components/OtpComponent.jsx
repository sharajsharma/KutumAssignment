import React, { useRef } from "react";

const OTPInput = ({ length = 4, value, onChangeOtp }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val) || val === "") {
      const newOtp = [...(value || "")];
      newOtp[index] = val;
      onChangeOtp(newOtp.join(""));
      if (val && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length); 

    if (/^[0-9]+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, length);
      onChangeOtp(newOtp.join(""));
      newOtp.forEach((num, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = num;
        }
      });
      const nextIndex = Math.min(pastedData.length, length) - 1;
      inputRefs.current[nextIndex].focus();
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          maxLength={1}
          onPaste={handlePaste} 
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            margin: "5px",
            textAlign: "center",
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
