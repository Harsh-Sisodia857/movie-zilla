import React, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

function Favoritepage() {
  const { loader, favouriteMovies } = useSelector((state) => state.movies);

  
    console.log(favouriteMovies);
    if (favouriteMovies.length == 0)
      return (
        <div className="flex h-[100vh] ml-[15rem] justify-center items-center">
          <p className="text-xl text-white">No Bookmark Yet!</p>
        </div>
      );
  console.log(favouriteMovies)
  return (
    <>
      <div className="ml-[15rem] bg-[#10141e] md:p-10 mb-20 md:mb-0">
        <motion.div
          layout
          className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
        >
          <AnimatePresence>
            {loader ? (
              <span className="loader m-10"></span>
            ) : (
              favouriteMovies
                .map((movie, index) => (
                  <Moviecard key={index} movie={movie} />
                ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Favoritepage;
