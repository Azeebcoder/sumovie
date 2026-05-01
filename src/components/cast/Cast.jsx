import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Cast.module.css";
import { Config } from "../../config/Config";

const Cast = ({ id, type, limit = 10 }) => {
  const apiKey = Config.apiKey;

  const castUrl = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`;

  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(castUrl);

        // Limit cast members
        setCredits(response.data.cast.slice(0, limit));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id, type, limit]);

  return (
    <div className={styles.casts}>
      {credits.length > 0 ? (
        credits.map((credit) => (
          <div
            key={credit.id}
            className={styles.cast}
          >
            <img
              src={
                credit.profile_path
                  ? `https://image.tmdb.org/t/p/w200${credit.profile_path}`
                  : "https://victoriastrokerecovery.org/wp-content/uploads/2024/07/placeholder.jpg"
              }
              alt={credit.name}
            />

            <h3>{credit.name}</h3>

            <h4>{credit.character}</h4>
          </div>
        ))
      ) : (
        <p>No cast available.</p>
      )}
    </div>
  );
};

export default Cast;