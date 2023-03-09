import React, { useContext } from "react";
import model from "../../Assets/Model/modelgigi.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import Banner from "../../Components/Banner/ModelBasic"
import Scroll from "../../Components/ScrollToTop"
import "../full.css"
import { successContext } from "../../context/success";

function ModelBasic(props) {
  const navigate = useNavigate();
  const {setSuccess}=useContext(successContext)

  //validation

  const validationSchema = yup.object().shape({
    dob: yup.string().required("The dob field is required"),
    address: yup.string().required("The address field is required"),
    city: yup.string().required("The city field is required"),
    postcode: yup.string().required("The post/Zipcode field is required"),
    state: yup.string().required("The state field is required"),
    password: yup
      .string()
      .min(8, "Password must be atleast 8 characters")
      .required("The password field is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords does not match")
      .required("The confirm password field is required"),
    gender: yup.string().required("The gender field is required"),
    language: yup.string().required("The language field is required"),
    experience: yup.string().required("The experience field is required"),
    privacy: yup.string().required("*The privacy field is required"),
  });

  return (
    <>
      {" "}
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
            <h className="text-[25px] sm:text-[35px] font-medium">
              Step 3-Basic Details
            </h>
          </div>
          <Formik
            initialValues={{
              dob: "",
              address: "",
              city: "",
              postcode: "",
              state: "",
              password: "",
              confirmpassword: "",
              gender: "",
              language: "",
              instagram: "",
              facebook: "",
              experience: "",
              privacy: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              const userData = { ...props.userData, ...values };
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/api/user/register/stage1`,
                  userData
                );
                console.log(response);
                actions.setSubmitting(false);
              } catch (error) {
                console.log(error);
                actions.setSubmitting(false);
              }
              navigate("/ModelLogin")
              setSuccess("You have completed registered Successfully")
              setTimeout(()=>{
                setSuccess("")
              },3000)
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
              values,
              errors,
              touched,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 lg:gap-10"
              >
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-row">
                    <label
                      htmlFor="dob"
                      className=" text-[14px] md:text-[20px]  flex items-center px-[30px] w-[300px]"
                    >
                      Date Of Birth:{" "}
                    </label>
                    <input
                      name="dob"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dob}
                      type="date"
                      id="dob"
                      className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem]   input shadow-lg"
                    />
                  </div>
                  {errors.dob && touched.dob && (
                    <div className="text-[red] text-[14px] px-[30px] ">{errors.dob}</div>
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
                    className="w-full h-[120px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: input shadow-lg"
                  />
                  {errors.address && touched.address && (
                    <div className="text-[red] text-[14px] px-[10px] ">
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
                    className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: tracking-wider input shadow-lg"
                  />
                  {errors.city && touched.city && (
                    <div className="text-[red] text-[14px] px-[10px] ">{errors.city}</div>
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
                    className="w-full h-[50px] px-[30px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: tracking-wider input shadow-lg"
                  />
                  {errors.postcode && touched.postcode && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.postcode}
                    </div>
                  )}
                </div>
                <div>
                  <select
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    className="flex  w-full h-[50px] pl-[30px] pr-[5px] outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: text-[#7e7c7b] shadow-lg"
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
                    <div className="text-[red] text-[14px] px-[10px] ">{errors.state}</div>
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
                    className="w-full h-[50px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: input shadow-lg"
                  />
                  {errors.password && touched.password && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.password}
                    </div>
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
                    className="w-full h-[50px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: input shadow-lg"
                  />
                  {errors.confirmpassword && touched.confirmpassword && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.confirmpassword}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col sm:flex-row  sm:gap-[50px]  px-[30px] ">
                    <span className="">Gender:</span>
                    <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 ">
                      <div className="flex gap-2 justify-start items-center">
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
                        />
                        <label htmlFor="male" className="text-[16px]">
                          Male
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
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
                          className=""
                        />
                        <label htmlFor="female" className="text-[16px]">
                          Female
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="gender"
                          onChange={(e) => {
                            handleChange(e);
                            console.log(values.gender);
                          }}
                          onBlur={handleBlur}
                          value="Kid"
                          type="radio"
                          id="kid"
                          className=""
                        />
                        <label htmlFor="kid" className="text-[16px]">
                          Kid
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="gender"
                          onChange={(e) => {
                            handleChange(e);
                            console.log(values.gender);
                          }}
                          onBlur={handleBlur}
                          value="Transgender"
                          type="radio"
                          id="transgender"
                          className=""
                        />
                        <label htmlFor="transgender" className="text-[16px]">
                          Transgender
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.gender && touched.gender && (
                    <div className="text-[red] text-[14px] px-[30px] ">{errors.gender}</div>
                  )}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col sm:flex-row  sm:gap-[30px]  px-[30px] ">
                    <span className="">Language:</span>
                    <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 ">
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          type="checkbox"
                          id="english"
                          className=""
                          onChange={(e) => {
                            handleChange(e);
                            console.log(values.language);
                          }}
                          onBlur={handleBlur}
                          value="English"
                        />
                        <label htmlFor="english" className="text-[16px]">
                          English
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Hindi"
                          type="checkbox"
                          id="hindi"
                          className=""
                        />
                        <label htmlFor="hindi" className="text-[16px]">
                          Hindi
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Malayalam"
                          type="checkbox"
                          id="malayalam"
                          className=""
                        />
                        <label htmlFor="malayalam" className="text-[16px]">
                          Malayalam
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Tamil"
                          type="checkbox"
                          id="tamil"
                          className=""
                        />
                        <label htmlFor="tamil" className="text-[16px]">
                          Tamil
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Telugu"
                          type="checkbox"
                          id="telugu"
                          className=""
                        />
                        <label htmlFor="telugu" className="text-[16px]">
                          Telugu
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Kannada"
                          type="checkbox"
                          id="kannada"
                          className=""
                        />
                        <label htmlFor="kannada" className="text-[16px]">
                          Kannada
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Bengali"
                          type="checkbox"
                          id="bengali"
                          className=""
                        />
                        <label htmlFor="bengali" className="text-[16px]">
                          Bengali
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Marathi"
                          type="checkbox"
                          id="marathi"
                          className=""
                        />
                        <label htmlFor="marathi" className="text-[16px]">
                          Marathi
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Gujarati"
                          type="checkbox"
                          id="gujarati"
                          className=""
                        />
                        <label htmlFor="gujarati" className="text-[16px]">
                          Gujarati
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Urdu"
                          type="checkbox"
                          id="urdu"
                          className=""
                        />
                        <label htmlFor="urdu" className="text-[16px]">
                          Urdu
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Odia"
                          type="checkbox"
                          id="odia"
                          className=""
                        />
                        <label htmlFor="odia" className="text-[16px]">
                          Odia
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Punjabi"
                          type="checkbox"
                          id="punjabi"
                          className=""
                        />
                        <label htmlFor="punjabi" className="text-[16px]">
                          Punjabi
                        </label>
                      </div>
                      <div className="flex gap-2 justify-start items-center">
                        <input
                          name="language"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value="Assamese"
                          type="checkbox"
                          id="assamese"
                          className=""
                        />
                        <label htmlFor="assamese" className="text-[16px]">
                          Assamese
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.language && touched.language && (
                    <div className="text-[red] text-[14px] px-[30px] ">
                      {errors.language}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex px-[20px]">
                    <span className="">Instagram Id</span>
                  </div>
                  <div>
                    <input
                      name="instagram"
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.instagram);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="https://www.instagram.com/your-name/"
                      className="w-full h-[50px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: input shadow-lg"
                    />
                    <span className="text-[12px] text-black/50 px-[20px]">
                      Profile id is not mandatory
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex px-[20px]">
                    <span className="">Facebook Id</span>
                  </div>
                  <div>
                    <input
                      name="facebook"
                      onChange={(e) => {
                        handleChange(e);
                        console.log(values.facebook);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="https://www.facebook.com/your-name"
                      className="w-full h-[50px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: input shadow-lg"
                    />
                    <span className="text-[12px] text-black/50 px-[20px]">
                      Profile id is not mandatory
                    </span>
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
                    className="w-full h-[50px] px-[30px] break-all outline-none border-[1px] border-[#d6dbe0] rounded-[0.4rem] sm: input shadow-lg"
                  />
                  {errors.experience && touched.experience && (
                    <div className="text-[red] text-[14px] px-[10px] ">
                      {errors.experience}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center  gap-[10px]">
                  <div className="flex flex-col items-center lg:flex-row gap-5 lg:gap-2 md:px-[20px]">
                    <span className="">Show Privacy Policy</span>
                    <div className=" flex justify-center items-center gap-[5px]">
                      <input
                        name="privacy"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.privacy}
                        type="checkbox"
                        id="check"
                        className="h-[15px] w-[15px]"
                      />
                      <label
                        htmlFor="check"
                        className="text-[red]  text-[15px] lg:"
                      >
                        *accept terms and condition
                      </label>
                    </div>
                  </div>
                  {errors.privacy && touched.privacy && (
                    <div className="text-[red] text-[14px] px-[20px] ">
                      {errors.privacy}
                    </div>
                  )}
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="text-white font-semibold text-[20px]  bg-[black] flex justify-center items-center rounded-[0.4rem] h-[50px] cursor-pointer hover:bg-black/50 duration-300 w-full"
                  >
                    Submit
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

export default ModelBasic;
