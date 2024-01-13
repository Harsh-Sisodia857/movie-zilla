import React, { useEffect } from "react";
import Moviecard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setTrendingPage, fetchTrendingMovies } from "../store/slice/moviesSlice";

function Trending() {
  const {  loader, page, trending, totalPage } =
    useSelector((state) => state.movies);
    const dispatch = useDispatch();
  
  useEffect(() => {
      if (page > 0) {
          console.log("PAGE : ",page);
      dispatch(fetchTrendingMovies(page));
    }
  }, [page]);
  console.log(page , "page")
  return (
    <>
      <div className="ml-[15rem] bg-[#10141e] md:p-10 mb-20 md:mb-0">
        <motion.div
          layout
          className="flex flex-wrap relative justify-evenly md:justify-around"
        >
          <AnimatePresence>
            {loader ? (
              <span className="loader m-10"></span>
            ) : (
              <>
                <InfiniteScroll
                  className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                  dataLength={trending.length} //This is important field to render the next data
                  next={() => dispatch(setTrendingPage(page + 1))}
                  hasMore={page < totalPage}
                  loader={
                    <div className="w-full flex justify-center">
                      <span className="loader m-10 block"></span>
                    </div>
                  }
                  scrollThreshol={0.9}
                  style={{ overflow: "hidden" }}
                >
                  {trending.map((tred) => (
                    <Moviecard key={tred.id} movie={tred} />
                  ))}
                </InfiniteScroll>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Trending;
