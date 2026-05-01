import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ScreenShots.module.css";
import { Config } from "../../config/Config";

const ScreenShots = ({ id, type, limit = 5 }) => {
  const [images, setImages] = useState([]);

  const apiKey = Config.apiKey;

  const imagesUrl = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(imagesUrl);

        // Limit screenshots
        setImages(response.data.backdrops.slice(0, limit));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id, type, limit]);

  return (
    <div className={styles.images}>
      {images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={`sumit-${index}`}
            className={styles.image}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
              alt={`screenshot-${index}`}
            />
          </div>
        ))
      ) : (
        <p>No screenshots available.</p>
      )}
    </div>
  );
};

export default ScreenShots;