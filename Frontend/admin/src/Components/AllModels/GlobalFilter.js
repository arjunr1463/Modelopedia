import React from "react";

function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="text-[17px] ">Search :</span>
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} type="text" className="outline-none h-[35px] w-[170px] border-[1px]" />
    </div>
  );
}

export default GlobalFilter;
