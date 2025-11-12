const AnnaNguyenBio = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-helvetica overflow-hidden">
      <div className="w-full max-w-md h-screen bg-white shadow-md rounded-none sm:rounded-2xl p-6 flex flex-col items-center overflow-hidden">
        <img
          src='/hardcode-bio/unnamed (4).jpg'
          alt="Anna Nguyen"
          className="w-28 h-28 rounded-full mx-auto mb-4 mt-2"
        />
        <h1 className="text-2xl font-bold mb-1 text-center">Anna Nguyen</h1>
        <p className="text-gray-600 mb-4 text-center font-bold text-sm">
          Video Creator & Story Teller
        </p>

        <div className="h-[2px] w-[40%] bg-black mb-4"></div>

        <p className="text-gray-700 text-center mb-3 font-bold text-sm">
          Các kênh Social
        </p>

        {[
          { name: "FACEBOOK", icon: "/facebook.svg" },
          { name: "INSTAGRAM", icon: "/instagram.svg" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#545454] h-12 w-[80%] flex items-center pl-10 gap-4 rounded-lg mb-3"
          >
            <img src={item.icon} alt={item.name} className="w-8 h-8 rounded-full" />
            <p className="text-white font-bold text-sm">{item.name}</p>
          </div>
        ))}

        <div className="h-[2px] w-[40%] bg-black my-4"></div>

        <p className="text-gray-700 text-center font-bold text-sm mb-3">
          Câu chuyện thương hiệu
        </p>

        {[
          { name: "YOUTUBE", icon: "/youtube.svg" },
          { name: "TIKTOK", icon: "/tiktok.svg" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#545454] h-12 w-[80%] flex items-center pl-10 gap-4 rounded-lg mb-3"
          >
            <img src={item.icon} alt={item.name} className="w-8 h-8 rounded-full" />
            <p className="text-white font-bold text-sm">{item.name}</p>
          </div>
        ))}

        <div className="h-[2px] w-[40%] bg-black my-4"></div>

        <p className="text-gray-700 text-center font-bold text-sm mb-2">
          Xem các tập mới nhất
        </p>

        <div className="flex w-[80%] justify-between items-center">
          <img
            src="/hardcode-bio/unnamed (7).jpg"
            alt="Anna Nguyen"
            className="w-20 h-20 rounded-full object-cover"
          />
          <img
            src="/hardcode-bio/unnamed (6).jpg"
            alt="Anna Nguyen"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AnnaNguyenBio;
