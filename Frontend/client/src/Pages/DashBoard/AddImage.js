import React, { useState } from "react";
import "./DashBoard.css";
import axios from "axios";
import * as yup from "yup";
import { Formik, Field } from "formik";

function AddImage() {
  const [imageName, setImageName] = useState("Choose files to upload");
  const[error,setError]=useState([])
  const validationSchema = yup.object().shape({
    images: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File size is large (*max of 1MB)", (value) => {
        return value && value.size <= 1024 * 1024;
      }),
    success: yup.boolean().oneOf([true], "Upload Failed"),
  });
  const [success, setSuccess] = React.useState(false);
  return (
    <div className=" py-[100px] px-[20px] border-[1px]">
      <Formik
        initialValues={{ images: null }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const token = localStorage.getItem("token");
            //const resizedImage = await resizeImage(values.images);
            const formData = new FormData();
            formData.append("images", values.images);
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/user/register/AddImage`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            resetForm({});
            setImageName("Choose files to upload");
            console.log(response.data);
            setSubmitting(false);
          } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message)
            setSubmitting(false);
          }
        }}
      >
        {({ handleBlur, handleSubmit, setFieldValue, errors, touched }) => (
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
                      <span className="border-[1px] text-[#99919c] text-center rounded-l-[0.2rem] outline-none shadow-md w-[250px] flex items-center px-[10px] text-[12px] sm:text-[14px]">
                        {imageName}
                      </span>
                      <label
                        htmlFor="image"
                        className="bg-[black] rounded-r-[0.2rem] cursor-pointer text-white text-center font-semibold text-[12px] sm:text-[14px] w-[120px] h-[45px] flex justify-center items-center"
                      >
                        Choose File
                      </label>
                    </div>
                    {errors.images && touched.images ? (
                      <div className="text-[red] text-[12px] px-[10px] ">
                        {errors.images}
                      </div>
                    ) : null}
                    <div className="text-[red] text-[12px] px-[10px] ">{error}</div>
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
            <div className="flex flex-col gap-[15px] md:gap-0 md:flex-row items-center">
              <button
                type="submit"
                className="bg-[black] w-[120px] font-semibold text-[20px] rounded-[0.2rem] text-white flex items-center justify-center h-[35px]"
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
  );
}

export default AddImage;
