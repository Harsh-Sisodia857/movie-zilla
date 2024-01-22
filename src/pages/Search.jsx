import React, { useEffect } from "react";
import Moviecard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMovies } from "../store/slice/moviesSlice";
import { HiChevronLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchMovies,
  clearSearchedMovies,
} from "../store/slice/moviesSlice";

function Search({ query }) {
  const dispatch = useDispatch();
  const { activegenre, searchQuery, page, searchedMovies, loader } =
    useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchSearchMovies(query));
  }, [dispatch, query]);

  return (
    <section>
      <div
        to="/"
        className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full hover:cursor-pointer"
      >
        <HiChevronLeft
          onClick={() => {
            dispatch(clearSearchedMovies());
            dispatch(fetchMovies({ activegenre, page, searchQuery }));
          }}
        />
      </div>
      <div className="w-full bg-[#10141e] md:p-10 mb-20 md:mb-0">
        <motion.div
          layout
          className="flex flex-wrap relative justify-evenly md:justify-around"
        >
          <AnimatePresence>
            {loader ? (
              <span className="loader m-10"></span>
            ) : (
              <>
                {searchedMovies.length > 0 ? (
                  searchedMovies.map((movie) => (
                    <Moviecard key={movie.id} movie={movie} />
                  ))
                ) : (
                  <div>
                    <h1 className="text-white text-4xl">No Movie Found !!</h1>
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Search;
