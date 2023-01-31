import React, { useEffect } from "react";
import { useState } from "react";
import OtpInput from "react18-input-otp";
import { Spinner } from "./Spinner";
import Axios from "axios";
import queryString from "query-string";
import { ErrorMessage } from "./ErrorMessage";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [wrongOtp, setWrongOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [encounterError, setEncounterError] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState(null);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const handleSubmit = async () => {
    if (otp.length !== 5) {
      setWrongOtp(true);
      setEncounterError("Please enter a valid verification code");
      return;
    }
    try {
      setLoading(true);
      // make a post request to the endpoint
      const response = await Axios.post(
        "https://falconlite.com/v1/api/verify-email",
        queryString.stringify({
          code: otp,
        })
      );

      if (response?.data?.success) {
        setIsVerified(true);
        localStorage.setItem("verificationCompleted", true);
        setEncounterError(null);
        setVerificationMessage(response?.data?.data?.message);
      } else {
        setEncounterError(response?.data?.data?.message);
        localStorage.removeItem("verificationCompleted");
        setWrongOtp(true);
        setVerificationMessage(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-2">
        Kindly Enter Email Verification Code
      </h2>
      <p>
        To sign up, kindly enter the verification code sent to yur email
        address.
      </p>

      <div className="mt-[2rem] w-full">
        {encounterError && <ErrorMessage message={encounterError} />}
        <div className="h-[200px] sm:h-[300px] mt-[50px] sm:mt-[100px] flex justify-center items-center w-full">
          {isVerified ? (
            <div className="flex flex-col items-center space-y-3 rounded-lg bg-white p-8 w-full transition-all ease-in-out">
              <h4 className="text-[24px] sm:text-[32px] text-green-600 font-bold leading-[42px]">
                Congratulations!
              </h4>
              <p>{verificationMessage}.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center h-full justify-between w-full otpWrap">
              <OtpInput
                value={otp}
                errorStyle={{
                  border: "1px solid red",
                }}
                hasErrored={wrongOtp}
                onChange={handleChange}
                numInputs={5}
                separator={<span style={{ width: "8px" }}></span>}
                containerStyle={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr)",
                  gridGap: "10px",
                  placeItems: "center",
                }}
                inputStyle={{
                  border: "1px solid #01C8FF",
                  borderRadius: "5px",
                  width: "100%",
                  height: "79px",
                  fontSize: "32px",
                  color: "#01C8FF",
                  fontWeight: "700",
                  caretColor: "blue",
                }}
                focusStyle={{
                  border: "2px solid #01C8FF",
                  outline: "none",
                }}
              />

              <div className="flex justify-center w-full">
                <button
                  onClick={() => handleSubmit()}
                  className="btn relative text-black rounded-lg transition-all ease-in-out hover:bg-[#06c0f4]"
                  type="button"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Proceed"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
