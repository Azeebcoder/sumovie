import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FaArrowRight, FaFire, FaTv, FaFilm, FaStar } from "react-icons/fa6";
import { Config } from "../config/Config";

const MovieDetailRow = ({ type }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = Config.apiKey;

  const url =
    type === "bollywood"
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&with_original_language=hi`
      : type === "tv"
      ? `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setMovieList(res.data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (error) {
    return (
      <p className="py-10 text-center text-red-500">
        Error: {error}
      </p>
    );
  }

  const section =
    {
      popular: {
        title: "Popular Movies",
        icon: <FaFire />,
        color: "from-red-500 via-red-600 to-orange-500",
      },
      top_rated: {
        title: "Top Rated",
        icon: <FaStar />,
        color: "from-yellow-400 via-amber-500 to-orange-400",
      },
      upcoming: {
        title: "Upcoming Movies",
        icon: <FaFilm />,
        color: "from-purple-500 via-pink-500 to-rose-500",
      },
      tv: {
        title: "TV Shows",
        icon: <FaTv />,
        color: "from-cyan-500 via-blue-500 to-indigo-500",
      },
      bollywood: {
        title: "Bollywood Picks",
        icon: <FaFilm />,
        color: "from-pink-500 via-rose-500 to-red-500",
      },
    }[type] || {
      title: "Discover Movies",
      icon: <FaFilm />,
      color: "from-red-500 to-orange-500",
    };

  return (
    <section className="relative mt-16 px-4 md:px-10">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px]" />
      </div>

      {/* HEADER */}
<div className="relative mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

  {/* LEFT CONTENT */}
  <div className="space-y-4">

    <div className="flex items-center gap-3">
      <div
        className={`h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-r ${section.color} shadow-lg shadow-red-500/20`}
      >
        {section.icon}
      </div>

      <div className="h-[1px] w-16 bg-gradient-to-r from-red-500/70 to-transparent" />
    </div>

    <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white">
      {section.title}
    </h2>

    <p className="text-sm md:text-base text-gray-400 max-w-md">
      Curated picks based on global trends and user interest
    </p>
  </div>

  {/* RIGHT SIDE BUTTON (FIXED ALIGNMENT) */}
  <div className="flex md:justify-end w-full md:w-auto">
    <Link
      to={`/movies/${type}`}
      className="
        group inline-flex items-center gap-2

        px-4 py-2 md:px-5 md:py-3
        rounded-xl md:rounded-full

        border border-white/10
        bg-white/5 backdrop-blur-xl

        transition-all duration-300
        hover:border-red-500/40 hover:bg-red-500/10
        active:scale-95
      "
    >
      <span className="text-xs md:text-sm font-medium text-white whitespace-nowrap">
        View All
      </span>

      <div className="
        flex h-6 w-6 md:h-8 md:w-8
        items-center justify-center
        rounded-full bg-red-500
        transition-transform group-hover:translate-x-1
      ">
        <FaArrowRight className="text-[10px] md:text-xs text-white" />
      </div>
    </Link>
  </div>

</div>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-12 gap-4 auto-rows-[120px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`
                animate-pulse rounded-[2rem] bg-white/5
                ${
                  i === 0 || i === 4
                    ? "col-span-12 md:col-span-6 row-span-3"
                    : i === 2 || i === 5
                    ? "col-span-6 md:col-span-3 row-span-2"
                    : "col-span-6 md:col-span-3 row-span-1"
                }
              `}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-5 auto-rows-[120px]">

          {movieList.slice(0, 8).map((movie, index) => {
            const isTv =
              movie.first_air_date && !movie.release_date;

            const large = index === 0 || index === 4;
            const medium = index === 2 || index === 5;

            const img =
              movie.backdrop_path || movie.poster_path;

            return (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -6 }}
                className={`
                  group relative overflow-hidden rounded-[2.2rem]
                  shadow-[0_10px_40px_rgba(0,0,0,0.5)]

                  ${
                    large
                      ? "col-span-12 md:col-span-6 row-span-3"
                      : medium
                      ? "col-span-6 md:col-span-3 row-span-2"
                      : "col-span-6 md:col-span-3 row-span-1"
                  }
                `}
              >
                <Link to={`/${isTv ? "tv" : "movie"}/${movie.id}`}>

                  {/* IMAGE (FIXED FIT ISSUE) */}
                  <img
                    src={
                      img
                        ? `https://image.tmdb.org/t/p/w780${img}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    className="
                      h-full w-full object-cover object-center
                      transition duration-700
                      group-hover:scale-110
                      group-hover:brightness-110
                    "
                    loading="lazy"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 p-4 md:p-6">

                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
                        Trending
                      </span>

                      <span className="flex items-center gap-1 text-xs text-yellow-400">
                        <FaStar />
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>

                    <h3
                      className={`
                        font-black text-white line-clamp-2
                        ${
                          large
                            ? "text-2xl md:text-4xl"
                            : medium
                            ? "text-lg md:text-2xl"
                            : "text-sm md:text-lg"
                        }
                      `}
                    >
                      {movie.title || movie.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-300">
                      {(movie.release_date ||
                        movie.first_air_date ||
                        "").slice(0, 4)}
                    </p>

                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MovieDetailRow;