import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import ApperanceInfo from "./ApperanceInfo"
import Pictures from "./Pictures"
import Video from "./Video"

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="">
      <div className="border-b-[1px] h-[50px] flex items-center px-[10px] font-semibold text-[20px]">
        <h>My Profile</h>
      </div>
      <div className="pt-[100px] flex flex-col gap-[20px] md:px-[10px] pb-[10px] overflow-hidden">
        <div className=" flex items-center font-semibold justify-around  h-[45px] shadow-md">
          {children.map((child, index) => (
            <div
              className={
                index === activeTab
                  ? "cursor-pointer border-b-[3px]  border-black text-[13px] font-fair font-semibold md:text-[16px]"
                  : "cursor-pointer text-[13px] font-fair font-semibold md:text-[16px]"
              }
              onClick={() => handleTabClick(index)}
            >
              {child.props.title}
            </div>
          ))}
        </div>

        <div className="">{children[activeTab]}</div>
      </div>
    </div>
  );
}

function Tab({ children }) {
  return <div>{children}</div>;
}

function Myprofile() {
  return (
    <div className="border-[1px]">
      <Tabs>
        <Tab title="Personal">
          <PersonalInfo />
        </Tab>
        <Tab title="Appearance">
          <ApperanceInfo/>
        </Tab>
        <Tab title="Pictures">
          <Pictures/>
        </Tab>
        <Tab title="Video">
          <Video/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Myprofile;
