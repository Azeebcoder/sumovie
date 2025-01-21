import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Trailer.module.css'

const Trailer = ({id}) => {
  const [trailer, setTrailer] = useState(null);
  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";

  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  useEffect(()=>{
    const fetchMovieDetails = async () => {
      const response = await axios.get(trailerUrl);
      setTrailer(response.data.results[0].key);
    };
  
    fetchMovieDetails();
  },[]);


  return (
    <>
      <div
        className={styles.trailer}
        style={{
          position: "relative",
          paddingBottom: "56.25%", // Aspect ratio (16:9)
          height: 0,
          overflow: "hidden",
          width: "100%", // Set width to 100% of the parent container
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailer}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%", // Make the iframe fill the width of the container
            height: "100%", // Make the iframe fill the height of the container
          }}
        ></iframe>
      </div>
    </>
  );
};

export default Trailer;
