import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import axios from "axios";
import "./Featured.css";

function FeaturedModelCard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register`
        );
        const filteredData = response.data.filter(
          (user) =>
            user.specialstory &&
            user.specialstory.featuredimages &&
            user.specialstory.status === "Approved"
        );
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        setData(filteredData[randomIndex]);
        setImages(filteredData[randomIndex].specialstory.featuredimages.data);
        setDescription(
          filteredData[randomIndex].specialstory.specialdescription
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({
        x: -50,
      });
    }
  }, [inView, animation]);
  return (
    <>
      {loading ? (
        <div className="text-[red] font-fair flex justify-center">
          Loading please wait...
        </div>
      ) : (
        <div className="bg-[#f8f9fa] flex flex-col sm:flex-row gap-[30px] sm:gap-[10px] md:gap-[20px] sm:px-[10px]  md:justify-center lg:px-0 lg:gap-[30px]">
          {/*Left */}
          {images ? (
            <div className="flex justify-center">
              <img
                src={`data:image/*;base64,${btoa(
                  new Uint8Array(images.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt=""
                className="responsive-element sm:flex sm:h-[550px] lg:h-[620px] object-cover"
              />
            </div>
          ) : (
            ""
          )}

          {/*Right */}
          {data ? (
            <div className="flex flex-col gap-[20px] md:px-0 md:w-[430px] lg:w-[520px]  pb-[40px] px-[10px]">
              <div
                className="flex flex-row gap-2 sm:gap-0 sm:flex-col"
                ref={ref}
              >
                <motion.span
                  animate={animation}
                  className="hidden sm:flex sm:text-[30px] md:text-[40px] lg:text-[50px] font-semibold"
                >
                  STORY
                </motion.span>
                <motion.span
                  animate={animation}
                  className="hidden sm:flex sm:text-[30px] md:text-[40px] lg:text-[50px] font-semibold"
                >
                  OF THE MONTH
                </motion.span>
                <motion.span
                  animate={animation}
                  className="text-[30px] text-left sm:hidden font-semibold"
                >
                  STORY OF THE MONTH
                </motion.span>
              </div>
              <div className="flex flex-col gap-[10px] ">
                <div className="">
                  {data ? (
                    <Link
                      to={`/ViewModel/${data._id}`}
                      className="text-[23px] md:text-[25px] font-fair capitalize"
                    >
                      {data.fullName}
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="responsive-description ">
                  {data ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                      className="text-[#99919c] tracking-wide break-normal font-fair responsive-description max-w-[450px] "
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default FeaturedModelCard;
