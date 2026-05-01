import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import {
  FaStar,
  FaPlay,
  FaClock,
  FaCalendar,
  FaCircleCheck,
} from "react-icons/fa6";

import { Config } from "../../config/Config.js";

import Moviedetail from "../movieDetail/Moviedetail.jsx";
import Trailer from "../../components/trailer/Trailer.jsx";
import Cast from "../../components/cast/Cast.jsx";
import ScreenShots from "../../components/screenshots/ScreenShots.jsx";

const MovieInfo = () => {
  const { id, type: routeType } = useParams();
  const { pathname } = useLocation();

  const [movie, setMovie] = useState(null);
  const [watchProviders, setWatchProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [is18Plus, setIs18Plus] = useState(false);

  const apiKey = Config.apiKey;

  // =========================
  // AUTO DETECT TYPE (SAFE)
  // =========================
  const type =
    routeType || (pathname.includes("/tv") ? "tv" : "movie");

  // =========================
  // API URLS
  // =========================
  const baseUrl =
    type === "tv"
      ? `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
      : `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  const providerUrl =
    type === "tv"
      ? `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;

  const releaseDatesUrl =
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`
      : null;

  // =========================
  // SCROLL TOP
  // =========================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const requests = [
          axios.get(baseUrl),
          axios.get(providerUrl),
        ];

        if (releaseDatesUrl) {
          requests.push(axios.get(releaseDatesUrl));
        }

        const responses = await Promise.all(requests);

        const mainData = responses[0].data;
        const providerData = responses[1].data;

        setMovie(mainData);

        // =========================
        // WATCH PROVIDERS
        // =========================
        const providers = providerData?.results?.IN || {};
        setWatchProviders(providers.flatrate || []);

        // =========================
        // 18+ CHECK (MOVIE ONLY)
        // =========================
        if (type === "movie" && responses[2]) {
          const releaseDates = responses[2].data.results || [];

          const is18 = releaseDates.some((item) =>
            item.release_dates?.some((date) => {
              const cert = (date.certification || "").toLowerCase();
              return ["18", "r", "x", "nc-17"].includes(cert);
            })
          );

          setIs18Plus(is18);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-20 text-center text-red-500">
        Error: {error}
      </p>
    );
  }

  if (!movie) return null;

  // =========================
  // SAFE VALUES
  // =========================
  const title = movie?.name || movie?.title;

  const date =
    type === "tv"
      ? movie?.first_air_date
      : movie?.release_date;

  const runtime =
    type === "tv"
      ? `${movie?.number_of_seasons || 1} Seasons`
      : `${movie?.runtime || 0} min`;

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="h-full w-full object-cover"
          alt={title}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-10">

          <div className="flex flex-col md:flex-row gap-8">

            {/* POSTER */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="hidden md:block w-[220px] rounded-2xl shadow-2xl"
              alt={title}
            />

            {/* INFO */}
            <div className="max-w-3xl">

              {/* TAGS */}
              <div className="flex gap-3 flex-wrap mb-4">

                <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                  {type === "tv"
                    ? "TV SHOW"
                    : is18Plus
                    ? "18+"
                    : "MOVIE"}
                </span>

                <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <FaStar />
                  {movie.vote_average?.toFixed(1)}
                </span>

              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl font-black">
                {title}
              </h1>

              {/* META */}
              <div className="flex gap-4 mt-4 text-gray-300 flex-wrap">

                <span className="flex items-center gap-2">
                  <FaCalendar /> {date}
                </span>

                <span className="flex items-center gap-2">
                  <FaClock /> {runtime}
                </span>

                <span className="flex items-center gap-2">
                  <FaCircleCheck /> {movie.status}
                </span>

              </div>

              {/* OVERVIEW */}
              <p className="mt-6 text-gray-300">
                {movie.overview}
              </p>

              {/* BUTTON */}
              <div className="mt-6">
                <Link to={`/watch/${id}`}>
                  <button className="bg-red-600 px-6 py-3 rounded-xl flex items-center gap-2">
                    <FaPlay /> Watch Now
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-10 py-10">

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Trailer</h2>
          <Trailer id={id} type={type} />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Cast</h2>
          <Cast id={id} type={type} limit={10} />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Screenshots</h2>
          <ScreenShots id={id} type={type} limit={5} />
        </section>

        <section>
          <Moviedetail similar={id} type={type} />
        </section>

      </div>
    </div>
  );
};

export default MovieInfo;