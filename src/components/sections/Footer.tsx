import { useState } from "react";
import { FaChevronDown, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English (United States)");
  const languages = ["English (United States)", "Tiếng Việt"];

  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between border-t border-gray-300 pt-10 gap-8">
          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
            <div>
              <h3 className="mb-3 text-black text-base">Product</h3>
              <ul className="space-y-2">
                {["Pricing", "Solutions", "Education", "Team plans"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-neutral-300 text-sm text-gray-600">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-black text-base">About us</h3>
              <ul className="space-y-2">
                {["About", "Branding", "Newsroom", "Partnerships", "Affiliates", "Careers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-neutral-300 text-sm text-gray-600">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-black text-base">Help and support</h3>
              <ul className="space-y-2">
                {["Help center", "Contact us", "Privacy & Terms", "Safety information", "Sitemap"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-neutral-300 text-sm text-gray-600">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-black text-base">Community</h3>
              <ul className="space-y-2">
                {["Agencies", "Freelancers", "Engineers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-neutral-300 text-sm text-gray-600">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* App Store & Google Play */}
          <div className="flex flex-wrap md:flex-col items-start gap-4 md:ml-8">
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

        {/* Bottom section */}
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-black">
            <span>&copy; {new Date().getFullYear()}</span>
            <div className="flex flex-wrap gap-4">
              {["Help", "Privacy", "Terms"].map((item) => (
                <a key={item} href="#" className="hover:text-neutral-300">{item}</a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {FaFacebookF({ className: "w-5 h-5 text-gray-600" })}
              {FaTwitter({ className: "w-5 h-5 text-gray-600" })}
              {FaInstagram({ className: "w-5 h-5 text-gray-600" })}
            </div>

            {/* Language selector */}
            <div className="relative">
              <button
                className="flex items-center text-black focus:outline-none"
                onClick={() => setLangOpen((open) => !open)}
              >
                {language}
                {FaChevronDown({className: "ml-1 w-3 h-3 text-gray-600 hover:text-gray-800"})}
              </button>
              {langOpen && (
                <ul className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-10 min-w-[170px]">
                  {languages.map((lang) => (
                    <li key={lang}>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${lang === language ? "font-semibold" : ""}`}
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
