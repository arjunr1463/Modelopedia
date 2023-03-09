import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { motion } from "framer-motion";
import "./DashBoard.css";
function EditPersonalInfo({ action }) {
  const [success, setSuccess] = useState([]);
  const location = useLocation();
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("The fullName field is required"),
    address: yup.string().required("The address field is required"),
    city: yup.string().required("The city field is required"),
    postcode: yup.string().required("The post/Zipcode field is required"),
    state: yup.string().required("The state field is required"),
    gender: yup.string().required("The gender field is required"),
    language: yup.string().required("The language field is required"),
    experience: yup.string().required("The experience field is required"),
  });

  return (
    <Formik
      initialValues={{
        fullName: location.state.name,
        email: location.state.email,
        address: location.state.address,
        city: location.state.city,
        postcode: location.state.pincode,
        state: location.state.state,
        gender: location.state.gender,
        language: location.state.language,
        instagram: location.state.instagram,
        facebook: location.state.facebook,
        experience: location.state.experience,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/user/register/user/update/personal`,
            {
              fullName: values.fullName,
              email: values.email,
              city: values.city,
              gender: values.gender,
              language: values.language,
              address: values.address,
              state: values.state,
              postcode: values.postcode,
              instagram: values.instagram,
              facebook: values.facebook,
              experience: values.experience,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setSuccess(response.data.data);
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
      }) => (
        <motion.form
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-[20px]"
        >
          <div className="flex flex-col md:flex-row justify-between px-[20px] gap-[30px] ">
            <div className="flex flex-col  w-full">
              <div>
                <div className="border-b-[1px] border-t-[1px] py-[20px] px-[10px]">
                  <input
                    name="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-[35px] px-[10px] outline-none border-[1px] border-[#d6dbe0]  sm: tracking-wider  shadow-sm"
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.fullName}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-[1px]  py-[20px] px-[10px]">
                <div className=" grid grid-cols-2 md:grid-cols-3 gap-1 ">
                  <div className="flex gap-1 justify-start items-center">
                    <input
                      name="gender"
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.gender);
                      }}
                      onBlur={handleBlur}
                      value="Male"
                      type="radio"
                      id="male"
                      className=""
                      checked={values.gender === "Male"}
                    />
                    <label htmlFor="male" className="text-[14px]">
                      Male
                    </label>
                  </div>
                  <div className="flex gap-1 justify-start items-center">
                    <input
                      name="gender"
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.gender);
                      }}
                      onBlur={handleBlur}
                      value="Female"
                      type="radio"
                      id="female"
                      checked={values.gender === "Female"}
                      className=""
                    />
                    <label htmlFor="female" className="text-[14px]">
                      Female
                    </label>
                  </div>
                  <div className="flex gap-1 justify-start items-center">
                    <input
                      name="gender"
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.gender);
                      }}
                      onBlur={handleBlur}
                      checked={values.gender === "Kid"}
                      value="Kid"
                      type="radio"
                      id="kid"
                      className=""
                    />
                    <label htmlFor="kid" className="text-[14px]">
                      Kid
                    </label>
                  </div>
                  <div className="flex gap-1 justify-start items-center">
                    <input
                      name="gender"
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.gender);
                      }}
                      onBlur={handleBlur}
                      checked={values.gender === "Transgender"}
                      value="Transgender"
                      type="radio"
                      id="transgender"
                      className=""
                    />
                    <label htmlFor="transgender" className="text-[14px]">
                      Transgender
                    </label>
                  </div>
                </div>

                {errors.gender && touched.gender && (
                  <div className="text-[red] text-[12px] px-[30px] ">
                    {errors.gender}
                  </div>
                )}
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div className="flex flex-col gap-[10px] ">
                  <div className=" grid grid-cols-2 md:grid-cols-3 gap-1 ">
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        type="checkbox"
                        id="english"
                        className=""
                        checked={values.language.includes("English")}
                        onChange={(e) => {
                          handleChange(e);
                          console.log(values.language);
                        }}
                        onBlur={handleBlur}
                        value="English"
                      />
                      <label htmlFor="english" className="text-[14px]">
                        English
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Hindi"
                        type="checkbox"
                        id="hindi"
                        className=""
                        checked={values.language.includes("Hindi")}
                      />
                      <label htmlFor="hindi" className="text-[14px]">
                        Hindi
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Malayalam")}
                        value="Malayalam"
                        type="checkbox"
                        id="malayalam"
                        className=""
                      />
                      <label htmlFor="malayalam" className="text-[14px]">
                        Malayalam
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Tamil")}
                        value="Tamil"
                        type="checkbox"
                        id="tamil"
                        className=""
                      />
                      <label htmlFor="tamil" className="text-[14px]">
                        Tamil
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        checked={values.language.includes("Telugu")}
                        onBlur={handleBlur}
                        value="Telugu"
                        type="checkbox"
                        id="telugu"
                        className=""
                      />
                      <label htmlFor="telugu" className="text-[14px]">
                        Telugu
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Kannada")}
                        value="Kannada"
                        type="checkbox"
                        id="kannada"
                        className=""
                      />
                      <label htmlFor="kannada" className="text-[14px]">
                        Kannada
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Bengali")}
                        value="Bengali"
                        type="checkbox"
                        id="bengali"
                        className=""
                      />
                      <label htmlFor="bengali" className="text-[14px]">
                        Bengali
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Marathi")}
                        value="Marathi"
                        type="checkbox"
                        id="marathi"
                        className=""
                      />
                      <label htmlFor="marathi" className="text-[14px]">
                        Marathi
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Gujarati")}
                        value="Gujarati"
                        type="checkbox"
                        id="gujarati"
                        className=""
                      />
                      <label htmlFor="gujarati" className="text-[14px]">
                        Gujarati
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Urdu")}
                        value="Urdu"
                        type="checkbox"
                        id="urdu"
                        className=""
                      />
                      <label htmlFor="urdu" className="text-[14px]">
                        Urdu
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Odia")}
                        value="Odia"
                        type="checkbox"
                        id="odia"
                        className=""
                      />
                      <label htmlFor="odia" className="text-[14px]">
                        Odia
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Punjabi")}
                        value="Punjabi"
                        type="checkbox"
                        id="punjabi"
                        className=""
                      />
                      <label htmlFor="punjabi" className="text-[14px]">
                        Punjabi
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.language.includes("Assamese")}
                        value="Assamese"
                        type="checkbox"
                        id="assamese"
                        className=""
                      />
                      <label htmlFor="assamese" className="text-[14px]">
                        Assamese
                      </label>
                    </div>
                  </div>

                  {errors.language && touched.language && (
                    <div className="text-[red] text-[12px] px-[30px] ">
                      {errors.language}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    type="text"
                    placeholder="City:"
                    className="w-full h-[35px] px-[10px] outline-none border-[1px] border-[#d6dbe0]  sm: tracking-wider  shadow-sm"
                  />
                  {errors.city && touched.city && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.city}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    type="text"
                    placeholder="Full Address:"
                    className="w-full h-[80px] px-[10px] outline-none border-[1px] border-[#d6dbe0] shadow-sm"
                  />
                  {errors.address && touched.address && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.address}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <select
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    className="flex  w-full h-[35px] pl-[10px] pr-[5px] outline-none border-[1px] border-[#d6dbe0] text-[14px] font-fair  sm: text-[#7e7c7b] shadow-sm"
                  >
                    <option value="">*Select State</option>
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
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.state}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    name="postcode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postcode}
                    type="text"
                    placeholder="Post/Zip code:"
                    className="w-full h-[35px] px-[10px] outline-none border-[1px] border-[#d6dbe0]  sm: tracking-wider  shadow-sm"
                  />
                  {errors.postcode && touched.postcode && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.postcode}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] w-full">
              <div className="border-b-[1px] border-t-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="email"
                    placeholder="Email"
                    className="w-full h-[35px] px-[10px] outline-none border-[1px] border-[#d6dbe0]  sm: tracking-wider  shadow-sm"
                  />
                  {errors.email && touched.email && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    value={values.instagram}
                    name="instagram"
                    onChange={(e) => {
                      handleChange(e);
                      console.log(values.instagram);
                    }}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="https://www.instagram.com/your-name/"
                    className="w-full h-[35px] px-[10px] break-all outline-none border-[1px] border-[#d6dbe0]   shadow-sm"
                  />
                </div>
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    value={values.facebook}
                    name="facebook"
                    onChange={(e) => {
                      handleChange(e);
                      console.log(values.facebook);
                    }}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="https://www.facebook.com/your-name"
                    className="w-full h-[35px] px-[10px] break-all outline-none border-[1px] border-[#d6dbe0]  shadow-sm"
                  />
                </div>
              </div>
              <div className="border-b-[1px] py-[20px] px-[10px]">
                <div>
                  <input
                    name="experience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.experience}
                    type="text"
                    placeholder="Years of experience in digit"
                    className="w-full h-[35px] px-[10px] break-all outline-none border-[1px] border-[#d6dbe0]  shadow-sm"
                  />
                  {errors.experience && touched.experience && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.experience}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center gap-[20px]">
              <button
                type="submit"
                className="bg-[black] font-fair text-white font-semibold w-[100px] flex justify-center items-center h-[30px]"
              >
                Save
              </button>
              <button
                onClick={() => {
                  action();
                  window.location.reload();
                }}
                className="font-fair font-semibold"
              >
                Cancel
              </button>
            </div>
            <div className="flex justify-center text-[14px] font-fair text-[red] py-[20px]">
              {success}
            </div>
          </div>
        </motion.form>
      )}
    </Formik>
  );
}

export default EditPersonalInfo;
