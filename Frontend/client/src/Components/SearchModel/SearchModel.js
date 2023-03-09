import React, { useEffect, useState } from "react";
import AdvancedSearch from "../AdvancedSearch/AdvancedSearch";
import ModelData from "../ModelData/ModelData";
import { BiSearch } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";

function SearchModel() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortRange, setSortRange] = useState([0, 200]);
  const [sortAge, setSortAge] = useState([0, 100]);
  const [sortHeight, setSortHeight] = useState([0, 10]);
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    gender: "",
    eyecolor: "",
    haircolor: "",
    hairsize: "",
    hairtype: "",
    bodytype: "",
    shoesize: "",
    dresssize: "",
    skintone: "",
  });
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/register`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchModel();
  }, []);

  function getAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function height(height){
    const heightCm = height;
    const heightIn = heightCm / 2.54;
    const feet = Math.floor(heightIn / 12);
    return feet
  }

  
  const filteredUsers = data
    .filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
    )
    .filter(user => parseFloat(user.weight) >= sortRange[0] && parseFloat(user.weight) <= sortRange[1])
    .filter(user => getAge(user.dob) >= sortAge[0] && getAge(user.dob) <= sortAge[1])
    .filter(user => height(parseFloat(user.height)) >= sortHeight[0] && height(parseFloat(user.height)) <= sortHeight[1])
    .sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortRange = (values) => {
    setSortRange(values);
  }
  const handleChangeAge = (values) => {
    setSortAge(values);
  }

  const handleChangeHeight = (values) => {
    setSortHeight(values);
  }


  const handleGenderCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.gender.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        gender: [...selectedValues.gender, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        gender: selectedValues.gender.filter((item) => item !== value),
      });
    }
  };
  const handleEyeColorCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.eyecolor.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        eyecolor: [...selectedValues.eyecolor, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        eyecolor: selectedValues.eyecolor.filter((item) => item !== value),
      });
    }
  };
  const handleHairColorCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.haircolor.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        haircolor: [...selectedValues.haircolor, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        haircolor: selectedValues.haircolor.filter((item) => item !== value),
      });
    }
  };
  const handleHairSizeCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.hairsize.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        hairsize: [...selectedValues.hairsize, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        hairsize: selectedValues.hairsize.filter((item) => item !== value),
      });
    }
  };
  const handleHairTypeCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.hairtype.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        hairtype: [...selectedValues.hairtype, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        hairtype: selectedValues.hairtype.filter((item) => item !== value),
      });
    }
  };
  const handleBodyTypeCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.bodytype.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        bodytype: [...selectedValues.bodytype, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        bodytype: selectedValues.bodytype.filter((item) => item !== value),
      });
    }
  };
  const handleShoeSizeCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.shoesize.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        shoesize: [...selectedValues.shoesize, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        shoesize: selectedValues.shoesize.filter((item) => item !== value),
      });
    }
  };
  const handleDressSizeCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.dresssize.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        dresssize: [...selectedValues.dresssize, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        dresssize: selectedValues.dresssize.filter((item) => item !== value),
      });
    }
  };
  const handleSkinToneCheckbox = (e) => {
    const value = e.target.value;
    if (!selectedValues.skintone.includes(value)) {
      setSelectedValues({
        ...selectedValues,
        skintone: [...selectedValues.skintone, value],
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        skintone: selectedValues.skintone.filter((item) => item !== value),
      });
    }
  };

  return (
    <div className=" flex flex-col gap-[35px] py-[50px] md:pb-0  lg:pt-[150px] bg-[#ffffff] px-[10px]">
      {/* Top */}
      <div className="flex flex-col lg:flex-row  lg:px-[10px]  lg:gap-4 md:justify-center items-center">
        <motion.div
          animate={{ x: [-100, 0] }}
          transition={{ duration: 0.3 }}
          className="flex flex-row w-[90vw] lg:w-[300px]  bg-black justify-center items-center h-[40px] lg:h-[60px] rounded-l-[0.4rem]"
        >
          <h className="text-white font-semibold font-[sans-serif] text-[18px]">
            QUICK SEARCH{" "}
          </h>
          <span className="text-white text-[18px]">
            <AiOutlineArrowRight />
          </span>
        </motion.div>
        <div className="flex flex-col items-center  lg:flex-row lg:gap-2">
          <motion.div
            animate={{ x: [-100, 0] }}
            transition={{ duration: 0.3 }}
            className="flex justify-start items-center"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Model Id(Eg:MODEL-204) or Full Name"
              className="flex h-[60px] w-[90vw] lg:w-[500px]  outline-none border-[1px] input font-fair px-5 tracking-widest"
            />
          </motion.div>
          <div
            className="lg:w-[300px] w-[90vw]  flex flex-row gap-[5px]  bg-black justify-center items-center h-[40px] lg:h-[60px]  rounded-r-[0.4rem] "
          >
            <span className="text-white text-[18px]">
              <BiSearch />
            </span>
            <span
              className="text-white font-bold text-[18px] "
            >
              Search
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col small:flex-row lg:flex-row gap-[20px] sm:gap-[20px] lg:gap-[30px] sm:justify-center  ">
        {/* left */}
        <AdvancedSearch
          weight={sortRange} 
          Age={sortAge}
          Height={sortHeight}
          handleChangeHeight={handleChangeHeight}
          handleChangeAge={handleChangeAge}
          handleChangeWeight={handleSortRange}
          handleChangeGender={handleGenderCheckbox}
          handleChangeEyecolor={handleEyeColorCheckbox}
          handleChangeHaircolor={handleHairColorCheckbox}
          handleChangeHairsize={handleHairSizeCheckbox}
          handleChangeHairtype={handleHairTypeCheckbox}
          handleChangeBodytype={handleBodyTypeCheckbox}
          handleChangeShoesize={handleShoeSizeCheckbox}
          handleChangeDresssize={handleDressSizeCheckbox}
          handleChangeSkintone={handleSkinToneCheckbox}
        />
        {/* Right */}
        <ModelData selectedValues={selectedValues} data={filteredUsers} loading={loading}  />
      </div>
    </div>
  );
}

export default SearchModel;
