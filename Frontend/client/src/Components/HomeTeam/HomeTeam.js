import React, { useEffect, useState } from "react";
import OurTeamCard from "../Card/OurTeamCard";
import axios from "axios";

function HomeTeam({ select,type }) {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ourTeam/${type}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [type]);

  const filterData=data.filter((data)=>data.status==="Active")

  return (
    <div className="flex flex-col gap-[30px] py-[40px]">
      <h className="flex text-center justify-center text-[22px] md:text-[30px] font-fair font-semibold">{select}</h>
      <div className=" flex justify-center h-full ">
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[20px] lg:gap-[40px]">
            {filterData.map((team) => (
              <div>
                <OurTeamCard
                  image={team.image}
                  name={team.name}
                  desc={team.designation}
                  about={team.description}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h>Loading.....</h>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeTeam;
