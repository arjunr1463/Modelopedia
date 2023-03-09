import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import "./DashBoard.css";
import { motion } from "framer-motion";

function EditAppearanceInfo({ action }) {
  const [success, setSuccess] = useState([]);
  const location = useLocation();
  const validationSchema = yup.object().shape({
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
  });

  return (
    <Formik
      initialValues={{
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
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/user/register/user/update/personal`,
            {
              eyecolor: values.eyecolor,
              dresssize: values.dresssize,
              haircolor: values.haircolor,
              bodytype: values.bodytype,
              skintone: values.skintone,
              hairsize: values.hairsize,
              hairtype: values.hairtype,
              height: values.height,
              shoesize: values.shoesize,
              weight: values.weight,
              aboutyourself: values.aboutyourself,
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
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <motion.form
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-[20px] px-[20px]"
        >
          <div className="flex gap-[30px]">
            <div className="w-full">
              <div className="border-b-[1px] border-t-[1px] py-[20px] px-[15px] w-full flex flex-col gap-[5px] text-[14px] ">
                <span className="font-fair px-[5px] text-[15px]">
                  Eye Color
                </span>
                <select
                  name="eyecolor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.eyecolor}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
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
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.eyecolor}
                  </div>
                )}
              </div>

              <div className=" border-b-[1px]  py-[20px] px-[15px] w-full  flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Hair Color
                </span>
                <select
                  name="haircolor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.haircolor}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
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
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.haircolor}
                  </div>
                )}
              </div>

              <div className="border-b-[1px]  py-[20px] px-[15px] w-full flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Hair Size
                </span>
                <select
                  name="hairsize"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hairsize}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
                >
                  <option value={""}>*Select hair size</option>
                  <option>Bald</option>
                  <option>Short</option>
                  <option>Long</option>
                  <option>Medium</option>
                </select>
                {errors.hairsize && touched.hairsize && (
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.hairsize}
                  </div>
                )}
              </div>
              <div className="w-full border-b-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Hair Type
                </span>
                <select
                  name="hairtype"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hairtype}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
                >
                  <option value={""}>*Select hair type</option>
                  <option>Straight</option>
                  <option>Wavy</option>
                  <option>Curly</option>
                  <option>Coily</option>
                  <option>Other</option>
                </select>
                {errors.hairtype && touched.hairtype && (
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.hairtype}
                  </div>
                )}
              </div>

              <div className="w-full border-b-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Shoe Size
                </span>
                <select
                  name="shoesize"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.shoesize}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
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
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.shoesize}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="w-full border-b-[1px] border-t-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Dress Size
                </span>
                <select
                  name="dresssize"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dresssize}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
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
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.dresssize}
                  </div>
                )}
              </div>

              <div className="w-full border-b-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Body Type
                </span>
                <select
                  name="bodytype"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bodytype}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
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
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.bodytype}
                  </div>
                )}
              </div>
              <div className="w-full border-b-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">
                  Skin Tone
                </span>
                <select
                  name="skintone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.skintone}
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
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
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.skintone}
                  </div>
                )}
              </div>

              <div className="w-full border-b-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">Height</span>
                <input
                  name="height"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.height}
                  type="text"
                  placeholder="Height in feet Ex:-(5.1)"
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
                />
                {errors.height && touched.height && (
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.height}
                  </div>
                )}
              </div>
              <div className="w-full border-b-[1px]  py-[20px] px-[15px] flex flex-col gap-[5px] text-[14px]">
                <span className="font-fair px-[5px] text-[15px]">Weight</span>
                <input
                  type="text"
                  name="weight"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.weight}
                  placeholder="Weight in Kg Ex:-(45.5)"
                  className="w-full h-[40px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]   "
                />
                {errors.weight && touched.weight && (
                  <div className=" text-[red] text-[12px] px-[15px] ">
                    {errors.weight}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <input
              type="text"
              name="aboutyourself"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.aboutyourself}
              placeholder="About Yourself(Hobbies,Interest,Education,Experiance"
              className="w-full px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.2rem]  h-[150px]  "
            />
            {errors.aboutyourself && touched.aboutyourself && (
              <div className=" text-[red] text-[12px] px-[15px] ">
                {errors.aboutyourself}
              </div>
            )}
          </div>
          <div className="flex justify-center gap-[20px]">
            <button
              type="submit"
              className="bg-[black] text-white font-semibold w-[100px] flex justify-center items-center h-[30px]"
            >
              Save
            </button>
            <button
              onClick={() => {
                action();
                window.location.reload();
              }}
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center text-[14px] font-fair text-[red] py-[10px]">
            {success}
          </div>
        </motion.form>
      )}
    </Formik>
  );
}

export default EditAppearanceInfo;
