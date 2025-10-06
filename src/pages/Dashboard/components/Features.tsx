import React from "react";
import Personalize from "../../../assets/Personalize.png";
import bgImage from "../../../assets/background.jpg";
import Identification from "../../../assets/Identification.png";

const Features = () => {
  return (
    <div className="relative w-full py-16 lg:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-r from-green1/20 to-green2/20 backdrop-blur-[33px] bg-cover -bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-1">
            <h2 className="font-helvetica font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[32px] leading-tight text-black tracking-[1.6px]">
              BioLinker is a platform that helps you personalize your personal
              image.
            </h2>
          </div>

          <div className="flex gap-12">
            <div className="flex items-start space-x-2 sm:space-x-4">    
              <div className="flex-shrink-0">
                <img
                  src={Personalize}
                  alt="Personalize"
                  className="w-8 h-8 sm:w-12 sm:h-12 lg:w-[40px] lg:h-[40px]"
                />
              </div>          
              <div className="flex-1 min-w-0">
                <h3 className="font-helvetica font-bold text-xl sm:text-2xl lg:text-[27px] text-black mb-3">
                  Personalize
                </h3>
                <p className="font-helvetica text-base sm:text-lg lg:text-[19px] text-[#696969] leading-relaxed">
                  Make your link-in-bio truly yours with Biolinker.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 sm:space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={Identification}
                  alt="Identification"
                  className="w-8 h-8 sm:w-12 sm:h-12 lg:w-[40px] lg:h-[40px]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-helvetica font-bold text-xl sm:text-2xl lg:text-[27px] text-black mb-3">
                  Identification
                </h3>
                <p className="font-helvetica text-base sm:text-lg lg:text-[19px] text-[#696969] leading-relaxed">
                  Biolinker is a link-in-bio tool for sharing multiple links on
                  one page.
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
