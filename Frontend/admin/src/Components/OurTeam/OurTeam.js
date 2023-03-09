import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"
import "../Testimony/Testimony.css"


function OurTeam() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectmember, setSelectmember] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("Choose files to upload");

  const handleChangeName = (e) => {
    setName(e.target.value);
    console.log(e.target.value)
  };
  const handleChangeDesignation = (e) => {
    setDesignation(e.target.value);
    console.log(e.target.value)
  };
  const handleChangeMember = (e) => {
    setSelectmember(e.target.value);
    console.log(e.target.value)
  };
  const handleChangeContent = (value) => {
    setDescription(value);
  };
  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],

    clipboard: {
      matchVisual: false,
    },
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("selectmember", selectmember);
    formData.append("description", description);
    formData.append("image", image);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/ourTeam`, formData)
        .then((res) => console.log(res)).then(window.location.href ='/admin/home/OurTeam')
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-[#f1f6fa]">
      <div className="bg-[white]  rounded-[0.4rem] shadow-md flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold  sticky left-0">Add team details</h>
        <div className="border-b-[2px] w-[150px] sticky left-0"></div>
        <div>
          <input
            onChange={handleChangeName}
            type="text"
            placeholder="Full Name"
            className="border-[1px] shadow-md outline-none w-full h-[45px] px-[10px] text-[15px] "
          />
          
        </div>
        <div>
          <input
            onChange={handleChangeDesignation}
            type="text"
            placeholder="Designation"
            className="border-[1px] shadow-md outline-none w-full h-[45px] px-[10px] text-[15px] "
          />
        </div>
        <div>
          <select onChange={handleChangeMember} value={selectmember}  className="border-[1px] shadow-md w-full h-[45px] px-[10px] outline-none text-black/40  text-[15px]">
            <option value="">Select Member</option>
            <option value="Team Leaders">Team Leaders</option>
            <option value="Team Mentors">Team Mentors</option>
            <option value="Go Glowrius 2021 Panel Member">Go Glowrius 2021 Panel Member</option>
          </select>
        </div>
        <div>
          <input
            onChange={handleChangeImage}
            type="file"
            id="image"
            className="hidden "
          />
            <div className="flex ">
            <span className="border-[1px] text-[#99919c] rounded-l-[0.2rem] outline-none shadow-md w-[250px] flex items-center px-[10px] text-[14px]">
              {imageName}
            </span>
            <label
              htmlFor="image"
              className="bg-[black] rounded-r-[0.2rem] cursor-pointer text-white font-semibold w-[120px] h-[45px] flex justify-center items-center"
            >
              Choose File
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] ">
          <div className="flex justify-between w-full">
          <h className="font-fair">Write Content</h>
          
          
        
          </div>
          <div className="shadow-md border-t-[1px] border-b-[1px]">
          <ReactQuill
            value={description}
            onChange={handleChangeContent}
            className="overflow-y-scroll scroll"
            modules={modules}
          />
          </div>
          <div className="w-full flex justify-center">
        <button className="font-semibold bg-[black] text-[white] w-[120px] rounded-[0.2rem] h-[30px]">
            Submit
          </button>
        </div>
        </div>
        
      </div>
      
    </form>
  );
}

export default OurTeam;
