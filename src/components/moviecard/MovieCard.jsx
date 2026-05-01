import React from "react";
import { FaStar, FaPlay } from "react-icons/fa6";

const MovieCard = ({ movie }) => {
  const title = movie.title || movie.name;

  const releaseDate =
    movie.release_date || movie.first_air_date || "";

  

  const year = releaseDate
    ? releaseDate.substring(0, 4)
    : "N/A";

  return (
    <div
  className="
    group
    relative
    overflow-hidden
    rounded-2xl
    bg-[#111]
    border border-white/5
    transition-all duration-300
    hover:-translate-y-2
    hover:border-red-500/30
    hover:shadow-2xl hover:shadow-red-500/10

    w-full
    md:w-[200px]
    lg:w-[220px]

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
            h-[220px] sm:h-[260px] md:h-[320px]
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

        {/* PLAY BUTTON */}
        <div
          className="
            absolute inset-0
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition-all duration-300
          "
        >
          <div
            className="
              h-14 w-14
              rounded-full
              bg-red-600/90
              backdrop-blur-md
              flex items-center justify-center
              shadow-lg
              scale-75 group-hover:scale-100
              transition-all duration-300
            "
          >
            <FaPlay className="text-white text-lg ml-1" />
          </div>
        </div>

        {/* RATING */}
        <div
          className="
            absolute top-3 right-3
            flex items-center gap-1
            bg-black/70 backdrop-blur-md
            px-2.5 py-1
            rounded-full
            text-yellow-400
            text-xs font-semibold
          "
        >
          <FaStar className="text-[10px]" />
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      {/* DETAILS */}
      <div className="p-3 md:p-4">
        {/* TITLE */}
        <h2
          className="
            text-sm md:text-base
            font-bold
            text-white
            line-clamp-1
            leading-tight
          "
        >
          {title}

          <span className="text-gray-400 font-medium text-xs md:text-sm">
            {" "}
            ({year})
          </span>
        </h2>

        {/* META */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] md:text-xs text-gray-400">
            {releaseDate}
          </span>

          <span
            className="
              text-[10px]
              md:text-xs
              bg-red-500/10
              text-red-400
              px-2 py-1
              rounded-full
              border border-red-500/20
            "
          >
            HD
          </span>
        </div>

        {/* OVERVIEW */}
        <p
          className="
            mt-3
            text-[11px] md:text-sm
            text-gray-300
            leading-relaxed
            line-clamp-3
          "
        >
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;