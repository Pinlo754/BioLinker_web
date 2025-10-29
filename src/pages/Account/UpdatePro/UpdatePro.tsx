"use client";

import background from "../../../assets/background.jpg";
import useUpdatePro from "./useUpdatepro";
const UpdatePro = () => {
  const {
    description,
    plan,
    userPlan,
    checkPlan,
    handleRegisterPlan,
    canClick,
  } = useUpdatePro();
  return (
    <div className="relative flex items-center h-full">
      <img
        src={background || "/placeholder.svg"}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative h-full flex flex-col py-6 sm:py-7 lg:py-8 w-full max-w-7xl mx-auto z-10 items-center text-center overflow-y-auto animate-fadeInUp px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
          Nâng cấp gói dịch vụ
        </h1>
        <p className="text-[#636363] w-full sm:w-[85%] lg:w-[70%] text-sm sm:text-base px-4">
          {description}
        </p>

        <div className="flex flex-col lg:flex-row justify-center w-full sm:w-[95%] lg:w-[90%] gap-5 sm:gap-6 lg:gap-7 mt-4 sm:mt-5">
          {plan.map((item) => (
            <div
              key={item.title}
              className={`p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl w-full lg:w-1/3 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${
                item.title === "Standard"
                  ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white"
                  : "bg-white"
              }`}
            >
              <div className="flex flex-col text-start gap-3 sm:gap-4">
                <div className="flex flex-col justify-between gap-2 min-h-[180px] sm:min-h-[190px] lg:min-h-[200px]">
                  <div className="flex flex-row justify-between items-center">
                    <h2
                      className={`text-base sm:text-lg font-bold ${
                        item.title === "Standard"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h2>
                    {item.title === "Standard" && (
                      <div className="text-white bg-white rounded-full p-1.5 sm:p-2 w-[40%] sm:w-[45%] flex items-center gap-1">
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 sm:w-[14px] sm:h-[15px]"
                        >
                          <path
                            d="M11.3816 0.812988L10.6184 2.47858L8.95889 3.23567L10.6184 3.99882L11.3816 5.65836L12.1387 3.99882L13.8043 3.23567L12.1387 2.47858M5.32486 2.63L3.81069 5.9612L0.479492 7.47537L3.81069 8.98955L5.32486 12.3207L6.83904 8.98955L10.1702 7.47537L6.83904 5.9612M11.3816 9.29239L10.6184 10.9519L8.95889 11.7151L10.6184 12.4722L11.3816 14.1378L12.1387 12.4722L13.8043 11.7151L12.1387 10.9519"
                            fill="url(#paint0_linear_259_19970)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_259_19970"
                              x1="0.479492"
                              y1="7.47538"
                              x2="14.1834"
                              y2="7.47538"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#16C875" />
                              <stop offset="1" stopColor="#6CDFAB" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="text-[#16C875] text-[10px] sm:text-xs font-medium">
                          Lựa chọn tốt nhất
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    {item.title === "Standard" ? (
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Giá cũ */}
                        <div className="flex items-end gap-2">
                          <span className="text-base sm:text-lg text-white/80 line-through font-medium">
                            49.000₫
                          </span>
                        </div>

                        {/* Giá mới - hiệu ứng nổi bật */}
                        <div className="flex items-end gap-1 sm:gap-2 animate-pulse">
                          <span className="text-2xl sm:text-3xl lg:text-4xl leading-none font-extrabold bg-gradient-to-r from-[#16C875] to-[#6CDFAB] bg-clip-text drop-shadow-[0_0_8px_rgba(22,200,117,0.6)]">
                            19.000
                          </span>
                          <div className="pb-1 sm:pb-2">
                            <span className="text-white font-semibold text-sm sm:text-base">
                              ₫
                            </span>
                            <span className="text-white/80 text-base sm:text-lg font-medium">
                              /tháng
                            </span>
                          </div>
                        </div>

                        {/* Badge giảm giá */}
                        <div className="ml-2 sm:ml-4 w-10 sm:w-12 h-6 sm:h-7 bg-white text-green2 font-semibold text-[10px] sm:text-xs flex justify-center items-center rounded-full shadow-md animate-bounce">
                          - 61%
                        </div>
                      </div>
                    ) : (
                      // Các gói khác hiển thị bình thường
                      <div className="flex items-end gap-1 sm:gap-2">
                        <span
                          className={`text-2xl sm:text-3xl leading-none font-extrabold ${
                            item.title === "Standard"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {item.price === 0
                            ? "0"
                            : item.price.toLocaleString("vi-VN")}
                        </span>
                        <div className="pb-1 sm:pb-2">
                          <span
                            className={`${
                              item.title === "Standard"
                                ? "text-white"
                                : "text-gray-900"
                            } font-semibold text-sm sm:text-base`}
                          >
                            ₫
                          </span>
                          <span
                            className={`${
                              item.title === "Standard"
                                ? "text-white"
                                : "text-gray-500"
                            } text-base sm:text-lg font-medium`}
                          >
                            /tháng
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p
                    className={`${
                      item.title === "Standard" ? "text-white" : "text-gray-500"
                    } max-w-md text-sm sm:text-base`}
                  >
                    {item.description}
                  </p>
                  <button
                    disabled={!canClick(userPlan, item.title)}
                    className={`mt-2 w-full rounded-full py-2.5 sm:py-3 font-semibold transition text-sm sm:text-base ${
                      item.title === "Standard"
                        ? "bg-white text-green2"
                        : "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white"
                    } ${
                      !canClick(userPlan, item.title)
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`}
                    onClick={() =>
                      canClick(userPlan, item.title) &&
                      handleRegisterPlan(item.title)
                    }
                  >
                    {checkPlan(userPlan, item.title)}
                  </button>
                </div>

                <div className="pt-2">
                  <h3
                    className={`${
                      item.title === "Standard" ? "text-white" : "text-gray-900"
                    } font-semibold mb-2 sm:mb-3 text-sm sm:text-base`}
                  >
                    Tính năng
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {item.features.map((f) => (
                      <div
                        key={f}
                        className={`flex items-start gap-2 sm:gap-3 ${
                          item.title === "Standard"
                            ? "text-white"
                            : "text-gray-800"
                        } text-sm sm:text-base`}
                      >
                        <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                          {/* check icon */}
                          {item.title === "Standard" ? (
                            <svg
                              width="18"
                              height="19"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            >
                              <path
                                d="M9.99999 18.6667C14.6025 18.6667 18.3333 14.9358 18.3333 10.3333C18.3333 5.73083 14.6025 2 9.99999 2C5.39749 2 1.66666 5.73083 1.66666 10.3333C1.66666 14.9358 5.39749 18.6667 9.99999 18.6667Z"
                                fill="white"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.5 10.3337L9.16667 12.0003L12.5 8.66699"
                                stroke="url(#paint0_linear_232_13205)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_232_13205"
                                  x1="7.5"
                                  y1="10.3337"
                                  x2="12.6423"
                                  y2="10.3337"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#16C875" />
                                  <stop offset="1" stopColor="#6CDFAB" />
                                </linearGradient>
                              </defs>
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="19"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            >
                              <path
                                d="M10 18.6667C14.6025 18.6667 18.3333 14.9358 18.3333 10.3333C18.3333 5.73083 14.6025 2 10 2C5.3975 2 1.66666 5.73083 1.66666 10.3333C1.66666 14.9358 5.3975 18.6667 10 18.6667Z"
                                fill="url(#paint0_linear_232_13152)"
                                stroke="url(#paint1_linear_232_13152)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.5 10.3337L9.16667 12.0003L12.5 8.66699"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_232_13152"
                                  x1="1.66667"
                                  y1="10.3333"
                                  x2="18.8076"
                                  y2="10.3333"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#16C875" />
                                  <stop offset="1" stopColor="#6CDFAB" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_232_13152"
                                  x1="1.66667"
                                  y1="10.3333"
                                  x2="18.8076"
                                  y2="10.3333"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#16C875" />
                                  <stop offset="1" stopColor="#6CDFAB" />
                                </linearGradient>
                              </defs>
                            </svg>
                          )}
                        </span>
                        <span className="leading-5 sm:leading-6">{f}</span>
                      </div>
                    ))}
                    {item.title === "Free" && (
                      <li className="flex items-start gap-2 sm:gap-3 text-gray-800 text-sm sm:text-base">
                        <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 shrink-0">
                          {/* x icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3 w-3 sm:h-4 sm:w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="leading-5 sm:leading-6">
                          Bao gồm watermark BioLinker
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UpdatePro;
