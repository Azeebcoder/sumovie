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
  FaHouse,
} from "react-icons/fa6";

// import {
//   FaHouse,
//   FaCompass,
//   FaTv,
//   FaFire,
//   FaStar,
//   FaUser,
// } from "react-icons/fa6";

const Navbar = () => {
  const { type } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] =
    useState(false);
  const [showSuggestions, setShowSuggestions] =
    useState(false);

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoadingSuggestions(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY
          }&query=${searchQuery}`
        );

        const data = await res.json();

        setSuggestions(data.results?.slice(0, 6) || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 350);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
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
                    className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${isActive
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
          <div className="hidden max-w-2xl flex-1 px-8 lg:flex">

            <div className="relative w-full">

              {/* SEARCH BAR */}
              <form
                onSubmit={handleSearchSubmit}
                className="group relative"
              >

                {/* GLOW */}
                <div className="absolute inset-0 rounded-full bg-red-600/10 opacity-0 blur-2xl transition-all duration-500 group-focus-within:opacity-100" />

                <IoSearchSharp className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-xl text-gray-400 transition-all duration-300 group-focus-within:text-red-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  onFocus={() =>
                    setShowSuggestions(true)
                  }
                  onBlur={() =>
                    setTimeout(() => {
                      setShowSuggestions(false);
                    }, 200)
                  }
                  placeholder="Search movies, anime, TV shows..."
                  className="h-13 w-full rounded-full border border-white/10 bg-white/5 pl-14 pr-6 text-sm text-white outline-none backdrop-blur-2xl transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/10"
                />

              </form>

              {/* SUGGESTIONS */}
              <div
                className={`absolute left-0 right-0 top-16 z-50 overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-3xl transition-all duration-300 ${showSuggestions &&
                  searchQuery &&
                  suggestions.length > 0
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
                  }`}
              >

                {/* LOADING */}
                {loadingSuggestions && (
                  <div className="p-5 text-sm text-gray-400">
                    Searching...
                  </div>
                )}

                {/* RESULTS */}
                {!loadingSuggestions &&
                  suggestions.map((item) => (
                    <Link
                      key={item.id}
                      to={`/${item.media_type === "tv"
                        ? "tv"
                        : "movie"
                        }/${item.id}`}
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                      className="group flex items-center gap-4 border-b border-white/5 p-4 transition-all duration-300 hover:bg-white/5"
                    >

                      {/* POSTER */}
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                            : "https://placehold.co/200x300/111/FFF?text=No+Image"
                        }
                        alt={item.title || item.name}
                        className="h-16 w-12 rounded-xl object-cover"
                      />

                      {/* INFO */}
                      <div className="flex-1 text-left">

                        <h3 className="line-clamp-1 text-sm font-semibold text-white transition-all duration-300 group-hover:text-red-400">
                          {item.title || item.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">

                          <span className="capitalize">
                            {item.media_type}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-gray-500" />

                          <span>
                            {(
                              item.release_date ||
                              item.first_air_date ||
                              ""
                            ).split("-")[0]}
                          </span>

                        </div>
                      </div>

                      {/* ARROW */}
                      <div className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <FaPlay className="text-red-500" />
                      </div>

                    </Link>
                  ))}

                {/* EMPTY */}
                {!loadingSuggestions &&
                  searchQuery &&
                  suggestions.length === 0 && (
                    <div className="p-5 text-sm text-gray-400">
                      No results found
                    </div>
                  )}

              </div>
            </div>
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

            

          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${showSearch
            ? "max-h-125 opacity-100 pt-3 pb-6"
            : "max-h-0 opacity-0 pt-0"
            }`}
        >

          {/* SEARCH WRAPPER */}
          <div className="px-4">

            {/* FLOATING SEARCH BOX */}
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-black/70 shadow-2xl backdrop-blur-3xl">

              {/* SEARCH FORM */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative p-3"
              >

                {/* SEARCH ICON */}
                <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2">

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-gray-400">

                    <IoSearchSharp className="text-lg" />

                  </div>

                </div>

                {/* INPUT */}
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  onFocus={() =>
                    setShowSuggestions(true)
                  }
                  onBlur={() =>
                    setTimeout(() => {
                      setShowSuggestions(false);
                    }, 200)
                  }
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-16 pr-5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/[0.07]"
                />

              </form>

              {/* QUICK TAGS */}
              {!searchQuery && (
                <div className="flex gap-2 overflow-x-auto px-3 pb-3">

                  {[
                    "Marvel",
                    "Anime",
                    "Trending",
                    "Netflix",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setSearchQuery(tag)
                      }
                      className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-300 transition-all duration-300 hover:bg-red-600 hover:text-white"
                    >
                      {tag}
                    </button>
                  ))}

                </div>
              )}

              {/* SUGGESTIONS */}
              <div
                className={`overflow-hidden transition-all duration-500 ${showSuggestions &&
                  searchQuery
                  ? "max-h-[350px] opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >

                {/* LOADING */}
                {loadingSuggestions && (
                  <div className="p-5 text-center text-sm text-gray-400">
                    Searching...
                  </div>
                )}

                {/* RESULTS */}
                {!loadingSuggestions &&
                  suggestions.map((item) => (
                    <Link
                      key={item.id}
                      to={`/${item.media_type === "tv"
                        ? "tv"
                        : "movie"
                        }/${item.id}`}
                      onClick={() => {
                        setShowSuggestions(false);
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className="group flex items-center gap-3 border-t border-white/5 px-3 py-3 transition-all duration-300 hover:bg-white/[0.03]"
                    >

                      {/* POSTER */}
                      <div className="overflow-hidden rounded-xl">

                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                              : "https://placehold.co/200x300/111/FFF?text=No+Image"
                          }
                          alt={item.title || item.name}
                          className="h-14 w-10 object-cover transition-all duration-500 group-hover:scale-110"
                        />

                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1 text-left">

                        <h3 className="line-clamp-1 text-sm font-medium text-white transition-all duration-300 group-hover:text-red-400">
                          {item.title || item.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400">

                          <span className="capitalize">
                            {item.media_type}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-gray-500" />

                          <span>
                            {(
                              item.release_date ||
                              item.first_air_date ||
                              ""
                            ).split("-")[0]}
                          </span>

                        </div>
                      </div>

                      {/* PLAY BUTTON */}
                      <div className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20">

                          <FaPlay className="text-xs" />

                        </div>

                      </div>

                    </Link>
                  ))}

                {/* EMPTY */}
                {!loadingSuggestions &&
                  searchQuery &&
                  suggestions.length === 0 && (
                    <div className="p-8 text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gray-400">

                        <IoSearchSharp className="text-xl" />

                      </div>

                      <p className="mt-4 text-sm text-gray-400">
                        No results found
                      </p>

                    </div>
                  )}

              </div>
            </div>
          </div>
        </div>

      </nav>

      {/* MOBILE BOTTOM NAVBAR */}
<div className="fixed bottom-0 left-0 right-0 z-[999] border-t border-white/10 bg-black/80 backdrop-blur-3xl xl:hidden">

  {/* TOP GLOW */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

  <div className="grid grid-cols-5 px-2 py-2">

    {[
      {
        name: "Home",
        path: "/",
        icon: <FaHouse />,
      },
      {
        name: "Trending",
        path: "/movies/popular",
        icon: <FaCompass />,
      },
      {
        name: "TV",
        path: "/movies/tv",
        icon: <FaTv />,
      },
      {
        name: "Hot",
        path: "/movies/upcoming",
        icon: <FaFire />,
      },
      {
        name: "Top",
        path: "/movies/top_rated",
        icon: <FaStar />,
      },
    ].map((item) => {

      const isActive =
        location.pathname === item.path;

      return (
        <Link
          key={item.name}
          to={item.path}
          className="group relative flex flex-col items-center justify-center gap-1 py-2"
        >

          {/* ACTIVE BG */}
          <div
            className={`absolute inset-1 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-white/10"
                : "bg-transparent"
            }`}
          />

          {/* ICON */}
          <div
            className={`relative z-10 text-lg transition-all duration-300 ${
              isActive
                ? "scale-110 text-red-500"
                : "text-gray-400 group-hover:text-white"
            }`}
          >
            {item.icon}
          </div>

          {/* LABEL */}
          <span
            className={`relative z-10 text-[10px] font-medium transition-all duration-300 ${
              isActive
                ? "text-white"
                : "text-gray-500 group-hover:text-gray-300"
            }`}
          >
            {item.name}
          </span>

          {/* ACTIVE DOT */}
          <div
            className={`relative z-10 mt-0.5 h-1 w-1 rounded-full bg-red-500 transition-all duration-300 ${
              isActive
                ? "opacity-100"
                : "opacity-0"
            }`}
          />

        </Link>
      );
    })}

  </div>
</div>
     
    </>
  );
};

export default Navbar;