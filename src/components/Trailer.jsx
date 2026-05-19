import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaPlay,
  FaYoutube,
} from "react-icons/fa6";

import { Config } from "../config/Config";

const Trailer = ({ id, type }) => {

  const [trailerKey, setTrailerKey] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const apiKey = Config.apiKey;

  useEffect(() => {

    const fetchTrailer = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`
        );

        const trailer =
          res.data.results.find(
            (video) =>
              video.type === "Trailer" &&
              video.site === "YouTube"
          ) ||
          res.data.results.find(
            (video) =>
              video.site === "YouTube"
          );

        if (trailer) {
          setTrailerKey(trailer.key);
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchTrailer();

  }, [id, type, apiKey]);

  return (
    <div className="relative w-full">

      {/* GLOW */}
      <div className="absolute inset-0 rounded-[32px] bg-red-600/10 blur-3xl" />

      {/* CONTAINER */}
      <div
        className="
          relative overflow-hidden
          rounded-[28px]
          border border-white/10
          bg-black/40
          shadow-2xl
          backdrop-blur-2xl
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            border-b border-white/10
            px-4 py-4 md:px-6
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl
                bg-red-600/20
                text-red-500
              "
            >

              <FaYoutube className="text-xl" />

            </div>

            <div>

              <h2 className="text-lg font-bold text-white md:text-xl">
                Official Trailer
              </h2>

              <p className="text-xs text-gray-400 md:text-sm">
                Watch cinematic preview
              </p>

            </div>

          </div>

          {/* LIVE BADGE */}
          <div
            className="
              hidden items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/10
              px-3 py-1
              text-xs text-red-300
              md:flex
            "
          >

            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

            Trailer

          </div>

        </div>

        {/* VIDEO */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">

          {loading ? (

            <div
              className="
                absolute inset-0
                flex flex-col items-center justify-center
                bg-[#050505]
              "
            >

              {/* LOADER */}
              <div className="relative">

                <div
                  className="
                    h-16 w-16 animate-spin
                    rounded-full
                    border-4 border-red-600
                    border-t-transparent
                  "
                />

                <div
                  className="
                    absolute inset-0
                    animate-ping rounded-full
                    border border-red-500/30
                  "
                />

              </div>

              <p className="mt-5 text-sm text-gray-400">
                Loading trailer...
              </p>

            </div>

          ) : trailerKey ? (

            <>
              {/* IFRAME */}
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="
                  absolute inset-0
                  h-full w-full
                "
              />

              {/* TOP SHADOW */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />

              {/* BOTTOM SHADOW */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

            </>

          ) : (

            <div
              className="
                absolute inset-0
                flex flex-col items-center justify-center
                bg-[#070707]
                px-6 text-center
              "
            >

              <div
                className="
                  flex h-20 w-20 items-center justify-center
                  rounded-full
                  bg-white/5
                  text-gray-500
                "
              >

                <FaPlay className="ml-1 text-2xl" />

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Trailer Not Available
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-400">
                This movie or TV show currently has no
                official trailer available.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default Trailer;