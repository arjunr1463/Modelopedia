import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Bg from "../../Assets/Login/Bg.jpg";
import Logo from "../../Assets/Main/logo.png";

function LoginForm() {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const allowedEmails = [
    "modelopedia@gmail.com",
    "arjunr1463@gmail.com",
    "user@gmail.com",
  ];
  const allowedPassword = [
    "Admin@123",
    "Arjun@123",
    "user@123",
  ];

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      if (
        !allowedEmails.includes(values.email) ||
        !allowedPassword.includes(values.password)
      ) {
        throw new Error("Invalid email address");
      } else {
        navigate("/admin/home/Dashboard");
      }
    } catch (error) {
      setLoginError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <img
        src={Bg}
        alt=""
        className="relative h-[100vh]  object-bottom w-[100vw] object-cover blur-[2px]"
      />
      <div className="flex justify-center w-full ">
        <div className="w-full bg-[white] rounded-[0.2rem]  absolute  top-40 pb-[40px] pt-[20px] flex flex-col gap-[20px] items-center max-w-md">
          <div className="items-center flex flex-col">
            <img src={Logo} alt="" className="object-cover h-[40px]" />
            <h1 className="text-3xl font-semibold font-fair text-center">
              LOGIN
            </h1>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Email required")
                .oneOf(allowedEmails, "Invalid email address"),
              password: Yup.string()
                .required("Password required")
                .oneOf(allowedPassword, "Invalid Password "),
            })}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full px-[40px] gap-[10px]">
                <div className="">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full border-[1px] border-gray-300 px-4 py-2 rounded-[0.2rem] focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500  font-fair text-[12px]"
                  />
                </div>
                <div className="">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="w-full border-[1px] border-gray-300 px-4 py-2 rounded-[0.2rem] focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500  font-fair text-[12px]"
                  />
                </div>
                {loginError && (
                  <div className="text-red-500  font-fair text-[12px]">
                    Incorrect email or password.
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 font-semibold font-fair text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;