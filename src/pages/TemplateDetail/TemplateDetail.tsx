import React from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import template2 from "../../assets/template2.jpg";
import template3 from "../../assets/template3.jpg";
import template4 from "../../assets/template4.jpg";
import template1 from "../../assets/template1.jpeg";
import MarketCard from "./MarketCard";
import { useNavigate } from "react-router-dom";

const TemplateDetail = () => {
  const actorName = "@ThanhPhong";
  const templateName = "Template Name 12121";
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const view = 0;
  const like = 0;
  const attribute = ["Description", "History", "Owner", "Traits"];
  const smallDescription =
    "In a surreal countryside scene, villagers gaze at a giant sandwich resting in the middle of a green field under a dreamy, colorful sky.";

  const cards = [
    { image: template1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
    { image: template2, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
    { image: template3, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
    { image: template4, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
    { image: template1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Thanh Phong", count: "1 of 321", isPremium: true },
  ];

  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12 mt-10">
        {/* main content */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full max-w-screen-2xl px-4">
          {/* Ảnh lớn bên trái */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Template"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Card thông tin */}
          <div className="flex-1 flex items-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-lg relative">
              {/* Nút 3 chấm */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" fill="none">
                  <circle cx="5" cy="12" r="2" fill="#bbb" />
                  <circle cx="12" cy="12" r="2" fill="#bbb" />
                  <circle cx="19" cy="12" r="2" fill="#bbb" />
                </svg>
              </button>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                Template Name: {templateName}
              </h2>

              <div className="flex items-center mb-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="avatar"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2"
                />
                <span className="text-gray-500 text-xs sm:text-sm">Creator</span>
                <span className="ml-2 font-semibold text-black text-xs sm:text-sm">
                  {actorName}
                </span>
              </div>

              <p className="text-gray-500 mb-6 text-sm sm:text-base">{description}</p>

              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 mb-6">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">{view}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">View</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">{like}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Like</div>
                </div>
              </div>

              <button className="w-full py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white text-base sm:text-lg font-semibold hover:opacity-90 transition"
              onClick={() => navigate("/bio-edit")}>
                Choose Template
              </button>
            </div>
          </div>
        </div>

        {/* main attribute */}
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl px-4 mt-10 sm:mt-12">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {attribute.map((item) => (
              <span
                key={item}
                className={`text-sm sm:text-base md:text-lg border rounded-2xl px-3 sm:px-4 py-1 sm:py-2
                  ${
                    item === attribute[0]
                      ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white border-transparent"
                      : "border-gray-400 text-gray-600 bg-white"
                  }`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex-1 w-full md:w-2/3">
            <p className="text-gray-700 text-sm sm:text-base">{smallDescription}</p>
          </div>
        </div>

        {/* last created 5 template */}
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl px-4 mt-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-start">
            Last Created
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-screen-2xl gap-4 sm:gap-6 px-4 mt-6 sm:mt-10">
          {cards.map((card, i) => (
            <MarketCard key={i} {...card} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplateDetail;
