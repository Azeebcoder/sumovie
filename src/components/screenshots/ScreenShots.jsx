import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './ScreenShots.module.css'
import { Config } from "../../config/Config";

const ScreenShots = ({id}) => {
  const [images, setImages] = useState(null);
  const apiKey = Config.apiKey;
  const imagesUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(imagesUrl);
      setImages(response.data.backdrops);
    };

    fetchMovieDetails();
  }, []);
  return (
    <>
      <div className={styles.images}>
        {images ? (
          images.map((image, index) => (
            <div key={`sumit-${index}`} className={styles.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                alt=""
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ScreenShots;
