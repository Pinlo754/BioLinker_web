export default function MarketCard({
  image,
  avatar,
  name,
  count,
  isPremium,
}: {
  image: string
  avatar: string
  name: string
  count: string
  isPremium?: boolean
}) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col w-ful">
      {/* Ảnh lớn + avatar */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-24 sm:h-30 md:h-36 lg:h-40 object-cover rounded-t-2xl"
        />
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white absolute left-4 -bottom-5 shadow"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 px-4 pt-8 sm:pt-10">
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl md:text-2xl font-bold">{name}</span>
          <div className="text-gray-400 text-sm sm:text-base md:text-lg mt-1 text-right">
            {count}
          </div>
        </div>

        <div className="mt-auto">
          {isPremium && (
            <div className="flex items-center justify-between gap-2 py-3">
              <span className="inline-block bg-gray-100 text-green-500 text-sm sm:text-base md:text-lg px-4 sm:px-6 py-1 sm:py-2 rounded-full font-medium">
                Premium
              </span>
              <a
                href="/template-detail"
                className="text-sm sm:text-base md:text-lg px-2 py-1 sm:px-3 sm:py-2 font-medium text-gray-700 hover:text-green-500 transition"
              >
                Edit Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
