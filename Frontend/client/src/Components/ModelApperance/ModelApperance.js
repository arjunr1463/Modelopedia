import React from "react";
import model from "../../Assets/Model/modelgigi.jpg";
import * as yup from "yup";
import { Formik } from "formik";
import Banner from "../../Components/Banner/ModelAppearance";
import Scroll from "../../Components/ScrollToTop";
import "../full.css"

function ModelApperance(props) {
  //validation

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
    <>
     <Scroll />
      <Banner />
    
    <div className="text-[17px] w-full h-full  flex flex-col items-center lg:flex-row lg:gap-[20px] lg:justify-center lg:items-start lg:pb-[100px] px-[10px] bg-[#ffffff] pt-[30px] md:pt-[120px]">
      {/*left */}
      <div className="px-[15px] py-[30px] lg:px-0 lg:py-0 flex ">
        <img
          src={model}
          alt=""
          className="lg:h-[300px] lg:w-[500px] md:h-[450px] md:w-[700px] sm:w-[550px] sm:h-[320px] w-[95vw] h-[220px] object-cover"
        />
      </div>
      {/*Right */}
      <div className=" flex flex-col gap-10 lg:gap-5  border-[#d6dbe0] px-4  lg:w-[600px]  md:w-[700px] sm:w-[550px] w-[95vw]">
        <div className="flex justify-start items-center break-normal ">
          <h className="text-[25px] sm:text-[35px] font-semibold ">
            Step 2-Apperance Information
          </h>
        </div>
        <Formik
          initialValues={{
            eyecolor: "",
            haircolor: "",
            hairsize: "",
            hairtype: "",
            shoesize: "",
            dresssize: "",
            bodytype: "",
            skintone: "",
            height: "",
            weight: "",
            aboutyourself: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            props.nextStep(values);
            try {
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 lg:gap-10"
            >
              <div className="flex flex-col lg:flex-row gap-[40px] bg-[#ffffff] ">
                <div className=" w-full">
                  <select
                    name="eyecolor"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.eyecolor}
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
                  >
                    <option value={""}>*Select hair size</option>
                    <option>Bald</option>
                    <option>Short</option>
                    <option>Long</option>
                    <option>Medium</option>
                  </select>
                  {errors.hairsize && touched.hairsize && (
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
                  >
                    <option value={""}>*Select hair type</option>
                    <option>Straight</option>
                    <option>Wavy</option>
                    <option>Curly</option>
                    <option>Coily</option>
                    <option>Other</option>
                  </select>
                  {errors.hairtype && touched.hairtype && (
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    placeholder="Height in Cm (160cm)"
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
                  />
                  {errors.height && touched.height && (
                    <div className="text-[red] text-[14px] px-[10px] ">{errors.height}</div>
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
                    className="w-full h-[50px] px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  text-[#7e7c7b] shadow-lg"
                  />
                  {errors.weight && touched.weight && (
                    <div className="text-[red] text-[14px] px-[10px] ">{errors.weight}</div>
                  )}
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
                  className="w-full px-[20px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]  h-[150px] text-[#7e7c7b] shadow-lg"
                />
                {errors.aboutyourself && touched.aboutyourself && (
                  <div className="text-[red] text-[14px] px-[10px] ">
                    {errors.aboutyourself}
                  </div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white  text-[20px] w-full h-[50px] font-[sans-serif] bg-[black] flex justify-center items-center rounded-[0.4rem]  cursor-pointer hover:bg-black/50 duration-300"
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

export default ModelApperance;
