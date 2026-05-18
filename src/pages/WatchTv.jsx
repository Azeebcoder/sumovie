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
  <div className="min-h-screen bg-[#0b0b0b] text-white">

    {/* BACKDROP GLOW */}
    <div className="fixed inset-0 -z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-red-600/10 blur-[120px]" />
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16">

      {/* HEADER */}
      <motion.div className="mb-10">

        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center">
            <Tv className="w-5 h-5 text-red-500" />
          </div>

          <p className="text-xs tracking-[0.35em] uppercase text-gray-400">
            TV Streaming
          </p>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black">
          Watch Episodes
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl">
          Select season, episode and enjoy seamless streaming experience.
        </p>

      </motion.div>

      {/* PLAYER */}
      <motion.div className="relative overflow-hidden rounded-2xl bg-black border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">

        {/* TOP BAR */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-5 py-3 bg-gradient-to-b from-black/80 to-transparent">

          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />

            <div>
              <h2 className="text-sm font-semibold">
                {servers[activeServer].name}
              </h2>
              <p className="text-xs text-gray-400">
                S{selectedSeason} • EP{selectedEpisode}
              </p>
            </div>
          </div>

          <span className="hidden sm:flex text-xs text-gray-400 items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            Secure Playback
          </span>

        </div>

        {/* IFRAME */}
        <div className="aspect-video bg-black">
          <iframe
            key={servers[activeServer].url}
            src={servers[activeServer].url}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>

      </motion.div>

      {/* SEASONS (COMPACT) */}
      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">Seasons</h2>

        <div className="flex gap-2 flex-wrap">

          {seasons
            .filter((s) => s.season_number !== 0)
            .map((season) => (
              <button
                key={season.id}
                onClick={() => {
                  setSelectedSeason(season.season_number);
                  setSelectedEpisode(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm border transition
                ${
                  selectedSeason === season.season_number
                    ? "bg-red-600 border-red-500"
                    : "bg-[#151515] border-white/10 hover:border-white/20"
                }`}
              >
                S{season.season_number}
              </button>
            ))}

        </div>
      </div>

      {/* EPISODES (SCROLLABLE GRID FEEL) */}
      <div className="mt-10">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            Episodes (S{selectedSeason})
          </h2>

          <p className="text-xs text-gray-400">
            Click to play instantly
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">

          {Array.from({ length: episodes }, (_, i) => i + 1).map((ep) => {
            const active = selectedEpisode === ep;

            return (
              <button
                key={ep}
                onClick={() => setSelectedEpisode(ep)}
                className={`p-3 rounded-lg border text-left transition
                ${
                  active
                    ? "bg-red-600 border-red-500"
                    : "bg-[#151515] border-white/10 hover:border-white/20"
                }`}
              >

                <div className="flex items-center gap-2">

                  <PlayCircle className="w-4 h-4" />

                  <div>
                    <p className="text-sm font-semibold">EP {ep}</p>
                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* SERVERS (MINIMAL SWITCHER) */}
      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">Servers</h2>

        <div className="flex flex-wrap gap-2">

          {servers.map((server, index) => {
            const active = activeServer === index;

            return (
              <button
                key={server.name}
                onClick={() => setActiveServer(index)}
                className={`px-4 py-2 rounded-lg text-sm border transition
                ${
                  active
                    ? "bg-red-600 border-red-500"
                    : "bg-[#151515] border-white/10 hover:border-white/20"
                }`}
              >
                {server.name}
              </button>
            );
          })}

        </div>

      </div>

    </div>
  </div>
);
}