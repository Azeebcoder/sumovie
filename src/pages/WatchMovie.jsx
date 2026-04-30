import { useParams } from "react-router-dom";
import { useState } from "react";

export default function WatchMovie() {
  const { id } = useParams();

  // Multiple servers
  const servers = [
    `https://vidsrc-embed.ru/embed/movie/${id}`,
    `https://vidsrc-embed.ru/embed/movie/${id}`,
    `https://embed.su/embed/movie/${id}`,
  ];

  const [currentServer, setCurrentServer] = useState(servers[0]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* PLAYER */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
          {/* Glow */}
          <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-orange-500/5 to-transparent pointer-events-none z-0" />

          {/* Video */}
          <div className="relative aspect-video w-full z-10">
            <iframe
              key={currentServer}
              src={currentServer}
              title="Movie Player"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
        </div>

        {/* Server Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => setCurrentServer(server)}
              className={`px-5 py-3 rounded-xl font-semibold transition duration-300 ${
                currentServer === server
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Server {index + 1}
            </button>
          ))}
        </div>

        {/* Movie Info */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Watch Movie
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-red-600 font-semibold">
                HD
              </span>

              <span>IMDb ID:</span>

              <span className="font-medium text-white">
                {id}
              </span>
            </div>

            {/* Description */}
            <div className="mt-8 bg-zinc-900 border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Overview
              </h2>

              <p className="text-zinc-300 leading-8">
                Enjoy watching your movie in high quality.
                If one server does not work, switch to another
                using the server buttons above.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-5">
                Streaming Info
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-zinc-500">Quality</p>
                  <p className="font-medium">
                    HD / Full HD
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500">Player</p>
                  <p className="font-medium">
                    Embedded Stream
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500">Movie ID</p>
                  <p className="font-medium break-all">
                    {id}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500">Servers</p>
                  <p className="font-medium">
                    {servers.length} Available
                  </p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-5">
              <p className="text-sm text-yellow-300 leading-7">
                If the movie does not load, try changing the
                server. Some providers may be blocked in your
                region or browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}