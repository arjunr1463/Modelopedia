import React, { useState } from "react";
import "../ClientSignup/ClientSignup.css";
import fmodel from "../../Assets/ClientSignup/fmodel.jpg";
import model from "../../Assets/ClientSignup/model.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ClientSignup() {
  const [success, setSuccess] = useState("");
  const [imageName1, setImageName1] = useState("Choose files to upload");
  const [imageName2, setImageName2] = useState("Choose files to upload");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const validationSchemalogin = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  //validation
  const validationSchema = yup.object().shape({
    fullname: yup.string().required("The fullname field is required"),
    companyname: yup.string().required("The company name field is required"),

    email: yup
      .string()
      .required("The email field is required")
      .email("Invalid email")
      .test("email-taken", "Email already taken", async function (value) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/register/check/email?email=${value}`
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
            `${process.env.REACT_APP_API_URL}/api/client/register/check/mobile?mobile=${value}`
          );
          const isTaken = response.data;
          return !isTaken;
        }
      ),

    designation: yup.string().required("The designation field is required"),
    address: yup.string().required("The address field is required"),
    city: yup.string().required("The city field is required"),
    postcode: yup.string().required("The postcode field is required"),
    state: yup.string().required("The state is required"),
    password: yup
      .string()
      .min(8, "Password must be atleast 8 characters")
      .required("The password field is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords does not match")
      .required("The confirm password field is required"),
    cmpnylogo: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File size is large (*max of 1MB)", (value) => {
        return value && value.size <= 1024 * 1024;
      }),
    cmpnycertificate: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File size is large (*max of 1MB)", (value) => {
        return value && value.size <= 1024 * 1024;
      }),
    policy: yup.string().required("The policy is required"),
  });

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center pt-[80px] pb-[5px] gap-10 w-full h-full  lg:px-[10px] lg:pb-[100px]">
      {/*left*/}
      <div className="flex flex-col w-[90vw] sm:w-[600px] lg:w-[450px] gap-5 border-[1px] rounded-[0.3rem] border-[#d6dbe0] px-4 py-5  ">
        <div className="">
          <img src={fmodel} alt="" className="" />
        </div>
        <div className="flex justify-center items-center ">
          <h className="text-[35px] font-medium">Sign in</h>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemalogin}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            if (values.rememberMe) {
              localStorage.setItem("email", values.email);
              localStorage.setItem("password", values.password);
            } else {
              localStorage.removeItem("email");
              localStorage.removeItem("password");
            }
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/api/client/register/login`,
                values
              )
              .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/Admin/Client/Dashboard");
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
                  err.response.data.error ===
                  "Login failed. Incorrect password."
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-3">
                <div>
                  <input
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="email"
                    placeholder="abc@gmail.com"
                    className="w-full h-[45px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[20px] font-[sans-serif] tracking-wide input"
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
                    className="w-full h-[45px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[20px] font-[sans-serif] tracking-wide input"
                  />
                  {errors.password && touched.password && (
                    <div className="text-[red] px-[10px] ">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[10px] lg:gap-0 lg:flex-row items-center justify-between break-all ">
                <div className="flex justify-center items-center gap-2 sm:gap-4 px-[3px]">
                  <input
                    type="checkbox"
                    id="1"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="h-[20px] w-[20px]"
                  />
                  <label
                    htmlFor="1"
                    className="font-[sans-serif] text-[#7e7c7b] tracking-wider"
                  >
                    {" "}
                    Remember Me
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    to="/forgotpasswordClient/client"
                    className="text-[#f9be4b] font-[sans-serif] text-[18px] tracking-wider hover:text-[blue] cursor-pointer duration-300"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className=""
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  to=""
                  className="text-white font-semibold text-[20px] font-[sans-serif] bg-[black] flex justify-center items-center rounded-[0.4rem] h-[50px] w-full cursor-pointer hover:bg-black/50 duration-300"
                >
                  Login Now
                </button>
              </motion.div>
              <div>
                <img src={model} alt="" />
              </div>
            </form>
          )}
        </Formik>
      </div>

      {/*Right*/}
      <div className="flex flex-col w-[90vw] sm:w-[600px] lg:[450px]  gap-5 border-[1px] rounded-[0.3rem] border-[#d6dbe0] px-4 py-5 relative">
        <div className="flex justify-center items-center">
          <h className="text-[35px] font-medium">Sign up</h>
        </div>
        <Formik
          initialValues={{
            fullname: "",
            companyname: "",
            email: "",
            mobile: "",
            designation: "",
            address: "",
            city: "",
            postcode: "",
            state: "",
            password: "",
            confirmpassword: "",
            cmpnycertificate: null,
            cmpnylogo: null,
            policy: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("fullname", values.fullname);
              formData.append("companyname", values.companyname);
              formData.append("email", values.email);
              formData.append("mobile", values.mobile);
              formData.append("designation", values.designation);
              formData.append("address", values.address);
              formData.append("city", values.city);
              formData.append("postcode", values.postcode);
              formData.append("state", values.state);
              formData.append("password", values.password);
              formData.append("confirmpassword", values.confirmpassword);
              formData.append("images", values.cmpnycertificate);
              formData.append("images", values.cmpnylogo);
              formData.append("policy", values.policy);
              await axios
                .post(
                  `${process.env.REACT_APP_API_URL}/api/client/register`,
                  formData
                )
                .then((res) => {
                  setSuccess(res.data);
                  setTimeout(() => {
                    setSuccess("");
                  }, 3000);
                  console.log(res);
                  resetForm({});
                  setSubmitting(false);
                });
            } catch (error) {
              console.log(error);
              setSubmitting(false);
            }
            navigate("/ClientLogin")
              .then((res) => {
                console.log(res);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="">
                <input
                  name="fullname"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  placeholder="Full Name:"
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px] tracking-wider input"
                />
                {errors.fullname && touched.fullname && (
                  <div className="text-[red] px-[10px] ">{errors.fullname}</div>
                )}
              </div>
              <div>
                <input
                  name="companyname"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyname}
                  placeholder="Company Name:"
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  input"
                />
                {errors.companyname && touched.companyname && (
                  <div className="text-[red] px-[10px] ">
                    {errors.companyname}
                  </div>
                )}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="abc@gmail.com"
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  input"
                />
                {errors.email && touched.email && (
                  <div className="text-[red] px-[10px] ">{errors.email}</div>
                )}
              </div>
              <div>
                <input
                  name="mobile"
                  type="tel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobile}
                  placeholder="Mobile Number:"
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  input"
                />
                {errors.mobile && touched.mobile && (
                  <div className="text-[red] px-[10px] ">{errors.mobile}</div>
                )}
              </div>
              <div>
                <input
                  name="designation"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.designation}
                  placeholder="Designation:"
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  input"
                />
                {errors.designation && touched.designation && (
                  <div className="text-[red] px-[10px] ">
                    {errors.designation}
                  </div>
                )}
              </div>
              <div>
                <input
                  name="address"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Full Address:"
                  className="w-full h-[100px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  address"
                />
                {errors.address && touched.address && (
                  <div className="text-[red] px-[10px] ">{errors.address}</div>
                )}
              </div>
              <div>
                <input
                  name="city"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  placeholder="City:"
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  input"
                />
                {errors.city && touched.city && (
                  <div className="text-[red] px-[10px] ">{errors.city}</div>
                )}
              </div>
              <div>
                <input
                  name="postcode"
                  type="tel"
                  placeholder="Post/Zip code:"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postcode}
                  className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px]  input"
                />
                {errors.postcode && touched.postcode && (
                  <div className="text-[red] px-[10px] ">{errors.postcode}</div>
                )}
              </div>
              <div>
                <select
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  className="flex  w-full h-[50px] pl-[30px] pr-[5px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px] text-[#7e7c7b]"
                >
                  <option value="">Select State</option>
                  <option value="Andhrapradesh">Andhra Pradesh</option>
                  <option value="Arunachapradesh">Arunachal pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chattisgarh">Chatttisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="HimachalPradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="MadhyaPradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Tamilnadu">Tamilnadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="UttarPradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Westbengal">West Bengal</option>
                </select>
                {errors.state && touched.state && (
                  <div className="text-[red] px-[10px] ">{errors.state}</div>
                )}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password:"
                  className="flex  w-full h-[50px] pl-[30px] pr-[5px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px] text-[#7e7c7b]"
                />
                {errors.password && touched.password && (
                  <div className="text-[red] px-[10px] ">{errors.password}</div>
                )}
              </div>
              <div>
                <input
                  name="confirmpassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmpassword}
                  placeholder="Confirm Password:"
                  className="flex  w-full h-[50px] pl-[30px] pr-[5px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm:text-[18px] text-[#7e7c7b]"
                />
                {errors.confirmpassword && touched.confirmpassword && (
                  <div className="text-[red] px-[10px] ">
                    {errors.confirmpassword}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-5 lg:gap-10 ">
                <div className="px-[5px] break-normal">
                  <h className="font-[sans-serif] text-[16px] md:text-[20px]">
                    *GST certificate/Company registration certificate:
                  </h>
                </div>

                <Field
                  name="cmpnycertificate"
                  render={({ field }) => (
                    <div className="flex flex-col gap-[10px]">
                      <input
                        className=" border-[1px] hidden"
                        type="file"
                        accept="image/*"
                        id="cmpnycertificate"
                        onChange={(e) => {
                          setFieldValue(field.name, e.currentTarget.files[0]);
                          console.log(e.currentTarget.files[0]);
                          setImageName1(e.target.files[0].name);
                        }}
                      />
                      <div className="flex w-full">
                        <span className="border-[1px] text-[#99919c] rounded-l-[0.2rem] outline-none shadow-md w-full flex items-center text-center px-[5px] sm:px-[10px] text-[12px] md:text-[14px]">
                          {imageName1}
                        </span>
                        <label
                          htmlFor="cmpnycertificate"
                          className="bg-[black] rounded-r-[0.2rem] cursor-pointer text-white font-semibold w-full md:w-[120px] h-[45px] flex justify-center items-center"
                        >
                          Choose File
                        </label>
                      </div>
                      {errors.cmpnycertificate && touched.cmpnycertificate ? (
                        <div className="text-[red] px-[10px] ">
                          {errors.cmpnycertificate}
                        </div>
                      ) : null}
                      {field.value && (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="Upload Preview"
                          className="h-[200px] w-[200px] object-cover"
                        />
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 lg:gap-10">
                <div className="px-[5px] break-normal">
                  <h className="font-[sans-serif] text-[16px] md:text-[20px] ">
                    Company Logo:
                  </h>
                </div>

                <Field
                  name="cmpnylogo"
                  render={({ field }) => (
                    <div className="flex flex-col gap-[10px]">
                      <input
                        className=" border-[1px] hidden"
                        type="file"
                        id="cmpnylogo"
                        accept="image/*"
                        onChange={(e) => {
                          setFieldValue(field.name, e.currentTarget.files[0]);
                          console.log(e.currentTarget.files[0]);
                          setImageName2(e.target.files[0].name);
                        }}
                      />
                      <div className="flex w-full">
                        <span className="border-[1px] text-[#99919c] rounded-l-[0.2rem] outline-none shadow-md w-full flex items-center text-center px-[5px] sm:px-[10px] text-[12px] md:text-[14px]">
                          {imageName2}
                        </span>
                        <label
                          htmlFor="cmpnylogo"
                          className="bg-[black] rounded-r-[0.2rem] cursor-pointer text-white font-semibold w-full md:w-[120px] h-[45px] flex justify-center items-center"
                        >
                          Choose File
                        </label>
                      </div>
                      {errors.cmpnylogo && touched.cmpnylogo ? (
                        <div className="text-[red] px-[10px] ">
                          {errors.cmpnylogo}
                        </div>
                      ) : null}
                      {field.value && (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="Upload Preview"
                          className="h-[200px] w-[200px] object-cover"
                        />
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col items-center gap-[10px]">
                <div className="flex flex-col items-center lg:flex-row gap-5 lg:gap-2">
                  <span className="text-[18px]">Show Privacy Policy</span>
                  <div className=" flex justify-center items-center gap-[5px]">
                    <input
                      name="policy"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.policy}
                      type="checkbox"
                      id="check"
                      className="h-[15px] w-[15px]"
                    />
                    <label
                      htmlFor="check"
                      className="text-[red] text-[15px] lg:text-[18px]"
                    >
                      *accept terms and condition
                    </label>
                  </div>
                </div>
                {errors.policy && touched.policy && (
                  <div className="text-[red] px-[10px] ">{errors.policy}</div>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className=""
              >
                <button
                  type="submit"
                  className="text-white font-bold text-[18px] flex justify-center items-center bg-black w-full h-[40px] rounded-[0.3rem]"
                >
                  Register Now
                </button>
                <div className="text-[14px] font-fair text-[red] flex justify-center py-[10px]">
                  {success}
                </div>
              </motion.div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ClientSignup;
