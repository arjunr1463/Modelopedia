import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";

function ViewModel() {
  const [action, setAction] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [language, setLanguage] = useState([]);
  const [remainingDays, setRemainingDays] = useState(null);
  const [planstatus, setPlanstatus] = useState([]);
  const { id } = useParams();

  const handleClick = () => {
    setAction(!action);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/user/register/${id}`).then((res) => {
        setData(res.data);
        setDate(res.data.dob.slice(0, 10));
        setLanguage(res.data.language.join(" "));
        const remainingTime = new Date(res.data.planEndDate) - new Date();
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
        setRemainingDays(Math.max(0, remainingDays));
        if (remainingDays <= 0) {
          return setPlanstatus("Expired");
        } else {
          return setPlanstatus("Not expired");
        }
      });
    };
    fetchData();
  }, [id]);

  return (
    <div className="">
      <div className="bg-[white] rounded-[0.4rem] shadow-lg flex flex-col gap-[100px] px-[20px] py-[20px] ">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[5px]">
            <div className="flex gap-[15px]">
              <h className="font-semibold sticky left-0  text-[15px]">
                {data.fullName}
              </h>
              <Link
                state={{
                  email: data.email,
                  phone: data.mobile,
                  address: data.address,
                  dob: date,
                  gender: data.gender,
                  city: data.city,
                  state: data.state,
                  language:language,
                  pincode: data.postcode,
                  eyecolor: data.eyecolor,
                  haircolor: data.haircolor,
                  hairsize: data.hairsize,
                  hairtype: data.hairtype,
                  shoesize: data.shoesize,
                  dresssize: data.dresssize,
                  bodytype: data.bodytype,
                  skintone: data.skintone,
                  height: data.height,
                  weight: data.weight,
                  instagram: data.instagram,
                  facebook: data.facebook,
                  experience: data.experience,
                  password: data.password,
                  confirmpassword: data.confirmpassword,
                  aboutyourself: data.aboutyourself,
                }}
                onClick={handleClick}
                className="text-[16px] bg-[#4099ff] text-white w-[30px] h-[25px] rounded-sm flex justify-center items-center"
              >
                <FiEdit />
              </Link>
            </div>
            <div className="border-b-[2px] w-[150px] sticky left-0"></div>
          </div>

          {action ? (
            <UpdateUser />
          ) : (
            <div className="flex flex-col md:flex-row gap-[15px] md:gap-[30px]">
              <div className="text-[14px] flex flex-col gap-[15px]">
                <div className="flex gap-[5px]">
                  <span className="font-bold">Email:</span>
                  <span className="font-fair">{data.email}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Phone:</span>
                  <span className="font-fair">{data.mobile}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Address:</span>
                  <span className="font-fair max-w-[400px]">
                    {data.address}
                  </span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">City:</span>
                  <span className="font-fair">{data.city}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">State:</span>
                  <span className="font-fair">{data.state}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Zipcode:</span>
                  <span className="font-fair">{data.postcode}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">DOB:</span>
                  <span className="font-fair">{date}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Gender:</span>
                  <span className="font-fair">{data.gender}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Language:</span>
                  <span className="font-fair">{language}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Instagram id:</span>
                  <span className="font-fair">{data.instagram}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Facebook id:</span>
                  <span className="font-fair">{data.facebook}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Experience:</span>
                  <span className="font-fair">{data.experience}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Payment Plan:</span>
                  <span className="font-fair">{data.paymentType}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Plan status:</span>
                  <span className="font-fair">{planstatus}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Personal status:</span>
                  <span className="font-fair">{data.personalStatus}</span>
                </div>
                <div className="flex gap-[5px]">
                  <span className="font-bold">Remaining days:</span>
                  <span className="font-fair">{remainingDays}</span>
                </div>
              </div>

              {/*Right */}
              <div>
                <div className="text-[14px] flex flex-col gap-[15px]">
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Eye color:</span>
                    <span className="font-fair">{data.eyecolor}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Hair color:</span>
                    <span className="font-fair">{data.haircolor}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Hair type:</span>
                    <span className="font-fair">{data.hairtype}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Shoe size:</span>
                    <span className="font-fair">{data.shoesize}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Skin color:</span>
                    <span className="font-fair">{data.skintone}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Dress size:</span>
                    <span className="font-fair">{data.dresssize}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Hair size:</span>
                    <span className="font-fair">{data.hairsize}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Body type:</span>
                    <span className="font-fair">{data.bodytype}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Height:</span>
                    <span className="font-fair">{data.height}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Weight:</span>
                    <span className="font-fair">{data.weight}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Description:</span>
                    <span className="font-fair">{data.aboutyourself}</span>
                  </div>
                  <div className="flex gap-[5px]">
                    <span className="font-bold">Password:</span>
                    <span className="font-fair">{data.confirmpassword}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/**Image */}
        <div>
          <AddImage />
        </div>
        <div>
          <AddVideo />
        </div>
      </div>
    </div>
  );
}

export default ViewModel;
