import React from "react";

const ThanhTrucBio = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-helvetica">
      <div className="w-full max-w-md h-screen bg-white shadow-md rounded-2xl p-4 sm:p-6 flex flex-col items-center">
        <div className="flex items-center w-[90%] justify-center">
            <div className="mt-8 flex flex-col items-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 text-center">Lê Thanh Trúc</h1>
             <p className="text-gray-600 mb-4 text-center font-bold text-sm sm:text-xl">
                            Tư vấn Digital Marketing
             </p>
             <div className="h-[2px] w-[80%] bg-black mb-4"></div>
             </div>
            <img
               src="/hardcode-bio/unnamed (8).jpg"
               alt="Lê Thanh Trúc"
               className="w-28 h-28 rounded-full mb-2 mt-2"
            />
        </div>      

        {/* Social Links */}
        <p className="text-gray-700 text-center mb-2 font-bold text-sm">Các kênh Social</p>
        <div className="flex flex-col items-center w-full gap-2">
          {[
            { name: "LINKEDIN", icon: "/linkedin.svg" },
            { name: "FACEBOOK", icon: "/facebook.svg" },
            { name: "TIKTOK", icon: "/tiktok.svg" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-600 h-10 sm:h-12 w-11/12 sm:w-4/5 flex items-center gap-3 sm:gap-4 rounded-3xl pl-12 sm:pl-16"
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
              <p className="text-white font-bold text-sm sm:text-base">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="h-[2px] w-2/5 bg-black my-4"></div>

        {/* Projects */}
        <p className="text-gray-700 text-center font-bold text-sm mb-2">DỰ ÁN</p>
        <div className="flex w-11/12 sm:w-4/5 justify-around items-center mb-4">
          <div className="flex flex-col items-center">
            <img
              src="/hardcode-bio/unnamed (10).jpg"
              alt="Be"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <p className="text-sm mt-1">Be</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/hardcode-bio/unnamed (11).jpg"
              alt="Laneige"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <p className="text-sm mt-1">Laneige</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-green-600 text-white font-bold text-sm sm:text-base rounded-3xl py-3 w-1/2 sm:w-2/5 mb-4">
          ĐĂNG KÝ ĐẶT LỊCH
        </button>
      </div>
    </div>
  );
};

export default ThanhTrucBio;
