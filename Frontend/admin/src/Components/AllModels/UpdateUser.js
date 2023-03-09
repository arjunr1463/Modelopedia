import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";

function UpdateUser() {
  const [success, setSuccess] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("The email field is required"),
    mobile: yup.string().required("The mobile field is required"),
    eyecolor: yup.string().required("The eye color field is required"),
    haircolor: yup.string().required("The hair color field is required"),
    hairsize: yup.string().required("The hair size field is required"),
    hairtype: yup.string().required("The hair type field is required"),
    shoesize: yup.string().required("The shoe size field is required"),
    dresssize: yup.string().required("The dress size field is required"),
    bodytype: yup.string().required("The body type field is required"),
    skintone: yup.string().required("The skin tone field is required"),
    height: yup.string().required("The height field is required"),
    weight: yup.string().required("The weight field is required"),
    aboutyourself: yup.string().required("The description field is required"),
    dob: yup.string().required("The dob field is required"),
    address: yup.string().required("The address field is required"),
    city: yup.string().required("The city field is required"),
    postcode: yup.string().required("The post/Zipcode field is required"),
    state: yup.string().required("The state field is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords does not match")
      .required("The confirm password field is required"),
    gender: yup.string().required("The gender field is required"),
    language: yup.string().required("The language field is required"),
    experience: yup.string().required("The experience field is required"),
  });

  return (
    <div className=" w-full h-full  flex flex-col    bg-[#ffffff] ">
      <Formik
        initialValues={{
          email: location.state.email,
          mobile: location.state.phone,
          eyecolor: location.state.eyecolor,
          haircolor: location.state.haircolor,
          hairsize: location.state.hairsize,
          hairtype: location.state.hairtype,
          shoesize: location.state.shoesize,
          dresssize: location.state.dresssize,
          bodytype: location.state.bodytype,
          skintone: location.state.skintone,
          height: location.state.height,
          weight: location.state.weight,
          aboutyourself: location.state.aboutyourself,
          dob: location.state.dob,
          address: location.state.address,
          city: location.state.city,
          postcode: location.state.pincode,
          state: location.state.state,
          password: location.state.confirmpassword,
          confirmpassword: location.state.confirmpassword,
          gender: location.state.gender,
          language: location.state.language,
          instagram: location.state.instagram,
          facebook: location.state.facebook,
          experience: location.state.experience,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          try {
            axios
              .put(
                `${process.env.REACT_APP_API_URL}/api/user/register/user/update/AdminUser/${id}`,
                {
                  email: values.email,
                  mobile: values.mobile,
                  eyecolor: values.eyecolor,
                  haircolor: values.haircolor,
                  hairsize: values.hairsize,
                  hairtype: values.hairtype,
                  shoesize: values.shoesize,
                  dresssize: values.dresssize,
                  bodytype: values.bodytype,
                  skintone: values.skintone,
                  height: values.height,
                  weight: values.weight,
                  address: values.address,
                  aboutyourself: values.aboutyourself,
                  dob: values.dob,
                  city: values.city,
                  postcode: values.postcode,
                  state: values.state,
                  gender: values.gender,
                  language: values.language,
                  instagram: values.instagram,
                  facebook: values.facebook,
                  experience: values.experience,
                }
              )
              .then((res) => {
                setSuccess(res.data.data);
                setTimeout(() => {
                  setSuccess("");
                }, 3000);
                window.location.reload();
              });
            actions.setSubmitting(false);
          } catch (error) {
            console.log(error);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-[30px] ">
            <div className="text-[12px] flex flex-col md:flex-row md:gap-[50px]">
              <div className="flex flex-col gap-[20px]">
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="abc@gmail.com"
                    className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] "
                  />
                  {errors.email && touched.email && (
                    <div className="text-[red] text-[12px] px-[10px] ">
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
                    className=" w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] "
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.mobile}
                    </div>
                  )}
                </div>
                <div className="flex flex-row">
                  <input
                    name="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dob}
                    type="date"
                    id="dob"
                    className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]    "
                  />
                </div>
                {errors.dob && touched.dob && (
                  <div className="text-[red] text-[12px]  ">{errors.dob}</div>
                )}
                <div className="flex flex-col gap-[10px]">
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
                        checked={values.gender === "Male"}
                        id="male"
                        className=""
                      />
                      <label htmlFor="male" className="text-[12px]">
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
                        checked={values.gender === "Female"}
                        id="female"
                        className=""
                      />
                      <label htmlFor="female" className="text-[12px]">
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
                      <label htmlFor="kid" className="text-[12px]">
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
                        value="Transgender"
                        checked={values.gender === "Transgender"}
                        type="radio"
                        id="transgender"
                        className=""
                      />
                      <label htmlFor="transgender" className="text-[12px]">
                        Transgender
                      </label>
                    </div>
                  </div>

                  {errors.gender && touched.gender && (
                    <div className="text-[red] text-[12px]  ">
                      {errors.gender}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    type="text"
                    placeholder="Full Address:"
                    className="w-full h-[120px]  break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm:  "
                  />
                  {errors.address && touched.address && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.address}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    type="text"
                    placeholder="City:"
                    className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm: tracking-wider  "
                  />
                  {errors.city && touched.city && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.city}
                    </div>
                  )}
                </div>

                <div>
                  <select
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    className="flex  w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm: text-[#7e "
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

                <div className="flex flex-col gap-[10px]">
                  <div className=" grid grid-cols-2 md:grid-cols-3 gap-1 ">
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        type="checkbox"
                        id="english"
                        checked={values.language.includes("English")}
                        className=""
                        onChange={(e) => {
                          handleChange(e);
                          console.log(values.language);
                        }}
                        onBlur={handleBlur}
                        value="English"
                      />
                      <label htmlFor="english" className="text-[12px]">
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
                      <label htmlFor="hindi" className="text-[12px]">
                        Hindi
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Malayalam"
                        type="checkbox"
                        id="malayalam"
                        className=""
                        checked={values.language.includes("Malayalam")}
                      />
                      <label htmlFor="malayalam" className="text-[12px]">
                        Malayalam
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Tamil"
                        type="checkbox"
                        id="tamil"
                        className=""
                        checked={values.language.includes("Tamil")}
                      />
                      <label htmlFor="tamil" className="text-[12px]">
                        Tamil
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Telugu"
                        type="checkbox"
                        id="telugu"
                        className=""
                        checked={values.language.includes("Telugu")}
                      />
                      <label htmlFor="telugu" className="text-[12px]">
                        Telugu
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Kannada"
                        type="checkbox"
                        id="kannada"
                        className=""
                        checked={values.language.includes("Kannada")}
                      />
                      <label htmlFor="kannada" className="text-[12px]">
                        Kannada
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Bengali"
                        type="checkbox"
                        id="bengali"
                        className=""
                        checked={values.language.includes("Bengali")}
                      />
                      <label htmlFor="bengali" className="text-[12px]">
                        Bengali
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Marathi"
                        type="checkbox"
                        id="marathi"
                        className=""
                        checked={values.language.includes("Marathi")}
                      />
                      <label htmlFor="marathi" className="text-[12px]">
                        Marathi
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Gujarati"
                        type="checkbox"
                        id="gujarati"
                        className=""
                        checked={values.language.includes("Gujarati")}
                      />
                      <label htmlFor="gujarati" className="text-[12px]">
                        Gujarati
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Urdu"
                        type="checkbox"
                        id="urdu"
                        className=""
                        checked={values.language.includes("Urdu")}
                      />
                      <label htmlFor="urdu" className="text-[12px]">
                        Urdu
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Odia"
                        type="checkbox"
                        id="odia"
                        className=""
                        checked={values.language.includes("Odia")}
                      />
                      <label htmlFor="odia" className="text-[12px]">
                        Odia
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Punjabi"
                        type="checkbox"
                        id="punjabi"
                        className=""
                        checked={values.language.includes("Punjabi")}
                      />
                      <label htmlFor="punjabi" className="text-[12px]">
                        Punjabi
                      </label>
                    </div>
                    <div className="flex gap-1 justify-start items-center">
                      <input
                        name="language"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="Assamese"
                        type="checkbox"
                        id="assamese"
                        className=""
                        checked={values.language.includes("Assamese")}
                      />
                      <label htmlFor="assamese" className="text-[12px]">
                        Assamese
                      </label>
                    </div>
                  </div>

                  {errors.language && touched.language && (
                    <div className="text-[red] text-[12px]  ">
                      {errors.language}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    name="postcode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postcode}
                    type="text"
                    placeholder="Post/Zip code:"
                    className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm: tracking-wider  "
                  />
                  {errors.postcode && touched.postcode && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.postcode}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col lg:flex-row gap-[40px] bg-[#ffffff] ">
                  <div className=" w-full">
                    <select
                      name="eyecolor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.eyecolor}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select eye color</option>
                      <option>Black</option>
                      <option>Brown</option>
                      <option>Gray</option>
                      <option>Green</option>
                      <option>Hazel</option>
                      <option>Blue</option>
                      <option>Amber</option>
                      <option>Red and Violet</option>
                    </select>
                    {errors.eyecolor && touched.eyecolor && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.eyecolor}
                      </div>
                    )}
                  </div>

                  <div className=" w-full">
                    <select
                      name="haircolor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.haircolor}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select hair color</option>
                      <option>Black</option>
                      <option>Brown</option>
                      <option>White</option>
                      <option>Black & White</option>
                      <option>Red</option>
                      <option>Blonde</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Red & Violet</option>
                      <option>Other</option>
                    </select>
                    {errors.haircolor && touched.haircolor && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.haircolor}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[40px] bg-[#ffffff] ">
                  <div className="w-full">
                    <select
                      name="hairsize"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hairsize}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select hair size</option>
                      <option>Bald</option>
                      <option>Short</option>
                      <option>Long</option>
                      <option>Medium</option>
                    </select>
                    {errors.hairsize && touched.hairsize && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.hairsize}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <select
                      name="hairtype"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hairtype}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select hair type</option>
                      <option>Straight</option>
                      <option>Wavy</option>
                      <option>Curly</option>
                      <option>Coily</option>
                      <option>Other</option>
                    </select>
                    {errors.hairtype && touched.hairtype && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.hairtype}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[40px] bg-[#ffffff] ">
                  <div className="w-full">
                    <select
                      name="shoesize"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shoesize}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select Shoe Size</option>
                      <option>0</option>
                      <option>0.5</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                    {errors.shoesize && touched.shoesize && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.shoesize}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <select
                      name="dresssize"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dresssize}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select dress size</option>
                      <option>0-6 months</option>
                      <option>6-12 months</option>
                      <option>1-5 years</option>
                      <option>5-10 years</option>
                      <option>10-15 years</option>
                      <option>XS/38</option>
                      <option>S/39</option>
                      <option>M/40</option>
                      <option>L/42</option>
                      <option>XL/44</option>
                      <option>2XL/46</option>
                    </select>
                    {errors.dresssize && touched.dresssize && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.dresssize}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[40px] bg-[#ffffff] ">
                  <div className="w-full">
                    <select
                      name="bodytype"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bodytype}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select body type</option>
                      <option>Slim</option>
                      <option>Average</option>
                      <option>Fit</option>
                      <option>Athletic</option>
                      <option>Muscular</option>
                      <option>Heavy</option>
                    </select>
                    {errors.bodytype && touched.bodytype && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.bodytype}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <select
                      name="skintone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.skintone}
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    >
                      <option value={""}>*Select skin tone</option>
                      <option>Fair</option>
                      <option>Light</option>
                      <option>Medium</option>
                      <option>Dusky</option>
                      <option>Olive</option>
                      <option>Tan</option>
                      <option>Brown</option>
                      <option>Dark Brown</option>
                      <option>Black</option>
                    </select>
                    {errors.skintone && touched.skintone && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.skintone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[40px] bg-[#ffffff] ">
                  <div className="w-full">
                    <input
                      name="height"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.height}
                      type="text"
                      placeholder="Height in feet Ex:-(5.1)"
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    />
                    {errors.height && touched.height && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.height}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="weight"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.weight}
                      placeholder="Weight in Kg Ex:-(45.5)"
                      className="w-full h-[35px]  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  text-[#7e7c7b]"
                    />
                    {errors.weight && touched.weight && (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.weight}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-[5px]">
                  <div className="flex px-[10px]">
                    <span className="text-[12px]">Instagram Id:</span>
                  </div>
                  <div className="w-full">
                    <input
                      name="instagram"
                      value={values.instagram}
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.instagram);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="https://www.instagram.com/your-name/"
                      className="w-full h-[35px]  break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm:  "
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px]">
                  <div className="flex px-[10px]">
                    <span className="text-[12px]">Facebook Id:</span>
                  </div>
                  <div className="w-full">
                    <input
                      name="facebook"
                      value={values.facebook}
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.facebook);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="https://www.facebook.com/your-name"
                      className="w-full h-[35px]  break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm:  "
                    />
                  </div>
                </div>
                <div>
                  <input
                    name="experience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.experience}
                    type="text"
                    placeholder="Years of experience in digit"
                    className="w-full h-[35px]  break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px] sm:  "
                  />
                  {errors.experience && touched.experience && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.experience}
                    </div>
                  )}
                </div>
                <div className="">
                  <input
                    type="text"
                    name="aboutyourself"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aboutyourself}
                    placeholder="About Yourself(Hobbies,Interest,Education,Experiance"
                    className="w-full  outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem] px-[10px]  h-[150px] text-[#7e7c7b]"
                  />
                  {errors.aboutyourself && touched.aboutyourself && (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.aboutyourself}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <button
                type="submit"
                className="bg-[#4099ff] text-white w-[200px] h-[35px] font-semibold rounded-[0.2rem]"
              >
                Update
              </button>
              <div className="text-[12px] text-[red]">{success}</div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateUser;
