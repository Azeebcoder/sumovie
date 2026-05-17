import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import {
  PlayCircle,
  MonitorPlay,
  ShieldCheck,
  Clapperboard,
  Tv,
} from "lucide-react";

export default function WatchTV() {
  const { id } = useParams();

  const [activeServer, setActiveServer] = useState(0);

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
const API_KEY = import.meta.env.VITE_API_KEY;
  // Fetch TV Details
  useEffect(() => {
    const fetchTV = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
        );

        setSeasons(res.data.seasons || []);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTV();
  }, [id]);

  // Active Season Episodes
  const currentSeason = seasons.find(
    (s) => s.season_number === selectedSeason
  );

  const episodes = currentSeason?.episode_count || 0;

  // Streaming Servers
  const servers = useMemo(
    () => [
      {
        name: "VidSrc",
        quality: "4K / Full HD",
        url: `https://vidsrc-embed.ru/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`,
      },
      {
        name: "EmbedSU",
        quality: "HD Streaming",
        url: `https://embed.su/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`,
      },
      {
        name: "Backup",
        quality: "Fast Server",
        url: `https://vidsrc-embed.ru/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`,
      },
    ],
    [id, selectedSeason, selectedEpisode]
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white mt-10">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-125 bg-linear-to-b from-red-900/20 to-transparent" />
      </div>

      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center">
            <Tv className="w-7 h-7 text-white" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Watch TV Show
            </h1>

            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Stream episodes instantly
            </p>
          </div>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl bg-black shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Top Overlay */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-7 py-4 bg-linear-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

              <div>
                <h2 className="font-semibold text-lg">
                  {servers[activeServer].name}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300">
                  {servers[activeServer].quality}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Secure Streaming
            </div>
          </div>

          {/* Iframe */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              key={servers[activeServer].url}
              src={servers[activeServer].url}
              title="TV Player"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
        </motion.div>

        {/* Season Selector */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Seasons</h2>

          <div className="flex flex-wrap gap-3">
            {seasons
              .filter((season) => season.season_number !== 0)
              .map((season) => (
                <button
                  key={season.id}
                  onClick={() => {
                    setSelectedSeason(season.season_number);
                    setSelectedEpisode(1);
                  }}
                  className={`px-5 py-3 rounded-xl border transition-all
                    ${
                      selectedSeason === season.season_number
                        ? "bg-red-600 border-red-500"
                        : "bg-[#1b1b1b] border-white/10 hover:border-white/20"
                    }
                  `}
                >
                  Season {season.season_number}
                </button>
              ))}
          </div>
        </div>

        {/* Episodes */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Episodes - Season {selectedSeason}
            </h2>

            <p className="text-sm text-gray-400">
              Select episode to play
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: episodes }, (_, i) => i + 1).map(
              (episode) => {
                const active = selectedEpisode === episode;

                return (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    key={episode}
                    onClick={() => setSelectedEpisode(episode)}
                    className={`p-4 rounded-xl border transition-all text-left
                      ${
                        active
                          ? "bg-red-600 border-red-500"
                          : "bg-[#1b1b1b] border-white/10 hover:border-white/20"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center
                          ${
                            active
                              ? "bg-white/20"
                              : "bg-white/10"
                          }
                        `}
                      >
                        <PlayCircle className="w-5 h-5" />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          EP {episode}
                        </h3>

                        <p className="text-xs text-gray-300">
                          Watch Episode
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              }
            )}
          </div>
        </div>

        {/* Servers */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Servers</h2>

            <p className="text-sm text-gray-400">
              Choose streaming server
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {servers.map((server, index) => {
              const active = activeServer === index;

              return (
                <motion.button
                  key={server.name}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveServer(index)}
                  className="w-full p-2 sm:p-3"
                >
                  <div
                    className={`group relative overflow-hidden rounded border transition-all duration-300
                    ${
                      active
                        ? "border-red-500/60 bg-[#1e1e1e] shadow-[0_0_25px_rgba(239,68,68,0.15)]"
                        : "border-white/5 bg-[#171717] hover:border-white/10 hover:bg-[#1d1d1d]"
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-linear-to-br from-red-500/15 via-transparent to-transparent pointer-events-none" />
                    )}

                    <div className="relative flex flex-col gap-6 px-5 py-5 sm:px-6 sm:py-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className={`flex items-center justify-center rounded w-14 h-14 shrink-0
                            ${
                              active
                                ? "bg-red-600 shadow-lg shadow-red-600/20"
                                : "bg-white/10"
                            }`}
                          >
                            <MonitorPlay className="w-7 h-7 text-white" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                              {server.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                              {server.quality}
                            </p>
                          </div>
                        </div>

                        {active && (
                          <div className="shrink-0 rounded-full bg-red-600/90 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white">
                            PLAYING
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <PlayCircle className="w-4 h-4 text-red-400" />
                          <span>Fast streaming</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MonitorPlay className="w-4 h-4 text-red-400" />
                          <span>Fullscreen support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}