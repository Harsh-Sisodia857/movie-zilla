import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGenres,
  setActiveGenre,
  fetchMovies,
} from "../store/slice/moviesSlice";

function Genre() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movies.genres);
  const activegenre = useSelector((state) => state.movies.activegenre);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenre = (genreId) => {
      dispatch(setActiveGenre(genreId));
      
      dispatch(fetchMovies({ activegenre: genreId, page: 1 }));
  }
  return (
    <>
      <div className="flex flex-wrap justify-center px-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenre(genre.id)}
            className={
              activegenre === genre.id
                ? "bg-white px-4 py-2 m-2 text-[15px] text-black font-semibold rounded-3xl"
                : "px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl"
            }
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Genre;
