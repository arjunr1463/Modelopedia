import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import model from "../../Assets/Model/modelgigi.jpg";
import "../full.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { successContext } from "../../context/success";

function ModelLogin() {
  const {success}=useContext(successContext)
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <div className="bg-[#ffffff] w-full h-full  flex flex-col items-center lg:flex-row lg:gap-[20px] lg:justify-center lg:items-start py-[50px] md:py-[150px]  px-[10px]">
      {/*left */}
      <div className="px-[15px] py-[30px] lg:px-0 lg:py-0 ">
        <img
          src={model}
          alt=""
          className="lg:h-[300px] lg:w-[500px] md:h-[450px] md:w-[700px] sm:w-[550px] sm:h-[320px] w-[95vw]  object-cover"
        />
      </div>
      {/*Right */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/register/login`, values)
            .then((res) => {
              localStorage.setItem('token', res.data.token);
              navigate("/Admin/Model/Main");
              setSubmitting(false);
            })

            .catch((err) => {
              console.error("Login error:", err.response.data);
              let errors = {};
              if (
                err.response.data.error === "Login failed. Email not found."
              ) {
                errors.email = "Email not found";
              } else if (
                err.response.data.error === "Login failed. Incorrect password."
              ) {
                errors.password = "Incorrect password";
              }
              setErrors(errors);
              setSubmitting(false);
            });
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          values,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  gap-5 lg:gap-5  border-[#d6dbe0] px-4 lg:w-[600px]  md:w-[700px] sm:w-[550px] w-[95vw]"
          >
            <div className="flex flex-col lg:flex-row lg:gap-[20px] justify-start items-center ">
              <h className="text-[35px] font-medium">Sign in</h>
              {success && (
                <div className="flex justify-center font-fair text-[14px] sm:text-[18px] text-[red] text-center">
                  {success}
                </div>
              )}
            </div>
            
            <div>
              <input
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="email"
                placeholder="abc@gmail.com"
                className="w-full h-[45px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[20px]  tracking-wide input shadow-lg"
              />
              {errors.email && touched.email && (
                <div className="text-[red] px-[10px] ">{errors.email}</div>
              )}
            </div>

            <div>
              <input
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                placeholder="*********"
                className="w-full h-[45px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[20px]  tracking-wide input shadow-lg"
              />
              {errors.password && touched.password && (
                <div className="text-[red] px-[10px] ">{errors.password}</div>
              )}
            </div>

            <div className="flex flex-col items-center sm:items-start sm:flex-row lg:items-center sm:justify-between  gap-4 lg:gap-0">
              <div className="flex justify-center items-center gap-2 sm:gap-4 px-[3px]">
                <input
                  type="checkbox"
                  id="1"
                  className="sm:h-[20px] sm:w-[20px] h-[16px] w-[16px]"
                />
                <label htmlFor="1" className=" text-[#7e7c7b] tracking-wider">
                  {" "}
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgotpassword/user"
                className="text-[#f9be4b]  text-[18px] tracking-wider hover:text-[blue] cursor-pointer duration-300"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[black] flex justify-center items-center rounded-[0.4rem] h-[45px] cursor-pointer hover:bg-black/50 duration-300 text-white font-semibold text-[20px] "
            >
              Login Now
            </button>
            <div className="flex flex-col lg:flex-row lg:gap-[10px] justify-center items-center">
              <span className=" text-[#7e7c7b] text-[20px] lg:text-[18px]">
                New Model?
              </span>
              <Link to="/ModelRegistration" className=" text-[20px] ">
                Don't have an account?
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ModelLogin;
