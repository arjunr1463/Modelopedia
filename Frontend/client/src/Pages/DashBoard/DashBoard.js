import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";

function DashBoard({ onComplete }) {
  const [imageName, setImageName] = useState("Choose files to upload");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/register/progress/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    images: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File size should be below *1mb", (value) => {
        return value && value.size <= 1024 * 1024;
      }),
    success: yup.boolean().oneOf([true], "Upload Failed"),
  });
  const [success, setSuccess] = React.useState(false);
  return (
    <div className="border-[1px] ">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>DashBoard</h>
      </div>
      <div className="flex flex-col gap-[30px] pt-[100px] pb-[20px] px-[30px]">
        <div>
          <h className="text-[30px] font-semibold font-[sans-serif]">
            Step 4-Add Portfolio
          </h>
        </div>
        <Formik
          initialValues={{ images: null, videoUrl: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              const token = localStorage.getItem("token");
              const formData = new FormData();
              formData.append("images", values.images);
              formData.append("videoUrl", values.videoUrl);
              const response = await axios
                .post(
                  `${process.env.REACT_APP_API_URL}/api/user/register/stage4`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then(() => navigate("/Admin/Model/Payment"));
              setSuccess(true);
              setImageName("Choose files to upload");
              console.log(response);
              actions.setSubmitting(false);
            } catch (error) {
              console.log(error);
              actions.setSubmitting(false);
            }
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            setFieldValue,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className=" flex flex-col gap-[20px]">
              <div className="flex flex-col sm:flex-row gap-[10px]">
                <label className="font-semibold">*Select images</label>
                <Field
                  name="images"
                  render={({ field }) => (
                    <div className="flex flex-col gap-[10px]">
                    <input
                      onBlur={handleBlur}
                      id="image"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setFieldValue(field.name, e.currentTarget.files[0]);
                        setImageName(e.target.files[0].name);
                      }}
                    />
                    <div className="flex ">
                      <span className="border-[1px] text-[#99919c] rounded-l-[0.2rem] text-[12px] outline-none shadow-md w-[250px] flex items-center px-[10px] sm:text-[14px]">
                        {imageName}
                      </span>
                      <label
                        htmlFor="image"
                        className="bg-[black] rounded-r-[0.2rem] cursor-pointer text-center text-[12px] sm:text-[14px] text-white font-semibold w-[120px] h-[45px] flex justify-center items-center"
                      >
                        Choose File
                      </label>
                    </div>
                    {errors.images && touched.images ? (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.images}
                      </div>
                    ) : null}
                    {field.value && (
                      <>
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="Upload Preview"
                          className="object-cover h-[420px]"
                        />
                        <span className="text-[red] text-[10px]">800*1200</span>
                      </>
                    )}
                  </div>
                  )}
                />
              </div>
              <div className="flex flex-col lg:items-center sm:flex-row gap-[10px]">
                <label htmlFor="video" className="font-semibold">
                  Select video
                </label>
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="videoUrl"
                  value={values.videoUrl}
                  type="text"
                  id="video"
                  placeholder="youtube video url"
                  className="outline-none border-[1px] h-[50px] lg:w-[385px] px-[20px] font-normal text-[#99919c] rounded-[0.3rem] shadow-md"
                />
              </div>
              <div className="flex flex-col gap-[15px] md:gap-0 md:flex-row items-center">
                <button
                  onClick={onComplete}
                  type="submit"
                  className="bg-[black] w-[150px] font-semibold text-[20px] rounded-[0.2rem] text-white flex items-center justify-center h-[40px]"
                >
                  Submit
                </button>
                {success && !errors.success && (
                  <div className="text-[red] font-fair tracking-wider px-[10px] ">
                    Upload Successful!!!
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default DashBoard;
