import React from "react";
import "./AdvancedSearch.css";
import { Range } from "react-range";

function AdvancedSearch({
  handleChangeGender,
  handleChangeEyecolor,
  handleChangeHaircolor,
  handleChangeHairsize,
  handleChangeHairtype,
  handleChangeBodytype,
  handleChangeShoesize,
  handleChangeDresssize,
  handleChangeSkintone,
  handleChangeWeight,
  handleChangeAge,
  handleChangeHeight,
  weight,
  Height,
  Age,
}) {

  return (
    <div className="flex flex-col bg-[#ffffff] px-[10px] sm:px-0  ">
      <div className="flex flex-col">
        <div className="bg-[#f7f7f7] flex justify-center items-center h-[50px] border-[1px]">
          <h className="text-[20px] font-[sans-serif] font-semibold tracking-wider">
            Advanced Search
          </h>
        </div>
        <div className="px-[10px] py-[30px] bg-white border-[1px] flex flex-col gap-5">
          {/*Height*/}
          <div className="range">
            <div>
              <h className="font-semibold font-[sans-serif] text-[18px]">
                Height
              </h>
            </div>
            <div>
              <span>
                {Height[0]} - {Height[1]} Inch
              </span>
              <Range
                step={1}
                min={0}
                max={10}
                values={Height}
                onChange={handleChangeHeight}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      backgroundColor: "#ddd",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "15px",
                      width: "15px",
                      backgroundColor: isDragged ? "#3878d9" : "#ccc",
                      borderRadius: "50%",
                    }}
                  />
                )}
              />
            </div>
          </div>
          {/*Weight*/}
          <div className="range">
            <div>
              <h className="font-semibold font-[sans-serif] text-[18px]">
                Weight
              </h>
            </div>
            <div>
              <div>
                <span>
                  {weight[0]} - {weight[1]} kg
                </span>
                <Range
                  step={1}
                  min={0}
                  max={200}
                  values={weight}
                  onChange={handleChangeWeight}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        backgroundColor: "#ddd",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "15px",
                        width: "15px",
                        backgroundColor: isDragged ? "#3878d9" : "#ccc",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          {/*Age*/}
          <div className="range">
            <div>
              <h className="font-semibold font-[sans-serif] text-[18px]">Age</h>
            </div>
            <div>
              <div>
                <span>
                  {Age[0]} - {Age[1]} Years
                </span>
                <Range
                  step={1}
                  min={0}
                  max={100}
                  values={Age}
                  onChange={handleChangeAge}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        backgroundColor: "#ddd",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "15px",
                        width: "15px",
                        backgroundColor: isDragged ? "#3878d9" : "#ccc",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          {/*Gender*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Gender
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-3">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="Female"
                  name="gender"
                  value="Female"
                  onChange={handleChangeGender}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="Female" className="">
                  Female
                </label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={handleChangeGender}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="kid"
                  name="gender"
                  value="Kid"
                  onChange={handleChangeGender}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="kid">Kid</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="transgender"
                  name="gender"
                  value="Transgender"
                  onChange={handleChangeGender}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="transgender">Transgender</label>
              </div>
            </div>
          </div>
          {/*Eyecolor*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Eye Color
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-2">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyebrown"
                  name="eyecolor"
                  value="Brown"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyebrown">Brown</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyeblack"
                  name="eyecolor"
                  value="Black"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyeblack">Black</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyehazel"
                  name="eyecolor"
                  value="Hazel"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyehazel">Hazel</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyegray"
                  name="eyecolor"
                  value="Gray"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyegray">Gray</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyeblue"
                  name="eyecolor"
                  value="Blue"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyeblue">Blue</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyegreen"
                  name="eyecolor"
                  value="Green"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyegreen">Green</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="eyeamber"
                  name="eyecolor"
                  value="Amber"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyeamber">Amber</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center ">
                <input
                  type="checkbox"
                  id="eyeredandviolet"
                  name="eyecolor"
                  value="Red & Violet"
                  onChange={handleChangeEyecolor}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="eyeredandviolet">Red & Violet</label>
              </div>
            </div>
          </div>
          {/*HairColor*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Hair Color
            </h>
            <div className="grid lg:grid-cols-2 grid-cols-2">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Brown"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairbrown"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairbrown">Brown</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Black"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairblack"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairblack">Black</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="White"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairwhite"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairwhite">White</label>
              </div>

              <div className="flex flex-row gap-[5px]  items-center">
                <input
                  name="haircolor"
                  value="Red"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairred"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairred">Red</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Blonde"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairblonde"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairblonde">Blonde</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Blue"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairblue"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairblue">Blue</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Green"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairgreen"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairgreen">Green</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Red & Violet"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairredandviolet"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairredandviolet">Red & violet</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="haircolor"
                  value="Black & White"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairbandw"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairbandw">Black & White</label>
              </div>
              <div className="flex flex-row gap-[5px]  items-center">
                <input
                  name="haircolor"
                  value="other"
                  onChange={handleChangeHaircolor}
                  type="checkbox"
                  id="hairother"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairother">Other</label>
              </div>
            </div>
          </div>
          {/*HairSize*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Hair Size
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-3">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="hairsize"
                  value="Bald"
                  onChange={handleChangeHairsize}
                  id="bald"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="bald">Bald</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairsize"
                  value="Short"
                  onChange={handleChangeHairsize}
                  type="checkbox"
                  id="short"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="short">Short</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairsize"
                  value="Long"
                  onChange={handleChangeHairsize}
                  type="checkbox"
                  id="Long"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="Long">Long</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairsize"
                  value="Medium"
                  onChange={handleChangeHairsize}
                  type="checkbox"
                  id="medium"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="medium">Medium</label>
              </div>
            </div>
          </div>
          {/*HairType*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Hair Type
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-3">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairtype"
                  value="Straight"
                  onChange={handleChangeHairtype}
                  type="checkbox"
                  id="straight"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="straight">Straight</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairtype"
                  value="Wavy"
                  onChange={handleChangeHairtype}
                  type="checkbox"
                  id="wavy"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="wavy">Wavy</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairtype"
                  value="Curly"
                  onChange={handleChangeHairtype}
                  type="checkbox"
                  id="curly"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="curly">Curly</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairtype"
                  value="Coily"
                  onChange={handleChangeHairtype}
                  type="checkbox"
                  id="coily"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="coily">Coily</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="hairtype"
                  value="Other"
                  onChange={handleChangeHairtype}
                  type="checkbox"
                  id="hairtypeother"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="hairtypeother">Other</label>
              </div>
            </div>
          </div>
          {/*BodyType*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Body Type
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-3">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="bodytype"
                  value="Slim"
                  onChange={handleChangeBodytype}
                  type="checkbox"
                  id="slim"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="slim">Slim</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="bodytype"
                  value="Average"
                  onChange={handleChangeBodytype}
                  type="checkbox"
                  id="average"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="average">Average</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  id="fit"
                  name="bodytype"
                  value="Fit"
                  onChange={handleChangeBodytype}
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="fit">Fit</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="bodytype"
                  value="Athletic"
                  onChange={handleChangeBodytype}
                  type="checkbox"
                  id="athletic"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="athletic">Athletic</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="bodytype"
                  value="Muscular"
                  onChange={handleChangeBodytype}
                  id="muscular"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="muscular">Muscular</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="bodytype"
                  value="Heavy"
                  onChange={handleChangeBodytype}
                  type="checkbox"
                  id="heavy"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="heavy">Heavy</label>
              </div>
            </div>
          </div>
          {/*ShoeSize*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Shoe Size
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-3">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="0"
                  onChange={handleChangeShoesize}
                  id="0"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="0">0</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="0.5"
                  onChange={handleChangeShoesize}
                  id="0.5"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="0.5">0.5</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="1"
                  onChange={handleChangeShoesize}
                  id="1"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="1">1</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="2"
                  onChange={handleChangeShoesize}
                  id="2"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="2">2</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="3"
                  onChange={handleChangeShoesize}
                  id="3"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="3">3</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="4"
                  onChange={handleChangeShoesize}
                  id="4"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="4">4</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="5"
                  onChange={handleChangeShoesize}
                  id="5"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="5">5</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="6"
                  onChange={handleChangeShoesize}
                  id="6"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="6">6</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="7"
                  onChange={handleChangeShoesize}
                  id="7"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="7">7</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="8"
                  onChange={handleChangeShoesize}
                  id="8"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="8">8</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="9"
                  onChange={handleChangeShoesize}
                  id="9"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="9">9</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  type="checkbox"
                  name="shoesize"
                  value="10"
                  onChange={handleChangeShoesize}
                  id="10"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="10">10</label>
              </div>
            </div>
          </div>
          {/*Dress Size*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Dress Size
            </h>
            <div className="grid lg:grid-cols-2 grid-cols-2 ">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="0-6 months"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="6MNTH"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="6MNTH">0-6 months</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="6-12 months"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="12MNTH"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="12MNTH">6-12 months</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="1-5 years"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="1YRS"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="1YRS">1-5yrs</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="5-10 years"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="5YRS"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="5YRS">5-10yrs</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="10-15 years"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="10YRS"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="10YRS">10-15yrs</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="XS/38"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="XS38"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="XS38">XS/38</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="S/39"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="S39"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="S39">S/39</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="M/40"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="M40"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="M40">M/40</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="L/42"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="L42"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="L42">L/42</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="XL/44"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="XL44"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="XL44">XL/44</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="dresssize"
                  value="2XL/46"
                  onChange={handleChangeDresssize}
                  type="checkbox"
                  id="2XL"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="2XL">2XL/46</label>
              </div>
            </div>
          </div>
          {/*SkinTone*/}
          <div className="range">
            <h className="font-semibold font-[sans-serif] text-[18px]">
              Skin Tone
            </h>
            <div className="grid lg:grid-cols-3 grid-cols-2">
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Fair"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skinfair"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skinfair">Fair</label>
              </div>
              <div className="flex flex-row gap-[5px]  items-center">
                <input
                  name="skintone"
                  value="Light"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skinlight"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skinlight">Light</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Medium"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skinmedium"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skinmedium">Medium</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Dusky"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skindusky"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skindusky">Dusky</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Olive"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skinolive"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skinolive">Olive</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Tan"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skintan"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skintan">Tan</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Brown"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skinbrown"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skinbrown">Brown</label>
              </div>

              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Dark Brown"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skindarkbrown"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skindarkbrown">Dark Brown</label>
              </div>
              <div className="flex flex-row gap-[5px] items-center">
                <input
                  name="skintone"
                  value="Black"
                  onChange={handleChangeSkintone}
                  type="checkbox"
                  id="skinblack"
                  className="h-[15px] w-[15px]"
                />
                <label htmlFor="skinblack">Black</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
