import React, { useState } from "react";
import Card from "../Card/SearchModelCard";
import "../ClientSignup/ClientSignup.css";
import Pagination from "../Pagination/Pagination";
function ModelData({ selectedValues, data, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(8);

  const model = data
    .sort(() => Math.random() - 0.5)
    .filter((user) =>
      user.images.some((image) => image.imagestatus === "Approved")
    );

  const filteredUsers = model.filter((user) => {
    let isValid = true;
    if (
      selectedValues.gender.length &&
      !selectedValues.gender.includes(user.gender)
    ) {
      isValid = false;
    }
    if (
      selectedValues.eyecolor.length &&
      !selectedValues.eyecolor.includes(user.eyecolor)
    ) {
      isValid = false;
    }
    if (
      selectedValues.haircolor.length &&
      !selectedValues.haircolor.includes(user.haircolor)
    ) {
      isValid = false;
    }
    if (
      selectedValues.hairsize.length &&
      !selectedValues.hairsize.includes(user.hairsize)
    ) {
      isValid = false;
    }
    if (
      selectedValues.hairtype.length &&
      !selectedValues.hairtype.includes(user.hairtype)
    ) {
      isValid = false;
    }
    if (
      selectedValues.bodytype.length &&
      !selectedValues.bodytype.includes(user.bodytype)
    ) {
      isValid = false;
    }
    if (
      selectedValues.shoesize.length &&
      !selectedValues.shoesize.includes(user.shoesize)
    ) {
      isValid = false;
    }
    if (
      selectedValues.dresssize.length &&
      !selectedValues.dresssize.includes(user.dresssize)
    ) {
      isValid = false;
    }
    if (
      selectedValues.skintone.length &&
      !selectedValues.skintone.includes(user.skintone)
    ) {
      isValid = false;
    }
    return isValid;
  });

  const lastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filteredUsers.slice(FirstPostIndex, lastPostIndex);
  return (
    <div>
      {loading ? (
        <div className="text-[red] font-fair">Loading please wait...</div>
      ) : (
        <div className="flex flex-col  items-center  gap-10 px-[10px] sm:px-0 ">
          {model ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 gap-5">
              {currentPost.map((model) => {
                 const approvedImages = model.images.filter(
                  (image) => image.imagestatus === "Approved"
                );
                const approvedImage =
                  approvedImages.length > 0
                    ? approvedImages[
                        Math.floor(Math.random() * approvedImages.length)
                      ]
                    : null;
                return (
                  <div>
                    <Card
                      name={model.fullName}
                      state={model.state}
                      date={model.dob}
                      image={approvedImage ? approvedImage.image : null}
                      id={model._id}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <span>Error Something went wrong</span>
          )}
        </div>
      )}
      <Pagination
        totalpost={filteredUsers.length}
        postsperpage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPostPerPage={setPostPerPage}
      />
    </div>
  );
}

export default ModelData;
