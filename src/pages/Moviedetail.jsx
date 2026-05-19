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

import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { Config } from "../config/Config";

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
          .slice(0, 25);

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
    <div className="min-h-screen bg-black text-white pt-24 pb-20">

      {/* HEADER */}
      <div className="px-4 md:px-10 mb-12">

        {/* TOP BADGE LINE */}
        <div className="flex items-center gap-3 mb-3">

          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-red-500 backdrop-blur-md">
            {type === "tv" ? <FaTv /> : <FaFilm />}
          </div>

          <p className="text-xs tracking-[0.35em] uppercase text-gray-400">
            {search
              ? "Search Results"
              : similar
                ? "Recommended Content"
                : "Browse Collection"}
          </p>

        </div>

        {/* TITLE BLOCK */}
        <div className="relative">

          {/* subtle glow line */}
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-red-500 to-transparent rounded-full" />

          <div className="pl-4">

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">

              {search
                ? `“${search}”`
                : similar
                  ? `Similar ${type === "tv" ? "Shows" : "Movies"}`
                  : type === "tv"
                    ? "TV Shows Collection"
                    : "Movies Collection"}

            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-400 max-w-xl">
              Discover hand-picked entertainment tailored for your viewing experience.
            </p>

          </div>

        </div>

      </div>

      {/* CONTENT WRAPPER */}
      <div className="w-full flex justify-center px-4">

        <div className="w-full max-w-7xl">

          {/* GRID */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">

            {loading ? (

              <div className="col-span-full flex min-h-[60vh] flex-col items-center justify-center">

                {/* SPINNER */}
                <div className="relative flex items-center justify-center">

                  <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />

                  <div className="absolute h-20 w-20 animate-ping rounded-full border border-red-500/20" />

                </div>

                <p className="mt-4 animate-pulse text-sm text-gray-400">
                  Loading cinematic universe...
                </p>

              </div>

            ) : (

              movieList.map((movie, index) => {

                const linkType =
                  movie.name ? "tv" : "movie";

                return (
                  <MovieCard key={movie.id} movie={movie} type={linkType} index={index} total={movieList.length} /> 
                );
              })

            )}

          </div>
        </div>

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center px-4">

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md p-2 rounded-2xl">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-2 hover:bg-white/10 rounded-xl transition"
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
                  className={`h-10 w-10 rounded-xl font-medium transition
                  ${currentPage === page
                      ? "bg-red-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="p-2 hover:bg-white/10 rounded-xl transition"
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