import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaArrowRight,
  FaFilm,
  FaStar,
  FaFire,
  FaTv,
} from "react-icons/fa6";

import MovieCard from "../../components/moviecard/MovieCard";
import SkeletonCard from "../../components/SkeletonCard";
import { Config } from "../../config/Config";

const Moviedetail = ({ search, similar, type: propType }) => {
  const { type: routeType } = useParams();
  const type = propType || routeType;

  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const apiKey = Config.apiKey;

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("pageno");
    return saved ? parseInt(saved, 10) : 1;
  });

  const prevTypeRef = useRef();

  // ========================
  // NORMALIZE DATA
  // ========================
  const normalize = (item, isTV) => {
    return {
      ...item,
      title: isTV ? item.name : item.title,
      release_date: isTV ? item.first_air_date : item.release_date,
    };
  };

  // ========================
  // FETCH DATA
  // ========================
  const fetchData = async (page) => {
    try {
      setLoading(true);

      let url = "";

      // ========================
      // 🔥 SEARCH (MOVIE + TV)
      // ========================
      if (search) {
        const [movieRes, tvRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}&page=${page}`
          ),
        ]);

        const movies = movieRes.data.results.map((m) =>
          normalize(m, false)
        );

        const tv = tvRes.data.results.map((t) =>
          normalize(t, true)
        );

        const combined = [...movies, ...tv]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 24);

        setMovieList(combined);

        setTotalResults(
          movieRes.data.total_results + tvRes.data.total_results
        );

        setTotalPages(
          Math.ceil(
            (movieRes.data.total_results +
              tvRes.data.total_results) /
            24
          )
        );

        setLoading(false);
        return;
      }

      // ========================
      // SIMILAR (MOVIE ONLY)
      // ========================
      if (similar) {
        url = `https://api.themoviedb.org/3/${type}/${similar}/recommendations?api_key=${apiKey}&page=${page}`;
      }
      // ========================
      // TV
      // ========================
      else if (type === "tv") {
        url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`;
      }
      // ========================
      // BOLLYWOOD
      // ========================
      else if (type === "bollywood") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&with_original_language=hi&page=${page}`;
      }
      // ========================
      // MOVIES (POPULAR, TOP_RATED, ETC)
      // ========================
      else {
        url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&page=${page}`;
      }

      const res = await axios.get(url);

      const isTV = type === "tv";

      const data = res.data.results
        .map((m) => normalize(m, isTV))
        .slice(0, 24);

      setMovieList(data);
      setTotalResults(res.data.total_results);

      setTotalPages(Math.ceil(res.data.total_results / 24));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // EFFECT
  // ========================
  useEffect(() => {
    fetchData(currentPage);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type, currentPage, search, similar]);

  // reset page
  useEffect(() => {
    const valid = ["popular", "top_rated", "upcoming", "tv", "bollywood"];

    if (
      prevTypeRef.current &&
      valid.includes(prevTypeRef.current) &&
      prevTypeRef.current !== type
    ) {
      localStorage.removeItem("pageno");
      setCurrentPage(1);
    }

    prevTypeRef.current = type;
  }, [type]);

  useEffect(() => {
    localStorage.setItem("pageno", currentPage);
  }, [currentPage]);

  // ========================
  // UI
  // ========================
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">

      {/* HEADER */}
      <div className="mb-8 px-4 md:px-8 flex items-center gap-4">
        <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-linear-to-r from-red-600 to-pink-500 text-2xl">
          {type === "tv" ? <FaTv /> : <FaFilm />}
        </div>

        <div>
          <h1 className="text-2xl md:text-4xl font-black">
            {search
              ? `Results for "${search}"`
              : type === "tv"
                ? "Similar TV Shows"
                : "Similar Movies"}
          </h1>

          <p className="text-gray-400 text-sm">
            Movies + TV Shows supported
          </p>
        </div>
      </div>

     {/* GRID */}
<div className="w-[80%] flex justify-center px-2 sm:px-4 md:px-6 m-auto">
  <div className="
  w-full 
  max-w-325
  grid 
  grid-cols-2 
  sm:grid-cols-3 
  md:grid-cols-4 
  lg:grid-cols-5 

  gap-3 
  sm:gap-4 
  md:gap-5 
  lg:gap-6
">

    {loading ? (
      <div className="col-span-full">
        <SkeletonCard cards={10} />
      </div>
    ) : (
      movieList.map((movie, index) => {

        const isTv = type === "tv";
        const linkType = isTv ? "tv" : "movie";

        return (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.015,
            }}
            className="w-full flex justify-center"
          >
            <Link to={`/${linkType}/${movie.id}`}>
              {/* 🔥 make card slightly bigger on mobile */}
              <div className="w-full sm:w-full scale-[1.03] sm:scale-100">
                <MovieCard movie={movie} />
              </div>
            </Link>
          </motion.div>
        );
      })
    )}

  </div>
</div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-14 flex justify-center">
          <div className="flex items-center gap-2 bg-[#111] p-2 rounded-2xl border border-white/10">

            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
            >
              <FaArrowLeft />
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let page =
                currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

              if (page < 1 || page > totalPages) return null;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-xl ${currentPage === page
                    ? "bg-red-600"
                    : "bg-white/5"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
            >
              <FaArrowRight />
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Moviedetail;