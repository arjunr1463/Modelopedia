import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { Formik, Field } from "formik";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function EditClientCastingCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log(location);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [imageName, setImageName] = useState("Choose files to upload");
  const validationSchema = yup.object().shape({
    title: yup.string().required("The title field is required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File size is large (*max of 1MB)", (value) => {
        return value && value.size <= 1024 * 1024;
      }),
    discription: yup.string().required("The description field is required"),
  });
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],

    clipboard: {
      matchVisual: false,
    },
  };
  const [success, setSuccess] = React.useState(false);
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        let width = 650;
        let height = 350;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        console.log(canvas.width);
        console.log(canvas.height);

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, file.type, 1);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <Formik
      initialValues={{
        title: location.state.title,
        image: null,
        discription: location.state.discription,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const resizedImage = await resizeImage(values.image);
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("image", resizedImage);
          formData.append("discription", values.discription);
          const token = localStorage.getItem("token");
          await axios

            .put(
              `${process.env.REACT_APP_API_URL}/api/client/register/createcasting/update/${id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 3000);
              setFileInputKey(Date.now());
              resetForm({});
              setImageName("Choose files to upload");
              setSubmitting(false);
              navigate("/Admin/Client/ViewCastingCalls");
            });
        } catch (error) {
          console.log(error);
          setSubmitting(false);
        }
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
        <form onSubmit={handleSubmit} className="border-[1px]">
          <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
            <h>Post Casting Calls</h>
          </div>
          <div className="flex flex-col gap-[20px] py-0 md:py-[10px] px-[20px]">
            <div>
              <input
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                type="text"
                placeholder="Enter Title"
                className="border-[1px] outline-none w-full h-[40px] px-[10px] rounded-[0.3rem] shadow-md font-thin"
              />
              {errors.title && touched.title && (
                <div className="text-[red] px-[10px] text-[12px]">
                  {errors.title}
                </div>
              )}
            </div>
            <Field
              name="image"
              render={({ field }) => (
                <div className="flex flex-col gap-[10px]">
                  <input
                    onBlur={handleBlur}
                    key={fileInputKey}
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
                    <span className="border-[1px] text-[#99919c] rounded-l-[0.2rem] outline-none shadow-md w-[250px] flex items-center px-[10px] text-[14px]">
                      {imageName}
                    </span>
                    <label
                      htmlFor="image"
                      className="bg-[black] rounded-r-[0.2rem] cursor-pointer text-white font-semibold w-[120px] h-[45px] flex justify-center items-center"
                    >
                      Choose File
                    </label>
                  </div>
                  {errors.image && touched.image ? (
                    <div className="text-[red] text-[12px] px-[10px] ">
                      {errors.image}
                    </div>
                  ) : null}
                  {field.value && (
                    <>
                      <img
                        src={URL.createObjectURL(field.value)}
                        alt="Upload Preview"
                        className=" h-[130px] w-[200px]"
                      />
                    </>
                  )}
                </div>
              )}
            />
            <div className="flex flex-col gap-[10px] lg:h-[350px]">
              <div className="flex justify-between w-full">
                <h className="font-[sans-serif] tracking-wider">
                  Write discription
                </h>
              </div>
              <div className="h-[350px]  shadow-md">
                <ReactQuill
                  name="discription"
                  value={values.discription}
                  onChange={(value) => {
                    setFieldValue("discription", value);
                  }}
                  className="h-[350px] overflow-y-scroll scroll"
                  modules={modules}
                />
                {errors.discription && touched.discription ? (
                  <div className="text-[red] text-[12px] px-[10px] ">
                    {errors.discription}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-full flex-flex-col  justify-center pb-[40px] pt-[10px] md:pt-[30px] px-[20px]">
            <button
              type="submit"
              className="font-semibold bg-[black]   text-[white] w-full  rounded-[0.2rem] h-[40px]"
            >
              Submit
            </button>
            {success && !errors.success && (
              <div className="text-[red] flex justify-center font-fair tracking-wider px-[10px] ">
                Updated Successfully
              </div>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
}

export default EditClientCastingCall;
