import React, { useEffect } from "react";
import Moviecard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchMovies } from "../store/slice/moviesSlice";

function Movies() {
  const dispatch = useDispatch();
  const { movies, loader, page, totalPage, activegenre, searchQuery } =
    useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(setPage(1));
  }, []);

  useEffect(() => {
    dispatch(setPage(0));
  }, [activegenre]);

  useEffect(() => {
    if (page > 0) {
      dispatch(fetchMovies({ activegenre, page, searchQuery }));
    }
  }, [page, activegenre, dispatch]);
  const handleMoreData = () => {
    dispatch(setPage(page + 1))
  };
  
  return (
    <div className="w-full bg-[#10141e] md:p-10 mb-20 md:mb-0">
      <div>
        <motion.div
          layout
          className="flex flex-wrap relative justify-evenly md:justify-around"
        >
          {loader ? (
            <span className="loader m-10 block"></span>
          ) : (
            <AnimatePresence>
              <>
                <InfiniteScroll
                  className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                  dataLength={movies.length} //This is important field to render the next data
                  next={handleMoreData}
                  hasMore={page < totalPage}
                  loader={
                    <div className="w-full flex justify-center">
                      <span className="loader m-10 block"></span>
                    </div>
                  }
                  scrollThreshol={0.9}
                  style={{ overflow: "hidden" }}
                >
                  {movies.map((movie) => (
                    <Moviecard key={movie.id} movie={movie} />
                  ))}
                </InfiniteScroll>
              </>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );}

export default Movies;
