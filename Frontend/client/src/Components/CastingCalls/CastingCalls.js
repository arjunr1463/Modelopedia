import React, { useState,useEffect } from "react";
import CastingCallCard from "../Card/CastingCallCard";
import Pagination from "../Pagination/Pagination";
import axios from "axios"

function CastingCalls() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(3);
  const [data, setData] = useState([]);
  const [castingCallData, setCastingCallData] = useState([]);

  useEffect(() => {
    const API_URL = `${process.env.REACT_APP_API_URL}/api/client/register`;
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    const castingCalls = data.map(user => user.castingcall).flat();
    setCastingCallData(castingCalls);
  }, [data]);

  const filterData=castingCallData.filter((data)=>data.status==="active"||data.status==="Active")
  const lastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filterData.slice(FirstPostIndex, lastPostIndex);
  return (
    <div>
      <div className="flex justify-center items-center  pt-[50px] md:pt-[100px] px-[10px] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[20px] lg:gap-[40px]">
          {currentPost.map((casting) => (
            <div>
              <CastingCallCard
                title={casting.title}
                content={casting.discription}
                id={casting}
                key={casting.id}
                date={casting.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        totalpost={castingCallData.length}
        postsperpage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPostPerPage={setPostPerPage}
      />
    </div>
  );
}

export default CastingCalls;
