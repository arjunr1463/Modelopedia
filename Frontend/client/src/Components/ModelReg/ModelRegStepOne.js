import React from "react";
import model from "../../Assets/Model/modelgigi.jpg";
import * as yup from "yup";
import { Formik } from "formik";
import Banner from "../../Components/Banner/ModelRegistration";
import Scroll from "../../Components/ScrollToTop";
import axios from "axios";

function ModelRegStepone(props) {
  //validation
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("The name field is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("The email field is required")
      .test("email-taken", "Email already taken", async function (value) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/check/email?email=${value}`
        );
        const isTaken = response.data;
        return !isTaken;
      }),
    mobile: yup
    .string()
    .required("The mobile field is required")
    .min(10, "Enter valid number")
    .test(
      "mobile-taken",
      "Mobile number already taken",
      async function (value) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/check/mobile?mobile=${value}`
        );
        const isTaken = response.data;
        return !isTaken;
      }
    ),
  });

  return (
    <>
      <Scroll />
      <Banner />
      <div className="text-[17px] w-full h-full bg-[#ffffff]  flex flex-col items-center lg:flex-row lg:gap-[20px] lg:justify-center lg:items-start py-[50px] md:py-[150px]  px-[10px]">
        {/*left */}
        <div className="px-[15px] py-[30px] lg:px-0 lg:py-0 flex ">
          <img
            src={model}
            alt=""
            className="lg:h-[300px] lg:w-[500px] md:h-[450px] md:w-[700px] sm:w-[550px] sm:h-[320px] w-[95vw]  object-cover"
          />
        </div>
        {/*Right */}
        <div className="flex flex-col gap-10 lg:gap-5  border-[#d6dbe0] px-4 lg:w-[600px]  md:w-[700px] sm:w-[550px] w-[95vw]">
          <div className="flex justify-start items-center break-normal ">
            <h className="text-[25px] sm:text-[35px] font-semibold">
              Step 1-Registration
            </h>
          </div>
          <Formik
            initialValues={{ fullName: "", email: "", mobile: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              props.nextStep(values);
              try {
                actions.setSubmitting(false);
              } catch (err) {
                console.error("Login error:", err.response.data);
                actions.setSubmitting(false);
              }
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 lg:gap-5"
              >
                <div>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Full Name"
                    className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] shadow-lg"
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.fullName}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="abc@gmail.com"
                    className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] shadow-lg"
                  />
                  {errors.email && touched.email && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="">
                  <input
                    type="tel"
                    name="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    placeholder="Mobile Number"
                    className=" w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] shadow-lg"
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.mobile}
                    </div>
                  )}
                </div>

                <div className="">
                  <button
                    type="submit"
                    isSubmitting
                    className="text-white  text-[20px]  bg-[black] flex justify-center items-center rounded-[0.4rem] h-[50px] cursor-pointer hover:bg-black/50 duration-300 w-full"
                  >
                    Proceed
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default ModelRegStepone;
