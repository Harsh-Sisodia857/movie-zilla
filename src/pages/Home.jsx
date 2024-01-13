import React from 'react'
import Searchbar from '../component/Searchbar'
import { useSelector } from 'react-redux';
import Movies from './Movies';
import Search from './Search';

function Home() {
  const { searchQuery: query } = useSelector((state) => state.movies);
  return (
    <div className=" ml-[15rem]">
      <Searchbar />
      {query ? <Search query={query} /> : <Movies />}
    </div>
  );
}

export default Home