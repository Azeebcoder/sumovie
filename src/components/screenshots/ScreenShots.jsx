import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './ScreenShots.module.css'

const ScreenShots = ({id}) => {
  const [images, setImages] = useState(null);
  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";
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
