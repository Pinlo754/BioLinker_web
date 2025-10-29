import React from "react";
import Personalize from "../../../assets/Personalize.png";
import bgImage from "../../../assets/background.jpg";
import Identification from "../../../assets/Identification.png";

const Features = () => {
  return (
    <div className="relative w-full py-12 sm:py-16 lg:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-r from-green1/20 to-green2/20 backdrop-blur-[33px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-black">
              BioLinker giúp bạn cá nhân hóa thương hiệu cá nhân.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Card 1 */}
            <div className="flex items-start space-x-4">
              <img
                src={Personalize}
                alt="Personalize"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div>
                <h3 className="font-bold text-xl mb-2">Cá nhân hóa</h3>
                <p className="text-[#696969]">
                  Biến liên kết trong tiểu sử trở nên thật độc đáo.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start space-x-4">
              <img
                src={Identification}
                alt="Identification"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div>
                <h3 className="font-bold text-xl mb-2">Nhận dạng</h3>
                <p className="text-[#696969]">
                  Chia sẻ nhiều liên kết chỉ với một trang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
