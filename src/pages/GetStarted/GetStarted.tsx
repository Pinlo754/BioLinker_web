import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Getstarted = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Artist",
      description:
        "Showcase my work, grow my audience, and connect with fans or clients.",
    },
    {
      title: "Producer",
      description:
        "Showcase my projects, manage content distribution, and find new ways to connect with audiences and collaborators.",
    },
    {
      title: "Producer",
      description:
        "Showcase my services, attract new clients, and manage my online presence in one easy-to-share link.",
    },
    {
      title: "Creator",
      description:
        "Build and engage my audience while exploring tools to share content, grow my brand, and generate income from my creative work.",
    },
    {
      title: "Owner",
      description:
        "Promote my business, drive traffic to key platforms, and manage my brand presence in one central place.",
    },
    {
      title: "Personal",
      description:
        "Share everything that matters to me — from social profiles to passions — all in one simple, personalized link.",
    },
  ];

  return (
    <div className="w-full h-screen bg-white/90 flex flex-col items-center relative overflow-hidden font-normal font-['Helvetica']">
      {/* Logo */}
      <button
        className="absolute left-4 top-4 flex justify-center items-center h-14 w-28 z-10"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-8 w-auto" alt="logo" />
      </button>

      {/* Welcome */}
      <div className="absolute right-4 top-4 text-neutral-700 text-xl">
        Welcome, Khoa!
      </div>

      {/* Progress bar */}
      <div className="relative w-80 h-2 mt-6 mx-auto">
        <div className="absolute inset-0 bg-zinc-400 rounded-full" />
        <div className="absolute left-0 top-0 w-40 h-2 bg-gradient-to-r from-[#16C875] to-[#6CDFAB] rounded-l-full border-2 border-[#16C875] border-r-0" />
      </div>

      {/* Title */}
      <h1 className="mt-10 text-center font-bold leading-tight font-['Helvetica'] text-3xl md:text-4xl text-[#4F4F4F]">
        Which best <br />
        describes your goal <br />
        for using BioLinker?
      </h1>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-8 w-full max-w-6xl  mx-auto">
        {options.map((opt, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-[0_0.25rem_0.625rem_0.125rem_rgba(108,223,171,0.5)] p-4 h-32 flex flex-col justify-center"
          >
            <span className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] bg-clip-text text-transparent text-2xl md:text-3xl mb-2">
              {opt.title}
            </span>
            <span className="text-zinc-800 text-lg md:text-xl">
              {opt.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getstarted;
