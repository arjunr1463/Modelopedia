import React, { useState } from "react";
import "./DashBoard.css";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";

function AddVideo() {
  const [error, setError] = useState([]);
  const validationSchema = yup.object().shape({
    url: yup
      .string()
      .required("Video field is required")
      .matches(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=\w{11}(?:&\S*)?/,
        "Invalid YouTube URL"
      ),
    success: yup.boolean().oneOf([true], "Upload Failed"),
  });
  const [success, setSuccess] = React.useState(false);
  return (
    <div className=" py-[100px] px-[10px] sm:px-[50px] border-[1px]">
      {" "}
      <Formik
        initialValues={{ url: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          try {
            const token = localStorage.getItem("token");
            await axios.post(
              `${process.env.REACT_APP_API_URL}/api/user/register/AddVideo`,
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
            resetForm({});
            setSubmitting(false);
          } catch (error) {
            setError(error.response.data.message);
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, touched, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit} className=" flex flex-col gap-[20px]">
            <div className="flex flex-col lg:items-center sm:flex-row gap-[10px]">
              <label htmlFor="video" className="font-semibold">
                Select video
              </label>
              <input
                onChange={handleChange}
                name="url"
                value={values.url}
                type="text"
                id="video"
                placeholder="youtube video url"
                className="outline-none border-[1px] h-[50px] lg:w-[400px] px-[20px] rounded-[0.3rem] shadow-md"
              />
            </div>
            <div className="flex flex-col gap-[15px] md:gap-0 md:flex-row items-center">
              <button
                type="submit"
                className="bg-[black] w-[150px] font-semibold text-[20px] rounded-[0.2rem] text-white flex items-center justify-center h-[40px]"
              >
                Submit
              </button>
              {errors.url && touched.url && (
                <div className="text-[red] font-fair tracking-wider px-[10px] ">
                  {errors.url}
                </div>
              )}
              <div className="text-[red] text-[12px] px-[10px] ">{error}</div>
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
  );
}

export default AddVideo;
