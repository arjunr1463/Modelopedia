import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
function Card({ name, state, date, image, id }) {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const[error,setError]=useState(null)
  const [apply, setApply] = useState([]);
  const [age, setAge] = useState(null);
  useEffect(() => {
    const dob = new Date(date);
    const today = new Date();
    let calculatedAge = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  }, [date]);

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    setError(null)
    try {
     axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/client/register/modelenquiry/${id}`,
          apply,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setApply(res.data);
          setSuccessMessage("Enquired Successfully!!!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
          console.log(res.data);
        }).catch((error) => {
          if (error.response.data.message === 'Model already enquired') {
            console.log(error.response.data)
            setError("Model already enquired");
            setTimeout(() => {
              setError("")
            }, 3000);
          } 
        });

      if (!token) {
        navigate("/ClientLogin");
      }
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <div className="">
      {image ? (
        <div className="flex flex-col items-center bg-white border-[1px] pb-[20px] rounded-[0.4rem] shadow-md">
          <div>
            <Link to={`/ViewModel/${id}`}>
              <img
                src={`data:image/*;base64,${btoa(
                  new Uint8Array(image.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt=""
                className="h-[420px] object-cover"
              />
            </Link>
          </div>
          <div className="h-[60px]  w-[200px] flex justify-center items-center text-center">
            <h className="text-[17px] font-semibold uppercase">{name}</h>
          </div>
          <div className=" gap-[10px] flex flex-col items-center">
            <div className="flex flex-col items-center w-[200px] break-all">
              <span className="text-[16px] font-fair tracking-wide">
                State: {state}
              </span>
              <span className="text-[16px] font-fair tracking-wide">
                Age: {age}
              </span>
            </div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className=" "
            >
              <button
                onClick={handleSubmit}
                className="text-white font-semibold bg-black flex justify-center items-center w-[180px] h-[40px] rounded-[0.4rem]"
              >
                Enquiry
              </button>
              {error && <div className="flex justify-center text-[10px] text-[red]">{error}</div>}
              {successMessage && (
                <div className="flex justify-center text-[10px] text-[red]">
                  {successMessage}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
