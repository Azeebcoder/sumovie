import React from "react";
import styles from "./Footer.module.css";
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
    <>
      <div className={styles.footer}>
        <div className={styles.heading}>
          <h1>Murkh Pranni</h1>
        </div>
        <div className={styles.discription}>
          <p>
            🌟 This Website is Under Development <br />
            🌟 Hello there! <br /> 😊 I'm Sumit Bhardwaj, and I'm the sole
            developer maintaining this website. 🚀 <br /> If you happen to find
            any bugs 🐛 or have suggestions 💡 to improve the site, I'd love to
            hear from you! Feel free to reach out through the links below:{" "}
            <br />
            Thank you for your patience and support! 🙏
          </p>
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <a href="tel:+916397929579" target="_blank">
                <FaPhoneAlt />
              </a>
            </li>
            <li>
              <a
                href="mailto:sumitbhardwajnew@gmail.com?subject=Hello Sumit&body=I would like to Make Projects with you."
                target="_blank"
              >
                <MdEmail />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/lilsumyy/" target="_blank">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://github.com/Azeebcoder" target="_blank">
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sumit-bhardwaj-new"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a href="https://x.com/LilSuumyy" target="_blank">
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a href="https://t.me/+916397929579" target="_blank">
                <FaPaperPlane />
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <p className={styles.tagline}>
          Made With 💗 By <span>Sumit</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
