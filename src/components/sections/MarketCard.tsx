export default function MarketCard({
  image,
  avatar,
  name,
  count,
  isPremium,
}: {
  image: string;
  avatar: string;
  name: string;
  count: string;
  isPremium?: boolean;
}) {
  return (
    <div className="bg-white rounded-3xl shadow p-0 overflow-hidden flex flex-col min-w-[250px]">
        
      {/* Ảnh lớn + avatar */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-t-3xl"
        />
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full border-4 border-white absolute left-4 -bottom-6 shadow"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1">
        <div className="items-center pt-8 px-6 ">
          <span className="text-2xl font-bold ">{name}</span>
        <div className="text-gray-400 text-lg text-end mt-2">{count}</div>
        </div>
        <div className="mt-auto">
          {isPremium && (
            <div className=" flex gap-4 flex-row justify-between pt-2 pb-2 px-2">
              <span className="inline-block bg-gray-100 text-green-400 text-lg px-6 py-2 rounded-full font-medium">
                Premium
              </span>
              <a href="#" className="hover:text-green-400 font-medium inline-block text-lg px-2 py-2" >
                Edit Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}