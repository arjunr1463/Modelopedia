import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
function SpecialStory() {
  const [modelId, setModelId] = useState("");
  const [description, setDescription] = useState("");
  const[notfound,setNotfound]=useState("")

  const handleChangeModelId = (e) => {
    setModelId(e.target.value);
  };

  const handleChangeDescription = (value) => {
    const removeBgColor = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const elements = doc.querySelectorAll('[style*=background-color]');
      elements.forEach((el) => {
        el.style.backgroundColor = '';
      });
      return doc.documentElement.innerHTML;
    };
    
    const cleanedValue = removeBgColor(value);

    setDescription(cleanedValue);
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

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/register/UserSpecialStory/update`,
        {
          id: modelId,
          specialdescription: description,
        }
      );
      console.log(response.data);
      window.location.reload()
    } catch (error) {
      console.error(error.response.data);
      setNotfound(error.response.data.error)
      setTimeout(() => {
        setNotfound("")
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100">
      <div className="bg-white rounded-md shadow-md flex flex-col gap-5 p-6 overflow-x-auto">
        <h2 className="font-bold">Special Story</h2>
        <div className="border-b-2 w-20"></div>
        <div>
          <input
            name="id"
            value={modelId}
            onChange={handleChangeModelId}
            type="text"
            placeholder="Enter the Model-ID"
            className="border-2 outline-none w-full shadow-md h-10 px-3 rounded-md"
          />
          <div className="text-[12px] text-[red] px-[10px]">{notfound}</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="">
            <h3 className="font-fair ">Write description</h3>
          </div>
          <div className="border-t-2 border-b-2 shadow-md">
            <ReactQuill
              name="description"
              value={description}
              onChange={handleChangeDescription}
              className=""
              modules={modules}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="font-semibold bg-black text-white w-24 rounded-md h-8"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SpecialStory;
