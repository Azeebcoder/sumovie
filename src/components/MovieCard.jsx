import React from "react";
import {
  FaStar,
  FaPlay,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const title =
    movie.title || movie.name;

  const releaseDate =
    movie.release_date ||
    movie.first_air_date ||
    "";

  const year = releaseDate
    ? releaseDate.substring(0, 4)
    : "N/A";

  return (
  <Link
  to={`/${movie.name ? "tv" : "movie"}/${movie.id}`}
  className="block h-full"
>

  <div
    className="
      group relative flex h-full cursor-pointer flex-col
      overflow-hidden rounded-[26px]
      border border-white/10
      bg-[#0b0f19]
      transition-all duration-500
      hover:-translate-y-2
      hover:border-cyan-400/40
      hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.45)]
    "
  >

    {/* BACKGROUND GLOW */}
    <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">

      <div className="absolute -top-10 left-0 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />

    </div>

    {/* IMAGE */}
    <div className="relative overflow-hidden">

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/500x750/111/FFF?text=No+Image"
        }
        alt={title}
        loading="lazy"
        className="
          aspect-[2/2.6] w-full
          object-cover
          transition-transform duration-700
          group-hover:scale-110
        "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-black/20 to-transparent" />

      {/* TOP BAR */}
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between">

        {/* QUALITY */}
        <div
          className="
            rounded-full
            border border-cyan-400/20
            bg-black/40
            px-2.5 py-1
            text-[9px]
            font-bold uppercase
            tracking-[0.2em]
            text-cyan-300
            backdrop-blur-xl
          "
        >
          4K UHD
        </div>

        {/* RATING */}
        <div
          className="
            flex items-center gap-1
            rounded-full
            border border-yellow-400/20
            bg-black/40
            px-2.5 py-1
            text-[10px]
            font-semibold
            text-white
            backdrop-blur-xl
          "
        >

          <FaStar className="text-yellow-300 text-[9px]" />

          {movie.vote_average?.toFixed(1)}

        </div>

      </div>

      {/* PLAY BUTTON */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div
          className="
            scale-75 opacity-0
            transition-all duration-500
            group-hover:scale-100
            group-hover:opacity-100
          "
        >

          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-full
              border border-white/20
              bg-black/40
              text-white
              backdrop-blur-2xl
            "
          >

            <FaPlay className="ml-1 text-sm" />

          </div>

        </div>

      </div>

    </div>

    {/* CONTENT */}
    <div className="relative z-10 flex flex-1 flex-col p-4">

      {/* TYPE + YEAR */}
      <div className="mb-3 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          <span className="text-[10px] uppercase tracking-[0.25em] text-green-300">

            {movie.name ? "Series" : "Movie"}

          </span>

        </div>

        <span className="text-[11px] text-gray-400">
          {year}
        </span>

      </div>

      {/* TITLE */}
      <h2
        className="
          line-clamp-2
          text-sm font-black
          leading-snug text-white
          transition-colors duration-300
          group-hover:text-cyan-300
          md:text-base
        "
      >
        {title}
      </h2>


      {/* META INFO */}
      <div className="mt-4 flex flex-wrap gap-2">

        <div
          className="
            rounded-full
            bg-white/5
            px-3 py-1
            text-[10px]
            text-gray-300
            border border-white/10
          "
        >
          Action
        </div>

        <div
          className="
            rounded-full
            bg-white/5
            px-3 py-1
            text-[10px]
            text-gray-300
            border border-white/10
          "
        >
          Trending
        </div>

        <div
          className="
            rounded-full
            bg-white/5
            px-3 py-1
            text-[10px]
            text-gray-300
            border border-white/10
          "
        >
          HD
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between">

        {/* LIVE */}
        <div className="flex items-center gap-2">

          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />

          <span className="text-[11px] text-gray-300">
            Popular Now
          </span>

        </div>

        {/* BUTTON */}
        <div
          className="
            flex items-center gap-2
            rounded-xl
            bg-gradient-to-r
            from-cyan-500/20 to-blue-500/20
            px-4 py-2
            text-[11px]
            font-bold
            text-cyan-200
            transition-all duration-300
            group-hover:from-cyan-500/30
            group-hover:to-blue-500/30
          "
        >

          <FaPlay className="text-[10px]" />

          Watch

        </div>

      </div>

    </div>

  </div>

</Link>
  );
};

export default MovieCard;