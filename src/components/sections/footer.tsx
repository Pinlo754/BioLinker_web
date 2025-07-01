import { useState } from "react";
import {
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English (United States)");
  const languages = ["English (United States)", "Tiếng Việt"];
  return (
    <footer className="bg-white text-black pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between border-t border-gray-300 pt-10">
          {/* Các cột link */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            <div>
              <h3 className="mb-3 text-black text-base">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Pricing</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Solutions</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Education</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Team plans</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-black text-base">About us</h3>
              <ul className="space-y-2">
                  <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">About</a></li>
                  <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Branding</a></li>
                  <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Newsroom</a></li>
                  <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Partnerships</a></li>
                  <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Affiliates</a></li>
                  <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-black text-base">Help and support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Help center</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Contact us</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Privacy & Terms</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Safety information</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-black text-base">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Agencies</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Freelancers</a></li>
                <li><a href="#" className="hover:text-neutral-300 text-sm text-gray-600">Engineers</a></li>
              </ul>
            </div>
          </div>

          {/* Nút App Store & Google Play */}
          <div className="flex flex-row items-start mt-8 md:mt-0 md:ml-8 space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-12"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12"
              />
            </a>
          </div>
        </div>

        {/* Dòng cuối */}
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex flex-row items-center text-black">
            &copy;copyright {new Date().getFullYear()}
            <div className="flex space-x-10 ml-20">
              <a href="#" className="hover:text-neutral-300">Help</a>
              <a href="#" className="hover:text-neutral-300">Privacy</a>
              <a href="#" className="hover:text-neutral-300">Terms</a>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center space-x-5">
              {FaFacebookF({ className: "w-5 h-5 text-gray-600" })}
              {FaTwitter({ className: "w-5 h-5 text-gray-600" })}
              {FaInstagram({ className: "w-5 h-5 text-gray-600" })}
            </div>
            {/* <span className="text-black">English (United States)</span> */}
            <div className="flex items-center space-x-2 mt-2 md:mt-0 relative">
              <button
                className="flex items-center text-black focus:outline-none"
                onClick={() => setLangOpen((open) => !open)}
              >
                {language}
                {FaChevronDown({className: "ml-1 w-3 h-3 text-gray-600 hover:text-gray-800"})}
              </button>
              {langOpen && (
                <ul className="absolute right-0 top-8 bg-white border border-gray-200 rounded shadow-md z-10 min-w-[170px]">
                  {languages.map((lang) => (
                    <li key={lang}>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          lang === language ? "font-semibold" : ""
                        }`}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                      >
                        {lang}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}