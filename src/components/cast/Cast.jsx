import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Cast.module.css";
import { Config } from "../../config/Config";
const Cast = ({ id }) => {
  const apikey = Config.apiKey;
  const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(castUrl);
      setCredits(response.data.cast);
    };

    fetchMovieDetails();
  }, []);
  return (
    <>
      <div className={styles.casts}>
        {credits ? (
          credits.map((credit, index) => (
            <div key={credit.id} className={styles.cast}>
              <img
                src={credit.profile_path? `https://image.tmdb.org/t/p/w200${credit.profile_path}`:"https://victoriastrokerecovery.org/wp-content/uploads/2024/07/placeholder.jpg"}
                alt="User"
              />
              <h3>{credit.name}</h3>
              <h4>{credit.character}</h4>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Cast;
