import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/slice/moviesSlice";
function Searchbar() {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
    const handleSearch = () => {
      console.log(value)
     dispatch(setSearchQuery(value));
  };


  return (
    <>
      <div className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-[10rem] md:h-[12rem]">
        <div className="h-full w-full bg-black/30 flex justify-center items-center">
          <input
            type="search"
            name="searchpanel"
            id="searchpanel"
            placeholder="Search Movie"
            className="p-3 w-full mx-10 md:w-[40rem]  rounded-xl outline-none"
            onKeyUp={(e) => handleSearch()}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Searchbar;
