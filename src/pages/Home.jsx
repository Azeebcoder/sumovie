import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  FaStar,
  FaPlay,
  FaFire,
  FaTv,
  FaFilm,
  FaArrowRight,
} from "react-icons/fa6";

import {
  HiSparkles,
  HiTrendingUp,
} from "react-icons/hi";

import {
  IoPlayCircle,
  IoInformationCircleOutline,
} from "react-icons/io5";

import { motion } from "framer-motion";

import MovieDetailRow from "../components/MovieDetailRow";
import { Config } from "../config/Config";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [trending, setTrending] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);

  const apiKey = Config.apiKey;

  // API URLS
  const popularMoviesUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    [apiKey]
  );

  const trendingUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
    [apiKey]
  );

  const tvUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    [apiKey]
  );

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [popularRes, trendingRes, tvRes] =
          await Promise.all([
            axios.get(popularMoviesUrl),
            axios.get(trendingUrl),
            axios.get(tvUrl),
          ]);

        setMovieList(popularRes.data.results || []);
        setTrending(trendingRes.data.results || []);
        setTvShows(tvRes.data.results || []);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [popularMoviesUrl, trendingUrl, tvUrl]);

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />

          <div className="absolute inset-0 animate-ping rounded-full border border-red-500/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">

      {/* HERO */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden bg-black"
      >
        {/* TOP GRADIENT */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-32 w-full bg-gradient-to-b from-black to-transparent" />

        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          transitionTime={600}
          swipeable
          emulateTouch
          stopOnHover={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          preventMovementUntilSwipeScrollTolerance
          swipeScrollTolerance={40}
          className="hero-carousel"
        >
          {movieList.slice(0, 8).map((movie, index) => (
            <div
              key={movie.id}
              className="relative h-[68vh] sm:h-[78vh] md:h-[92vh] overflow-hidden"
            >
              {/* BACKDROP */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: "scale(1.04)",
                  willChange: "transform",
                }}
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-black/45" />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

              {/* CONTENT */}
              <div className="absolute inset-0 z-10 flex items-end">
                <div className="w-full px-4 pb-8 sm:px-8 md:px-14 md:pb-16">

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                    className="max-w-3xl"
                  >
                    {/* BADGES */}
                    <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">

                      <span className="flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white sm:px-4 sm:py-2 sm:text-xs">
                        <FaFire />
                        Trending
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                        4K Ultra HD
                      </span>

                      <span className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-[11px] text-yellow-300 sm:px-4 sm:py-2 sm:text-xs">
                        <FaStar />
                        {movie.vote_average?.toFixed(1)}
                      </span>

                    </div>

                    {/* TITLE */}
                    <h1 className="max-w-4xl text-left text-3xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
                      {movie.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-gray-300 sm:block md:text-base text-left">
                      {movie.overview?.slice(0, 190)}...
                    </p>

                    {/* META */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-gray-300 sm:text-sm md:text-base">

                      <span className="font-medium text-white">
                        {movie.release_date?.split("-")[0]}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-red-500" />

                      <span>Action</span>

                      <span className="h-1 w-1 rounded-full bg-red-500" />

                      <span>Adventure</span>

                      <span className="h-1 w-1 rounded-full bg-red-500" />

                      <span>Movie</span>

                    </div>

                    {/* BUTTONS */}
                    <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">

                      <Link to={`/movie/${movie.id}`}>
                        <button className="group flex items-center gap-3 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-500 active:scale-95 sm:px-7 sm:text-base">

                          <IoPlayCircle className="text-2xl transition-transform duration-300 group-hover:scale-110" />

                          Watch Now

                        </button>
                      </Link>

                      <Link to={`/movie/${movie.id}`}>
                        <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-95 sm:px-7 sm:text-base">

                          <IoInformationCircleOutline className="text-2xl" />

                          More Info

                        </button>
                      </Link>

                    </div>
                  </motion.div>
                </div>
              </div>

              {/* BOTTOM FADE */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* EXPLORE SECTION */}
      <section className="px-4 sm:px-6 md:px-10 mt-14">

        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-red-500">
              Discover
            </p>

            <h2 className="mt-2 text-3xl md:text-5xl font-black text-white">
              Explore Categories
            </h2>
          </div>

          <Link
            to="/movies/popular"
            className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            Explore All
            <HiTrendingUp />
          </Link>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* BIG FEATURE CARD */}
          <Link
            to="/movies/popular"
            className="group relative overflow-hidden rounded-3xl lg:col-span-7 aspect-video"
          >
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070"
              alt="Trending"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
                <HiTrendingUp />
              </div>

              <p className="text-xs uppercase tracking-[0.3em] text-red-400">
                Most Watched
              </p>

              <h3 className="mt-2 text-3xl md:text-5xl font-black text-white">
                Trending Today
              </h3>

              <p className="mt-3 max-w-md text-sm md:text-base text-white/80">
                Explore the hottest movies everyone is watching right now.
              </p>

            </div>
          </Link>

          {/* SIDE GRID */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-5">

            {[
              {
                title: "TV Shows",
                subtitle: "Binge Series",
                icon: <FaTv />,
                link: "/movies/tv",
                image:
                  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=2070",
              },
              {
                title: "Top Rated",
                subtitle: "Best IMDb",
                icon: <FaStar />,
                link: "/movies/top_rated",
                image:
                  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070",
              },
              {
                title: "New & Hot",
                subtitle: "Latest Releases",
                icon: <HiSparkles />,
                link: "/movies/upcoming",
                image:
                  "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=2070",
              },
              {
                title: "Movies",
                subtitle: "Cinema World",
                icon: <FaFilm />,
                link: "/movies/popular",
                image:
                  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2070",
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group relative overflow-hidden rounded-2xl aspect-4/3"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition" />

                <div className="absolute inset-0 p-4 flex flex-col justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-300">
                      {item.subtitle}
                    </p>

                    <h3 className="text-lg font-black text-white">
                      {item.title}
                    </h3>
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>
      {/* TRENDING TODAY */}
      <section className="px-4 pt-14 sm:px-6 md:px-10">

        {/* HEADER */}
        <div className="mb-7 flex items-end justify-between">

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Trending Today
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Most watched movies right now
            </p>
          </div>

        </div>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* MAIN SPOTLIGHT */}
          <div className="lg:col-span-8">

            {trending[0] && (
              <Link
                to={`/movie/${trending[0].id}`}
                className="group relative block"
              >

                <div className="relative overflow-hidden rounded-3xl aspect-video border border-white/10 shadow-2xl">

                  <img
                    src={`https://image.tmdb.org/t/p/w1280${trending[0].backdrop_path || trending[0].poster_path
                      }`}
                    alt={trending[0].title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* CINEMATIC LAYERED OVERLAY */}
                  <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">

                    <p className="text-xs uppercase tracking-[0.35em] text-red-400">
                      #1 Trending Now
                    </p>

                    <h3 className="mt-2 text-3xl md:text-5xl font-black text-white leading-tight">
                      {trending[0].title}
                    </h3>

                    <div className="mt-4 flex items-center gap-5 text-sm text-gray-300">

                      <span className="flex items-center gap-1 text-yellow-400 font-medium">
                        <FaStar />
                        {trending[0].vote_average?.toFixed(1)}
                      </span>

                      <span>
                        {trending[0].release_date?.slice(0, 4)}
                      </span>

                    </div>

                    <button className="mt-6 flex items-center gap-2 w-fit rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition">
                      <FaPlay />
                      Watch Now
                    </button>

                  </div>

                </div>

              </Link>
            )}

          </div>

          {/* SIDE RAIL */}
          <div className="lg:col-span-4 space-y-3">

            {trending.slice(1, 6).map((movie, index) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group flex gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-2 transition-all duration-300"
              >

                {/* POSTER */}
                <div className="relative w-20 h-28 shrink-0 overflow-hidden rounded-xl">

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* rank */}
                  <div className="absolute top-1 left-1 h-5 w-5 flex items-center justify-center rounded-full bg-black/70 text-[10px] text-white border border-white/10 backdrop-blur-md">
                    {index + 2}
                  </div>

                </div>

                {/* INFO */}
                <div className="flex flex-col justify-center">

                  <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-red-400 transition">
                    {movie.title}
                  </h4>

                  <div className="mt-1 text-xs text-gray-400 flex items-center gap-3">

                    <span className="text-yellow-400 flex items-center gap-1">
                      <FaStar />
                      {movie.vote_average?.toFixed(1)}
                    </span>

                    <span>
                      {movie.release_date?.slice(0, 4)}
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>
      {/* CONTENT ROWS */}
      <section className="mt-14">
        <MovieDetailRow type="popular" />
      </section>

      <section className="mt-14">
        <MovieDetailRow type="upcoming" />
      </section>

      <section className="mt-14">
        <MovieDetailRow type="top_rated" />
      </section>

      <section className="mt-14">
        <MovieDetailRow type="tv" />
      </section>

      <section className="mt-14 pb-20">
        <MovieDetailRow type="bollywood" />
      </section>

    </div>
  );
};

export default Home;