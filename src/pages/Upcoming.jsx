import React, { useEffect } from "react";
import Moviecard from "./Moviecard";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchUpcomingMovies } from "../store/slice/moviesSlice";

function Upcoming() {
  const { loader, page, upcoming, totalPage } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page > 0) {
      dispatch(fetchUpcomingMovies(page));
    }
  }, [page]);
   console.log(upcoming) 
  console.log(page)
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
                  dataLength={upcoming.length} 
                  next={() => dispatch(setPage(page + 1))}
                  hasMore={page < totalPage}
                  loader={<span className="loader m-10"></span>}
                  scrollThreshol={0.9}
                  style={{ overflow: "hidden" }}
                >
                  {upcoming.map((upc) => (
                    <Moviecard key={upc.id} movie={upc} />
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

export default Upcoming;
