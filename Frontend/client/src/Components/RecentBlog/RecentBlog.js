import React, {useEffect } from "react";
import Card from "../Card/RecentBlogCard";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
function Blog({data}) {
  const filteredData = data.filter((data) => data.status === "Active");
  const slicedData = filteredData.slice(-3);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type:"spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({
        x:0,
        animation:{
          type:"scale",
          
        }
        
      });
    }
  }, [inView, animation]);
  
  return (
    <div className="lg:px-[20px] pb-[80px] md:pb-[100px]">
      <div className="bg-white  pt-[35px] h-full lg:h-[250px] flex flex-col items-center gap-2 pb-[30px] md:pb-[100px] md:pt-[50px]">
        <div className="hidden lg:flex lg:relative">
          <h className="text-[#eeeff0] text-[120px] tracking-widest font-bold">
            Blog
          </h>
        </div>
        <div className="px-[15px] w-[90vw] lg:absolute mt-[30px] lg:mt-[90px] break-normal flex justify-center">
          <h className="text-[30px] tracking-widest font-fair">RECENT BLOG</h>
        </div>
      </div>
      <div ref={ref}  className="bg-white flex justify-center ">
        <motion.div animate={animation} className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-[50px] md:gap-[20px]  ">
          {slicedData.map((blog) => (
            <div className="">
              <Card image={blog.image} title={blog.title} id={blog}
                key={blog.id} date={blog.createdAt}/>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Blog;
