import React from "react";
import { FaStar, FaPlay } from "react-icons/fa6";

const MovieCard = ({ movie }) => {
  const title = movie.title || movie.name;

  const releaseDate =
    movie.release_date || movie.first_air_date || "";

  const year = releaseDate ? releaseDate.substring(0, 4) : "N/A";

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl bg-[#111]
        border border-white/5
        transition-all duration-300
        hover:-translate-y-2
        hover:border-red-500/30
        hover:shadow-2xl hover:shadow-red-500/10

        /* ✅ FIXED RESPONSIVE WIDTH */
        w-[150px] sm:w-[170px] md:w-[200px] lg:w-[230px]

        flex-shrink-0
      "
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
          className="
            w-full
            h-[180px] sm:h-[220px] md:h-[300px]
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

        {/* PLAY BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">

          <div className="
            h-12 w-12 sm:h-14 sm:w-14
            rounded-full bg-red-600/90
            flex items-center justify-center
            backdrop-blur-md
            scale-75 group-hover:scale-100
            transition
          ">
            <FaPlay className="text-white text-sm sm:text-lg ml-1" />
          </div>

        </div>

        {/* RATING */}
        <div className="
          absolute top-2 right-2
          flex items-center gap-1
          bg-black/70 backdrop-blur-md
          px-2 py-0.5
          rounded-full
          text-yellow-400
          text-[10px] sm:text-xs
          font-semibold
        ">
          <FaStar className="text-[10px]" />
          {movie.vote_average?.toFixed(1)}
        </div>

      </div>

      {/* DETAILS */}
      <div className="p-2 sm:p-3">

        {/* TITLE */}
        <h2 className="
          text-xs sm:text-sm md:text-base
          font-bold text-white
          line-clamp-1
        ">
          {title}

          <span className="text-gray-400 text-[10px] sm:text-xs font-medium">
            {" "}({year})
          </span>
        </h2>

        {/* META */}
        <div className="flex items-center justify-between mt-1 sm:mt-2">

          <span className="text-[10px] sm:text-xs text-gray-400">
            {releaseDate}
          </span>

          <span className="
            text-[9px] sm:text-xs
            bg-red-500/10 text-red-400
            px-2 py-0.5 rounded-full
            border border-red-500/20
          ">
            HD
          </span>

        </div>

        {/* OVERVIEW */}
        <p className="
          mt-2
          text-[10px] sm:text-xs md:text-sm
          text-gray-300
          leading-relaxed
          line-clamp-2 sm:line-clamp-3
        ">
          {movie.overview}
        </p>

      </div>
    </div>
  );
};

export default MovieCard;