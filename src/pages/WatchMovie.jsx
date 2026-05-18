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
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* BACKDROP GLOW */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-red-600/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >

          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center">
              <Clapperboard className="w-5 h-5 text-red-500" />
            </div>

            <p className="text-xs tracking-[0.35em] uppercase text-gray-400">
              Now Playing
            </p>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Watch Instantly
          </h1>

          <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl">
            Stream movies seamlessly with optimized servers and smooth playback.
          </p>

        </motion.div>

        {/* PLAYER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl bg-black border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
        >

          {/* TOP BAR */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-black/80 to-transparent">

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />

              <div>
                <h2 className="text-sm font-semibold">
                  {servers[activeServer].name}
                </h2>
                <p className="text-xs text-gray-400">
                  {servers[activeServer].quality}
                </p>
              </div>
            </div>

            <span className="hidden sm:flex text-xs text-gray-400 items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Secure Playback
            </span>

          </div>

          {/* VIDEO */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              key={servers[activeServer].url}
              src={servers[activeServer].url}
              title="Movie Player"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

        </motion.div>

        {/* SERVERS */}
        <div className="mt-10">

          <div className="flex items-end justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold">
              Streaming Servers
            </h2>

            <p className="text-xs sm:text-sm text-gray-400">
              Switch anytime for better speed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {servers.map((server, index) => {
              const active = activeServer === index;

              return (
                <button
                  key={server.name}
                  onClick={() => setActiveServer(index)}
                  className={`relative text-left rounded-xl border transition-all duration-300 p-4
                ${active
                      ? "border-red-500/40 bg-[#161616] shadow-lg shadow-red-500/10"
                      : "border-white/5 bg-[#111] hover:border-white/10 hover:bg-[#151515]"
                    }`}
                >

                  {active && (
                    <div className="absolute inset-0 bg-red-500/5 rounded-xl" />
                  )}

                  <div className="relative flex items-center gap-4">

                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${active ? "bg-red-600" : "bg-white/10"}
                  `}>
                      <MonitorPlay className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">
                        {server.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {server.quality}
                      </p>
                    </div>

                    {active && (
                      <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-red-600 text-white">
                        ACTIVE
                      </span>
                    )}

                  </div>

                </button>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
}