import React from "react";
import {
  FaPhoneAlt,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" border-t border-white/10 bg-linear-to-b from-black via-[#0a0a0a] to-black text-white">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Murkh Pranni
            </h1>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              🌟 This website is under development <br />
              🚀 Built and maintained by <span className="text-white font-medium">Sumit Bhardwaj</span><br />
              🐛 Found a bug or have suggestions? Feel free to reach out.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              Contact
            </h2>

            <div className="space-y-3 text-sm text-gray-300">

              <a href="tel:+916397929579" className="flex items-center gap-2 hover:text-white transition">
                <FaPhoneAlt /> Call
              </a>

              <a href="mailto:sumitbhardwajnew@gmail.com" className="flex items-center gap-2 hover:text-white transition">
                <MdEmail /> Email
              </a>

              <a href="https://t.me/+916397929579" className="flex items-center gap-2 hover:text-white transition">
                <FaPaperPlane /> Telegram
              </a>

            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              Social
            </h2>

            <div className="flex flex-wrap gap-3">

              {[
                { icon: <FaInstagram />, link: "https://www.instagram.com/lilsumyy/" },
                { icon: <FaGithub />, link: "https://github.com/Azeebcoder" },
                { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/sumit-bhardwaj-new" },
                { icon: <FaXTwitter />, link: "https://x.com/LilSuumyy" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-red-600 hover:border-red-500 transition duration-300"
                >
                  {item.icon}
                </a>
              ))}

            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-10 border-t border-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} Sumovie. All rights reserved.
          </p>

          <p className="text-gray-400">
            Made with <span className="text-red-500">♥</span> by{" "}
            <span className="text-white font-medium">Sumit</span>
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;