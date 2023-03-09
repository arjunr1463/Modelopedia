import React, { useEffect, useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ModelProfile() {
  const [dataicons, setDataIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [apply, setApply] = useState([]);
  const [error, setError] = useState(null);
  const [age, setAge] = useState(null);
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [heightFeet, setHeightFeet] = useState(null);
  const [heightInches, setHeightInches] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/${id}`
        );
        setLoading(false);
        setData(response.data);
        setImage(response.data.images);
        const dob = new Date(response.data.dob);
        const today = new Date();
        let calculatedAge = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          calculatedAge--;
        }
        setAge(calculatedAge);
        const heightCm = response.data.height;
        const heightIn = heightCm / 2.54;
        const feet = Math.floor(heightIn / 12);
        const inches = Math.floor(heightIn % 12);
        setHeightFeet(feet);
        setHeightInches(inches);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchModel();
  }, [id]);

  const images = image.filter((user) =>
    user ? (user.imagestatus === "Approved" ? user.image : "") : ""
  );

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
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
        })
        .catch((error) => {
          if (error.response.data.message === "Model already enquired") {
            console.log(error.response.data);
            setError("Model already enquired");
            setTimeout(() => {
              setError("");
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register/stage1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDataIcons(response.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        } else {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [id]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "1rem",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "1rem",
        }}
        onClick={onClick}
      />
    );
  }
  const arrow = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start bg-[#f8f9fa] gap-[40px] lg:h-full py-[60px] lg:py-[150px] lg:px-[20px] ">
      {/*left */}
      {loading ? (
        <div className="text-[red] font-fair flex justify-center">
          Loading please wait...
        </div>
      ) : (
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-center ">
            <Slider
              {...settings}
              {...arrow}
              className=" w-[80vw] sm:w-[60vw] md:w-[65vw] lg:w-[30vw] h-full"
            >
              {images.map((img) => (
                <div className="hover:scale-105 duration-300">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    src={`data:image/*;base64,${btoa(
                      new Uint8Array(img.image.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt=""
                    className=" object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex justify-center items-center"
          >
            <h className="font-[sans-serif] font-fair text-[20px] capitalize">
              {data.city},{data.state}
            </h>
          </motion.div>

          <div className="flex items-center justify-center gap-[20px]">
            <TwitterIcon className="bg-[#1d9bf0] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />
            {dataicons.mobile ? (
              <a
                href={`https://api.whatsapp.com/send?phone=${dataicons.mobile}`}
              >
                <WhatsAppIcon className="bg-[#12af0a] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />
              </a>
            ) : (
              <Link to="/ModelLogin">
                <WhatsAppIcon className="bg-[#12af0a] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />
              </Link>
            )}

            <LinkedInIcon className="bg-[#007bb5] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />

            {dataicons.email ? (
              <a href={`mailto:${dataicons.email}`}><EmailOutlinedIcon className="bg-[#dd5347] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" /></a>
            ) : (
              <Link to="/ModelLogin">
                <EmailOutlinedIcon className="bg-[#dd5347] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />
              </Link>
            )}

            {dataicons.facebook ? (
              <a href={dataicons.facebook}>
                <FacebookIcon className="bg-[#1877f2] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />
              </a>
            ) : (
              <Link to="/ModelLogin">
                <FacebookIcon className="bg-[#1877f2] text-white rounded-[0.2rem] cursor-pointer hover:scale-105" />
              </Link>
            )}
          </div>
        </div>
      )}
      {/*Right */}
      <div className="flex flex-col w-[90vw] sm:w-[450px] md:w-[600px] lg:w-[600px] rounded-[0.4rem] border-[1px] shadow-lg md:shadow-md">
        <div className="px-[10px] break-normal text-center flex  items-center border-b-[1px] h-[80px] bg-[#f7f7f7]">
          <h className=" font-semibold text-[20px] sm:text-[21px] w-full md:tracking-wide uppercase ">
            {data.fullName} (MODEL-{data.id})
          </h>
        </div>
        <div className="px-[30px] flex flex-col bg-[white] text-[15px]">
          <div className="flex justify-between border-b-[1px]  py-4">
            <span className="text-[#7e7c7b] font-fair">AGE</span>
            <span className="text-[#7e7c7b] font-fair">{age} YEARS</span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">HIEGHT</span>
            <span className="text-[#7e7c7b] font-fair">
              {heightFeet}'{heightInches} FEET
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">WEIGHT</span>
            <span className="text-[#7e7c7b] font-fair">{data.weight} KG</span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">SKIN TONE</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.skintone}
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">HAIR COLOR</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.haircolor}
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">HAIR SIZE</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.hairsize}
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">HAIR TYPE</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.hairtype}
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">EYE COLOR</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.eyecolor}
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">BODY TYPE</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.bodytype}
            </span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">SHOE SIZE</span>
            <span className="text-[#7e7c7b] font-fair">{data.shoesize}</span>
          </div>
          <div className="flex justify-between border-b-[1px] py-4">
            <span className="text-[#7e7c7b] font-fair">DRESS SIZE</span>
            <span className="text-[#7e7c7b] font-fair uppercase">
              {data.dresssize}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] h-full bg-[white]">
          <div className="px-[20px] flex flex-col break-normal gap-[20px]  py-4">
            <h className="text-[#7e7c7b]  font-semibold text-[20px]">
              ABOUT MODEL
            </h>
            <p className="text-[16px] text-[#7c8a99] tracking-wide font-fair">
              {data.aboutyourself}
            </p>
          </div>
          <div className="flex flex-col gap-[10px] items-center mb-3">
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="text-white font-fair font-semibold text-[20px] bg-[black] flex justify-center items-center w-[150px] h-[50px] rounded-[0.3rem]"
            >
              Enquiry
            </motion.button>
            {error && (
              <div className="flex justify-center text-[red]">{error}</div>
            )}
            {successMessage && (
              <div className="flex justify-center text-[red]">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelProfile;
