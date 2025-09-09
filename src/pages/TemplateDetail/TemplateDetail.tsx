import React from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import template2 from "../../assets/template2.jpg";
import template3 from "../../assets/template3.jpg";
import template4 from "../../assets/template4.jpg";
import template1 from "../../assets/template1.jpeg";
import MarketCard from "../../components/sections/MarketCard";

const TemplateDetail = () => {
  const actorName = "@ThanhPhong";
  const templateName = "Template Name 12121";
  const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const view = 0;
  const like = 0;
  const attribute = ["Description", "History", "Owner", "Traits"];
  const smallDescription = "In a surreal countryside scene, villagers gaze at a giant sandwich resting in the middle of a green field under a dreamy, colorful sky.";

  const cards = [
    {
      image: template1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Thanh Phong",
      count: "1 of 321",
      isPremium: true,
    },
    {
      image: template2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Thanh Phong",
      count: "1 of 321",
      isPremium: true,
    },
    {
      image: template3,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Thanh Phong",
      count: "1 of 321",
      isPremium: true,
    },
    {
      image: template4,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Thanh Phong",
      count: "1 of 321",
      isPremium: true,
    },
    {
      image: template1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Thanh Phong",
      count: "1 of 321",
      isPremium: true,
    },
  ]
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        {/* main content */}
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-screen-2xl px-4">
          {/* Ảnh lớn bên trái */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-[520px] aspect-square">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Template"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          
          {/* Card thông tin*/}
          <div className="flex-1 flex items-center">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg relative">

              {/* Nút 3 chấm */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" fill="none">
                  <circle cx="5" cy="12" r="2" fill="#bbb" />
                  <circle cx="12" cy="12" r="2" fill="#bbb" />
                  <circle cx="19" cy="12" r="2" fill="#bbb" />
                </svg>
              </button>

              <h2 className="text-3xl font-bold mb-4">Template Name: {templateName}</h2>
              <div className="flex items-center mb-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-500 text-sm">Creator</span>
                <span className="ml-2 font-semibold text-black text-sm">
                  {actorName}
                </span>
              </div>
              <p className="text-gray-500 mb-6">
                {description}
              </p>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-6 py-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{view}</div>
                  <div className="text-gray-400 text-sm">View</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{like}</div>
                  <div className="text-gray-400 text-sm">Like</div>
                </div>
              </div>
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB]  text-white text-lg font-semibold hover:opacity-90 transition">
                Choose Template
              </button>
            </div>
          </div>
          
        </div>

        {/* main attribute */}
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl px-4 mt-12">
          <div className="flex flex-row gap-4">
          {attribute.map((item) => (
             <span key={item} className={`text-black-500 text-xl border-2 rounded-2xl px-4   py-2 border-black-500 
              ${item === attribute[0] ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white" : "bg-black-500 text-black-500  "}` }>{item}</span>
          ))}
          </div>
          <div className="flex-1 flex justify-start items-center w-1/2"> 
            <p className="text-black-500 text-base">{smallDescription}</p>
          </div>
        </div>

        {/* last created 5 template */}
        <div className="flex flex-col gap-4 w-full max-w-screen-2xl px-4 mt-10">
          <h2 className="text-3xl font-bold mb-4 max-w-screen-2xl text-start">Last Created </h2>
        </div>  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-screen-2xl  gap-4 px-4 mt-10">
          {cards.map((card, i) => (
            <MarketCard key={i} {...card}/>
          ))}
        </div>  
      </main>
      <Footer />
    </div>
  );
};

export default TemplateDetail;
