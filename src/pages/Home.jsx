import React from 'react'
import Searchbar from '../component/Searchbar'
import Movies from './Movies';

function Home() {
  return (
    <div className=" ml-[15rem]">
      <Searchbar />
     <Movies />
    </div>
  );
}

export default Home