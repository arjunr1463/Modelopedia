import React from "react";
import Banner from "../../Components/Banner/SearchModel";
import Search from "../../Components/SearchModel/SearchModel";
import Scroll from "../../Components/ScrollToTop";
function SearchModel() {
  return (
    <div>
      <Scroll />
      <Banner />
      <Search />
    </div>
  );
}

export default SearchModel;
