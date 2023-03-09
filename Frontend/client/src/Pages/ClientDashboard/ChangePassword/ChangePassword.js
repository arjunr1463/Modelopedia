import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate=useNavigate()
  const validationSchema = Yup.object({
    oldpassword: Yup.string().required("Old password is required"),
    newpassword: Yup
    .string()
    .min(8, "Password must be atleast 8 characters")
    .required("The password field is required"),
    newconfirmpassword: Yup
    .string()
    .oneOf([Yup.ref("newpassword"), null], "passwords does not match")
    .required("The confirm password field is required"),
  });

  return (
    <div className="border-[1px]">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>Change Password</h>
      </div>
      <Formik
        initialValues={{
          oldpassword: "",
          newpassword: "",
          newconfirmpassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const token = localStorage.getItem("token");
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/api/client/register/ChangePassword/changed`,
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log("Login response:", res);
              navigate("/ClientLogin")
              localStorage.setItem("token", res.data.token);
              setSubmitting(false);
            })

            .catch((err) => {
              console.error("Login error:", err.response.data);
              let errors = {};
              if (
                err.response.data.error === "old password is incorrect"
              ) {
                errors.oldpassword = "Old password is incorrect";
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
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col py-[50px] px-[20px] gap-[30px]"
          >
            <div className=" flex flex-col gap-[5px]">
              <label htmlFor="old" className="font-fair ">
                Old Password
              </label>
              <input
                name="oldpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.oldpassword}
                id="old"
                type="text"
                placeholder="Old Password"
                className="outline-none border-[1px] inp h-[35px] px-[10px]"
              />
              {errors.oldpassword && touched.oldpassword && (
                <div className="text-[red] px-[10px] ">
                  {errors.oldpassword}
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row gap-[30px]">
              <div className="flex flex-col gap-[5px] w-full">
                <label htmlFor="old" className="font-fair ">
                  New Password
                </label>
                <input
                  id="old"
                  type="text"
                  name="newpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newpassword}
                  placeholder="New Password"
                  className="outline-none border-[1px] inp h-[35px] px-[10px]"
                />
                {errors.newpassword && touched.newpassword && (
                  <div className="text-[red] px-[10px] ">
                    {errors.newpassword}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-[5px] w-full">
                <label htmlFor="old" className="font-fair ">
                  Confirm Password
                </label>
                <input
                  name="newconfirmpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newconfirmpassword}
                  id="old"
                  type="text"
                  placeholder="Confirm Password"
                  className="outline-none border-[1px] inp h-[35px] px-[10px]"
                />
                {errors.newconfirmpassword && touched.newconfirmpassword && (
                  <div className="text-[red] px-[10px] ">
                    {errors.newconfirmpassword}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex bg-black items-center font-semibold justify-center rounded-[0.2rem] h-[40px] w-[120px] text-white"
            >
              Save Change
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword
