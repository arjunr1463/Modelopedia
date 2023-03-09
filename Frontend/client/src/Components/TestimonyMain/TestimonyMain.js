import React, { useEffect, useState } from "react";
import Card from "../Card/TestimonyMainCard";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
function TestimonyMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(3);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res =await axios.get(`${process.env.REACT_APP_API_URL}/api/Testimony`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = data.slice(FirstPostIndex, lastPostIndex);
  return (
    <div>
      <div className="flex justify-center pt-[50px] lg:pt-[100px] px-[10px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[20px]">
          {currentPost.map((team) => (
            <div>
              <Card
              image={team.image}
                name={team.fullname}
                companyname={team.companyname}
                discription={team.discription}
              />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        totalpost={data.length}
        postsperpage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPostPerPage={setPostPerPage}
      />
    </div>
  );
}

export default TestimonyMain;
