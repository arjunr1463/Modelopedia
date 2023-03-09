import React, { useState } from "react";
import "./CastingCall.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function Editcastingcall() {
  const navigate = useNavigate();
  const [success, setSucess] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [discription, setDiscription] = useState(location.state.description);
  const [image, setImage] = useState(location.state.image);
  const [imageName, setImageName] = useState("Choose files to upload");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDiscription = (value) => {
    setDiscription(value);
  };
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
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
    formData.append("title", title);
    formData.append("discription", discription);
    formData.append("image", image);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/client/register/castingcallsss/${id}/edit`,
          formData
        )
        .then((res) => {
          setTitle(res.data.castingCall.title);
          setDiscription(res.data.castingCall.discription);
          setImage(res.data.castingCall.image);
          setSucess(true);
          setTimeout(() => {
            setSucess(false);
          }, 3000);
          navigate("/admin/home/CastingCall");
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-[#f1f6fa] ">
      <div className="bg-[white] pb-[100px] rounded-[0.4rem] shadow-md flex flex-col gap-[20px] px-[20px] py-[20px] overflow-x-scroll scroll">
        <h className="font-semibold  sticky left-0">
          Edit Casting call details
        </h>
        <div className="border-b-[2px] w-[150px] sticky left-0"></div>
        <div>
          <input
            name="title"
            value={title}
            onChange={handleChangeTitle}
            type="text"
            placeholder="Enter the title"
            className="border-[1px] rounded-sm shadow-md text-[14px] outline-none w-full font-fair h-[45px] px-[10px]"
          />
        </div>
        <div>
          <input
            name="image"
            id="image"
            onChange={handleChangeImage}
            type="file"
            className="hidden"
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
        <div className="flex flex-col gap-[10px] lg:h-[350px]">
          <div className="flex justify-between w-full">
            <h className="font-fair ">Write discription</h>
          </div>
          <div className="h-[300px] shadow-md border-t-[1px] border-b-[1px]">
            <ReactQuill
              name="discription"
              value={discription}
              onChange={handleChangeDiscription}
              className="h-[300px] overflow-y-scroll scroll"
              modules={modules}
            />
          </div>
          <div className="w-full flex flex-col items-center py-[30px]">
            <button className="font-semibold bg-[black] text-[white] w-[150px] rounded-[0.2rem] h-[30px]">
              Submit
            </button>
            {success && (
              <div className="text-[red] text-[12px]">Successfully Edited</div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Editcastingcall;
