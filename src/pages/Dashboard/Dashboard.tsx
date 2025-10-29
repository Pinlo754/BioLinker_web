import Header from "../../components/sections/Header";
import Features from "./components/Features";
import Dot from "../../components/ui/dot";
import TemplateLayer from "./components/templateLayer";
import useDasshboard from "./useDashboard";
import { TemplatesSection } from "./components/template-section";
import { CollectionOverview } from "./components/collection-overview";
import { CreateTemplatesSection } from "./components/create-templates-section";
import { FeaturedCollections } from "./components/featured-collection";
import { TrialForCreator } from "../../components/sections/TrialForCreator";
const Dashboard = () => {
  const {
    templates,
    visibleTrialForCreator,
    setVisibleTrialForCreator,
    navigate,
  } = useDasshboard();
  return (
    <div className="flex flex-col overflow-y-scroll scrollbar-hide">
      <div className="h-[91px] z-50">
        <Header />
      </div>

      <TrialForCreator
        visible={visibleTrialForCreator}
        onClose={() => setVisibleTrialForCreator(false)}
      />

      {/* Hero section */}
      <div className="pt-8 pb-16 flex flex-col lg:flex-row bg-white px-6 lg:pl-48 text-center lg:text-left">
        {/* Left content */}
        <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start">
          <h1 className="mt-6 text-[40px] sm:text-[48px] lg:text-[64px] font-bold">
            BioLinker
          </h1>
          <p className="text-[20px] sm:text-[22px] lg:text-[26px] text-[#565656] opacity-80 mb-6">
            One Click - Stick All
          </p>

          <button
            className="w-48 h-14 mt-4 rounded-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-bold text-[16px] flex justify-center items-center"
            onClick={() => navigate("/marketplace")}
          >
            Khám phá ngay
          </button>

          {/* Stats */}
          <div className="flex justify-center lg:justify-between items-center mt-12 w-full max-w-md gap-6">
            {[
              { number: "1000+", label: "Người dùng" },
              { number: "300+", label: "Lượt tải về" },
              { number: "400+", label: "Khách hàng" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="font-bold text-[28px] sm:text-[30px]">
                  {stat.number}
                </div>
                <div className="text-[15px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Templates preview */}
        <div className="relative items-center justify-center mt-12 lg:mt-0 lg:ml-16 hidden lg:flex">
          <div className="absolute w-64 sm:w-72 md:w-80 lg:w-96 z-30">
            <TemplateLayer template={templates[0]} />
          </div>
          <div className="absolute left-12 sm:left-16 w-56 sm:w-64 lg:w-80 z-20">
            <TemplateLayer template={templates[1]} />
          </div>
          <div className="absolute left-20 sm:left-24 w-48 sm:w-56 lg:w-72 z-10">
            <TemplateLayer template={templates[2]} />
          </div>
        </div>
      </div>

      <Features />
      <TemplatesSection />
      {/* <CollectionOverview /> */}
      <CreateTemplatesSection />
      {/* <FeaturedCollections /> */}
    </div>
  );
};
export default Dashboard;
