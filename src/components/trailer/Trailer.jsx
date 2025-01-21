import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Trailer.module.css';
import { Config } from "../../config/Config";

const Trailer = ({ id }) => {
  const [trailer, setTrailer] = useState(null);
  const [key, setKey] = useState(null);
  const apiKey = Config.apiKey;

  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(trailerUrl);
        setTrailer(response.data.results);
      } catch (error) {
        console.error("Error fetching trailer data:", error);
      }
    };

    fetchMovieDetails();
  }, [trailerUrl]);

  useEffect(() => {
    if (trailer) {
      for (const result of trailer) {
        if (result.type === "Trailer") {
          setKey(result.key); // Set the key of the first trailer found
          break;
        }
      }
    }
  }, [trailer]);

  return (
    <>
      {key ? (
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
            src={`https://www.youtube.com/embed/${key}`}
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
      ) : (
        <p>Loading trailer...</p>
      )}
    </>
  );
};

export default Trailer;
