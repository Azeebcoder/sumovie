import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlayCircle,
  MonitorPlay,
  ShieldCheck,
  Clapperboard,
} from "lucide-react";

export default function WatchMovie() {
  const { id } = useParams();
  const [activeServer, setActiveServer] = useState(0);

  const servers = useMemo(
    () => [
      {
        name: "VidSrc",
        quality: "4K / Full HD",
        url: `https://vidsrc-embed.ru/embed/movie/${id}`,
      },
      {
        name: "EmbedSU",
        quality: "HD Streaming",
        url: `https://embed.su/embed/movie/${id}`,
      },
      {
        name: "Backup",
        quality: "Fast Server",
        url: `https://vidsrc-embed.ru/embed/movie/${id}`,
      },
    ],
    [id]
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white mt-50">
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
            <Clapperboard className="w-7 h-7 text-white" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Watch Now
            </h1>

            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Stream instantly with multiple servers
            </p>
          </div>
        </motion.div>

        {/* Player */}
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

          {/* Video */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              key={servers[activeServer].url}
              src={servers[activeServer].url}
              title="Movie Player"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
        </motion.div>

        {/* Netflix Style Server List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Servers</h2>

            <p className="text-sm text-gray-400">
              Choose the best streaming server
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
    ${active
                        ? "border-red-500/60 bg-[#1e1e1e] shadow-[0_0_25px_rgba(239,68,68,0.15)]"
                        : "border-white/5 bg-[#171717] hover:border-white/10 hover:bg-[#1d1d1d]"
                      }`}
                  >
                    {/* Glow */}
                    {active && (
                      <div className="absolute inset-0 bg-linear-to-br from-red-500/15 via-transparent to-transparent pointer-events-none" />
                    )}

                    {/* Proper Inner Padding */}
                    <div className="relative flex flex-col gap-6 px-5 py-5 sm:px-6 sm:py-6">

                      {/* Top */}
                      <div className="flex items-center justify-between gap-4">

                        {/* Left Content */}
                        <div className="flex items-center gap-4 min-w-0">

                          {/* Icon */}
                          <div
                            className={`flex items-center justify-center rounded w-14 h-14 shrink-0
            ${active
                                ? "bg-red-600 shadow-lg shadow-red-600/20"
                                : "bg-white/10 group-hover:bg-white/15"
                              }`}
                          >
                            <MonitorPlay className="w-7 h-7 text-white" />
                          </div>

                          {/* Text */}
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                              {server.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                              {server.quality}
                            </p>
                          </div>
                        </div>

                        {/* Playing Badge */}
                        {active && (
                          <div className="shrink-0 rounded-full bg-red-600/90 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white">
                            PLAYING
                          </div>
                        )}
                      </div>

                      {/* Bottom */}
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