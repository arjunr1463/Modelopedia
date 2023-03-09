import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

function EnquiredModel() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/client/register/admin/client/getModels/${id}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, [id]);
  return (
    <div className="flex flex-col gap-[30px] overflow-x-scroll">
      <div>
        <h className="font-fair">Enquired Models</h>
      </div>

      <div>
        <table className=" border-[1px] font-fair">
          <thead>
            <tr className=" ">
              <th className="border-[1px] h-[30px] w-[100px]">SI</th>
              <th className="border-[1px] h-[30px]  w-[250px]">Name</th>
              <th className="border-[1px] h-[30px] w-[100px]">Model ID</th>
              <th className="border-[1px] h-[30px] ">Image</th>
              <th className="border-[1px] h-[30px]  w-[150px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas, key) => (
              <tr className="text-[14px] text-left" key={datas.id}>
                <td className="border-[1px] text-center px-[30px] md:px-0">
                  {key + 1}
                </td>
                <td className="border-[1px] text-center uppercase px-[30px] md:px-0">
                  {datas.userId.fullName}
                </td>
                <td className="border-[1px] px-[30px] ">{datas.userId.id}</td>
                <td className="border-[1px]   px-[20px]">
                  <div className="flex justify-center w-[200px] py-[5px]">
                    <img
                      src={`data:image/*;base64,${btoa(
                        new Uint8Array(
                          datas.userId.images[0].image.data.data
                        ).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`}
                      alt=""
                      className="h-[100px] w-[100px] object-cover"
                    />
                  </div>
                </td>
                <td className="border-[1px] px-[50px] ">
                  <MdDelete className="text-[20px] hover:text-[red] cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr className=" ">
              <th className="border-[1px] h-[30px] w-[100px]">SI</th>
              <th className="border-[1px] h-[30px]  w-[150px]">Name</th>
              <th className="border-[1px] h-[30px] w-[100px]">Model ID</th>
              <th className="border-[1px] h-[30px]  w-[250px]">Image</th>
              <th className="border-[1px] h-[30px]  w-[150px]">Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default EnquiredModel;
