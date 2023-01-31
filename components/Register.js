"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import TogglePassword from "./TogglePassword";
import { Spinner } from "./Spinner";
import Axios from "axios";
import queryString from "query-string";
import { ErrorMessage } from "./ErrorMessage";

const Register = ({ setActivation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [encounterError, setEncounterError] = useState(null);
  //   form validation schema
  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .required("This field is Required")
      .min(11, "Must be a 11 digits numbers")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
    password: Yup.string()
      .min(4, "Must be at least 4 characters")
      .required("Password is required"),
  });

  //   toggle password
  const handleToggle = () => {
    setShowPassword(showPassword ? false : true);
  };

  //   handle registration
  const handleSubmit = async ({ name, email, phone, password }) => {
    try {
      // make a post request to the endpoint
      const response = await Axios.post(
        "https://falconlite.com/v1/api/send-email",
        queryString.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
        })
      );

      if (response?.data?.success) {
        setActivation(true);
        localStorage.setItem("verificationPending", true);
        setEncounterError(null);
      } else {
        setEncounterError(response?.data?.data?.message);
        localStorage.removeItem("verificationPending");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //   verification_code
  // "14AE0"
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-2xl mb-2">Create an account</h2>
      <p>Register on our website with your correct email and informations.</p>

      <div className="mt-[2rem] ">
        {encounterError && <ErrorMessage message={encounterError} />}
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            setLoading(true);
            // const url = localStorage.getItem("url");
            await handleSubmit(values);
            setLoading(false);
          }}
        >
          {(errors, touched) => (
            <Form>
              <TextField
                name="name"
                placeholder="Jerimiah"
                label="First Name"
                type="text"
              />
              <TextField
                name="email"
                placeholder="fame@gmail.com"
                label="Email Address"
                type="email"
              />
              <TextField
                name="phone"
                placeholder="+2348161764303"
                label="Phone Number"
                type="tel"
              />

              <div
                style={{ gridTemplateColumns: "1fr auto" }}
                className="mt-4 grid gap-x-2"
              ></div>

              <div className="relative">
                <TextField
                  name="password"
                  placeholder="**************"
                  label="Password"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  type={showPassword ? "text" : "password"}
                />
                <TogglePassword
                  handleToggle={handleToggle}
                  showPassword={showPassword}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="btn relative text-black rounded-lg transition-all ease-in-out hover:bg-[#06c0f4]"
                  type={loading ? "button" : "submit"}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex justify-center  py-4 ">
        <p className="flex items-center space-x-2 flex-wrap text-sm">
          <span>Already have an account?</span>{" "}
          <Link href="/" className="text-[#06c0f4] underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
