import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleBlog/SingleBlog.css";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { id } = useParams();
  const [datas, setData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Blog/${id}`
        );
        const response1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/Blog`);
        setData(response.data);
        setImage(response.data.image.data.data);
        setRecent(response1.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);
  const filteredData = recent.filter((data) => data.status === "Active"); 
  const slicedData = filteredData.slice(-3);
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-end gap-[30px] lg:gap-[100px] py-[50px] lg:py-[150px] lg:px-[10px]">
      {/* Left */}
      <div className="flex flex-col items-start w-[90vw] sm:w-[550px] md:w-[700px] lg:w-[600px] h-full ">
        <div className="flex flex-col gap-[10px]">
          <div>
            <h className="text-[35px] font-semibold font-[sans-serif]">
              {datas.title}
            </h>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: datas.discription }} />
          </div>
        </div>
        <div className="flex mt-[20px] lg:mt-[50px]">
          <img
            src={`data:image/*;base64,${btoa(
              new Uint8Array(image).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )}`}
            alt=""
            className=" object-cover"
          />
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col lg:gap-[20px] w-[90vw] sm:w-[550px] md:w-[700px] lg:w-[600px] h-full pb-10 lg:pb-0">
        <div>
          <h className="text-[25px] font-semibold">Recent Blog</h>
        </div>
        <div className="flex flex-col gap-[10px] ">
          {slicedData.map((data) => (
            <div className="flex gap-[10px]">
              <div>
                <img
                  src={`data:image/*;base64,${btoa(
                    new Uint8Array(data.image.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt=""
                  className="h-[80px] w-[100px] object-cover"
                />
              </div>
              <div className="flex flex-col gap-[10px] w-[180px] lg:w-[200px] break-normal">
                <span className="text-[13px]">{data.title}</span>
                <span className="text-[13px]">
                  {data.createdAt.slice(0, 10)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
