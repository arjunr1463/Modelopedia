import React from "react";

function Pagination({ totalpost, postsperpage, setCurrentPage, currentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalpost / postsperpage); i++) {
    pages.push(i);
  }
  return (
    <div className=" py-[50px] flex justify-center items-center gap-[10px]">
      {pages.map((page, index) => (
        <button
          key={index}
          className={
            page === currentPage
              ? "bg-[orange] text-white w-[30px] rounded-[0.2rem] font-semibold"
              : "bg-[black] text-white w-[30px] rounded-[0.2rem] font-semibold"
          }
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
