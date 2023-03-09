import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Banner/Banner.css";
import bg3 from "../../Assets/Banner/CastingCalls/003.jpeg";
import Pagination from "../Pagination/Pagination";
import { motion } from "framer-motion";
import axios from "axios";

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(3);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Blog`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, []);
  const lastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = data.slice(FirstPostIndex, lastPostIndex);
  return (
    <div>
      <div className="relative">
        <div className="">
          <img
            src={bg3}
            alt=""
            className="w-full h-[120px] lg:h-[200px] object-cover"
          />
        </div>
        <div className="container">
          <div className="flex flex-col items-center">
            <h className="text-[18px] lg:text-[35px] font-bold tracking-widest">
              BLOG
            </h>
            <span className="font-medium text-[15px] lg:text-[18px] tracking-wide">
              HOME BLOG
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#f8f9fa] flex justify-center pt-[60px] md:pt-[100px] px-[10px]">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[50px] sm:gap-[40px] ">
          {currentPost.map((blog) => (
            <div className="bg-white w-[90vw] sm:w-[300px]  md:w-[240px] lg:w-[330px] flex flex-col gap-[10px] border-[1px] px-[10px] py-[10px]">
              <div>
                <img
                  src={`data:image/*;base64,${btoa(
                    new Uint8Array(blog.image.data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt=""
                  className="h-[250px] w-full object-cover hover:scale-105 duration-300 "
                />
              </div>
              <div className=" text-center h-[70px] overflow-hidden">
                <h className="text-[15px] sm:text-[20px] lg:text-[22px] font-semibold">
                  {blog.title}
                </h>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex justify-end"
              >
                <Link
                  to={`/SingleBlog/${blog._id}`}
                  className=" text-[white] font-semibold bg-[#232f3e]  w-full h-[30px] text-[15px] rounded-[0.2rem] flex justify-center items-center"
                >
                  View More
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#f8f9fa]">
        <Pagination
          totalpost={data.length}
          postsperpage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPostPerPage={setPostPerPage}
        />
      </div>
    </div>
  );
}

export default Blog;
