import Header from "../../components/sections/Header";
import Features from "./components/Features";
import Dot from "../../components/ui/dot";
import TemplateLayer from "./components/templateLayer";
import useDasshboard from "./useDashboard";
import { TemplatesSection } from "./components/template-section";
import { CollectionOverview } from "./components/collection-overview";
import { CreateTemplatesSection } from "./components/create-templates-section";
import { FeaturedCollections } from "./components/featured-collection";
const Dashboard = () => {
  const { templates } = useDasshboard();
  return (
    <div className="flex flex-col overflow-y-scroll scrollbar-hide">
      <div className="h-[91px] z-50">
        <Header />
      </div>
      <div className="pt-8 pb-16 flex bg-white">
        <span className="absolute top-60 left-16 inset-0 opacity-20">
          <Dot />
        </span>
        <div className="w-[50%] ml-28">
          <div className="mt-6 text-[64px] font-bold">BioLinker Welcome</div>
          <div className="w-41 h-32 text-[26px] font-helvetica text-[#565656] opacity-80 mb-4">
            Biolinker is a smart link-in-bio tool that helps users create a
            personalized landing page to showcase all their important links,
            social profiles, and content in one place. Perfect for creators,
            businesses, and influencers.
          </div>
          <button className="w-40 h-14 mt-10 rounded-[60px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-helvetica font-bold text-[16px] leading-[14px] flex justify-center items-center">
            Explore Now
          </button>
          <div className="flex justify-between items-center mt-12 w-[50%] mx-auto">
            <div className="flex flex-col items-center">
              <div className="font-bold text-[30px] font-helvetica mt-3">
                98k+
              </div>
              <div className="font-helvetica text-[15px]">Active user</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="font-bold text-[30px] font-helvetica mt-3">
                12k+
              </div>
              <div className="font-helvetica text-[15px]">Total download</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-[30px] font-helvetica mt-3">
                15k+
              </div>
              <div className="font-helvetica text-[15px]">Customer</div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center ml-16 ">
          <div className="absolute w-96 h-96 z-30">
            <TemplateLayer template={templates[0]} />
          </div>
          <div className="absolute left-24 w-80 h-80 z-20">
            <TemplateLayer template={templates[1]} />
          </div>
          <div className="absolute left-40 w-72 h-72 z-10">
            <TemplateLayer template={templates[2]} />
          </div>
        </div>
      </div>

      <Features />
      <TemplatesSection />
      <CollectionOverview />
      <CreateTemplatesSection />
      <FeaturedCollections />
      
    </div>
  );
};
export default Dashboard;
