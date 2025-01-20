import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Moviedetail from '../movieDetail/Moviedetail';

const SearchMovie = () => {
  const { search } = useParams(); // Get 'search' from the route parameters
  const [currentSearch, setCurrentSearch] = useState(search);

  useEffect(() => {
    localStorage.removeItem("pageno")
    // Update currentSearch whenever the search parameter changes
    setCurrentSearch(search);
  }, [search]); // Re-run the effect whenever 'search' changes

  return (
    <Moviedetail search={currentSearch} />
  );
};

export default SearchMovie;
