import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  IoSearchSharp,
  IoNotificationsOutline,
  IoTrendingUp,
} from "react-icons/io5";

import {
  IoIosMenu,
  IoIosClose,
} from "react-icons/io";

import {
  FaFire,
  FaTv,
  FaStar,
  FaCompass,
  FaPlay,
} from "react-icons/fa6";

const Navbar = () => {
  const { type } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // CLOSE MOBILE MENU ON ROUTE CHANGE
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // SEARCH
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    type
      ? navigate(`/movies/${type}/${searchQuery}`)
      : navigate(`/movies/sumit/${searchQuery}`);

    setSearchQuery("");
    setShowSearch(false);
    setIsOpen(false);

    localStorage.removeItem("pageno");
  };

  // NAV LINKS
  const navLinks = useMemo(
    () => [
      {
        name: "Home",
        path: "/",
        icon: <FaCompass />,
      },
      {
        name: "Trending",
        path: "/movies/popular",
        icon: <IoTrendingUp />,
      },
      {
        name: "Top Rated",
        path: "/movies/top_rated",
        icon: <FaStar />,
      },
      {
        name: "TV Shows",
        path: "/movies/tv",
        icon: <FaTv />,
      },
      {
        name: "Upcoming",
        path: "/movies/upcoming",
        icon: <FaFire />,
      },
    ],
    []
  );

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/70 shadow-2xl backdrop-blur-3xl"
            : "bg-linear-to-b from-black/95 via-black/60 to-transparent"
        }`}
      >

        {/* GRADIENT GLOW */}
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-r from-red-600/10 via-orange-500/10 to-red-600/10 blur-3xl" />

        <div className="relative mx-auto flex h-18 items-center justify-between px-4 md:px-8 xl:px-12">

          {/* LEFT */}
          <div className="flex items-center gap-10">

            {/* LOGO */}
            <Link
              to="/"
              className="group relative flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-red-600 via-red-500 to-orange-500 shadow-lg shadow-red-600/30 transition-all duration-300 group-hover:scale-110">

                <FaPlay className="text-sm text-white" />

              </div>

              <div>

                <h1 className="text-2xl font-black tracking-tight md:text-3xl">

                  <span className="bg-linear-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">
                    Su
                  </span>

                  <span className="text-white">
                    Movie
                  </span>

                </h1>

                <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-red-500 to-orange-500 transition-all duration-500 group-hover:w-full" />

              </div>

            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden items-center gap-2 xl:flex">

              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black shadow-xl"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >

                    <span className="text-base">
                      {link.icon}
                    </span>

                    {link.name}

                    {!isActive && (
                      <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-red-500 transition-all duration-300 group-hover:w-8" />
                    )}

                  </Link>
                );
              })}

            </div>
          </div>

          {/* SEARCH DESKTOP */}
          <div className="hidden max-w-xl flex-1 px-8 lg:flex">

            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full"
            >

              <IoSearchSharp className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search movies, anime, TV shows..."
                className="h-12 w-full rounded-full border border-white/10 bg-white/5 pl-14 pr-5 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/10"
              />

            </form>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* MOBILE SEARCH */}
            <button
              onClick={() =>
                setShowSearch(!showSearch)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-red-600 lg:hidden"
            >
              <IoSearchSharp />
            </button>

            {/* NOTIFICATION */}
            <button className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/10 md:flex">

              <IoNotificationsOutline />

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-black bg-red-500" />

            </button>

            {/* PROFILE */}
            <button className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1 pr-4 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10 md:flex">

              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="h-9 w-9 rounded-full object-cover"
              />

              <div className="text-left">
                <p className="text-sm font-semibold">
                  Guest
                </p>

                <p className="text-xs text-gray-400">
                  Free Plan
                </p>
              </div>

            </button>

            {/* MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl text-white backdrop-blur-xl transition-all duration-300 hover:bg-red-600 xl:hidden"
            >
              {isOpen
                ? <IoIosClose />
                : <IoIosMenu />}
            </button>

          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            showSearch
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >

          <div className="border-t border-white/10 bg-black/80 px-4 py-4 backdrop-blur-3xl">

            <form
              onSubmit={handleSearchSubmit}
              className="relative"
            >

              <IoSearchSharp className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

              <input
                type="text"
                placeholder="Search movies, TV shows..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none backdrop-blur-xl placeholder:text-gray-500 focus:border-red-500"
              />

            </form>
          </div>
        </div>

      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-999 transition-all duration-500 xl:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        {/* BACKDROP */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        />

        {/* SIDEBAR */}
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto border-l border-white/10 bg-black/95 shadow-2xl transition-all duration-500 ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* HEADER */}
          <div className="relative overflow-hidden border-b border-white/10 p-6">

            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-600/20 blur-3xl" />

            <div className="relative flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-red-600 to-orange-500">

                  <FaPlay className="text-white" />

                </div>

                <div>

                  <h2 className="text-2xl font-black text-white">
                    SuMovie
                  </h2>

                  <p className="text-sm text-gray-400">
                    Premium Streaming UI
                  </p>

                </div>

              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-all duration-300 hover:bg-red-600"
              >
                <IoIosClose />
              </button>

            </div>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-2 p-5">

            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >

                  <span className="text-xl transition-transform duration-300 group-hover:scale-125">
                    {link.icon}
                  </span>

                  {link.name}

                </Link>
              );
            })}

          </div>

          {/* FOOTER */}
          <div className="p-5">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-red-600/20 via-white/5 to-orange-500/10 p-5 backdrop-blur-2xl">

              <div className="mb-3 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-xl text-white">

                  <FaFire />

                </div>

                <div>

                  <p className="text-sm text-gray-300">
                    Trending Platform
                  </p>

                  <h3 className="text-xl font-black text-white">
                    SuMovie
                  </h3>

                </div>

              </div>

              <p className="text-sm leading-relaxed text-gray-400">
                Watch unlimited movies, anime and TV
                shows with cinematic UI and ultra-fast
                streaming experience.
              </p>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;