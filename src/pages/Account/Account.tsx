"use client";

import type React from "react";

import Header from "../../components/sections/Header";
import useAccount from "./useAccount";
import PageNotFound from "../NotFound/NotFoundScreen";
import Information from "./Information/Information";
import Links from "./Links/Links";
import Domain from "./Domain/Domain";
import { useState, useEffect } from "react";
import UpdatePro from "./UpdatePro/UpdatePro";
import LogOut from "../LogOut/LogOut";
import { useSearchParams } from "react-router-dom";
import useMedia from "use-media";
import QRStyling from "../QRStyling/app/page";

type AccountTabKey =
  | "BioLinker"
  | "Thông tin cá nhân"
  | "Tên miền"
  | "Nâng cấp"
  | "QR của tôi"
  // | "Hướng dẫn"
  | "Đăng xuất";

const Account = () => {
  const { menuComponent } = useAccount();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<AccountTabKey>("BioLinker");

  const tabViewByKey: Record<AccountTabKey, React.ComponentType<any>> = {
    BioLinker: Links,
    "Thông tin cá nhân": Information,
    "Tên miền": Domain,
    "Nâng cấp": UpdatePro,
    "QR của tôi": QRStyling,
    // "Hướng dẫn": PageNotFound,
    "Đăng xuất": LogOut,
  };

  const ActiveTabView = tabViewByKey[activeTab];

  useEffect(() => {
    const code = searchParams.get("code");
    const tab = searchParams.get("tab");

    if (code) {
      setActiveTab("Nâng cấp");
    } else if (tab) {
      const decodedTab = decodeURIComponent(tab);
      const validTabs: AccountTabKey[] = [
        "BioLinker",
        "Thông tin cá nhân",
        "Tên miền",
        "Nâng cấp",
        "QR của tôi",
        "Đăng xuất",
      ];
      if (validTabs.includes(decodedTab as AccountTabKey)) {
        setActiveTab(decodedTab as AccountTabKey);
      }
    }
  }, [searchParams]);

   const isDesktop = useMedia({ minWidth: "768px" })
  return (
    <div className="h-screen overflow-hidden flex flex-col font-roboto">
      <Header />
      <main className="w-full flex flex-col lg:flex-row flex-1 overflow-hidden mt-[8vh]">
        {/* Left sidebar */}
        <aside className="w-full lg:w-[280px] bg-gradient-to-br from-green1 to-green2 pt-3 sm:pt-4 lg:pt-5 flex flex-col gap-2 sm:gap-3 lg:gap-4 sticky top-0 self-start h-auto lg:h-screen overflow-x-auto lg:overflow-x-visible">
          <div className="flex flex-row lg:flex-col gap-2 px-2 sm:px-3 lg:px-0 pb-2 lg:pb-0">
            {menuComponent.map((item) => (
              <button
                key={item}
                className={`relative overflow-hidden text-sm sm:text-base lg:text-xl font-medium text-start py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-4 transition-all duration-500 whitespace-nowrap lg:whitespace-normal
                  before:content-[""] before:absolute before:inset-0 before:bg-white before:transform before:origin-left before:scale-x-0 before:transition-transform before:duration-1000 
                  [&.is-active]:before:scale-x-100 
                  ${
                    activeTab === (item as typeof activeTab)
                      ? "is-active text-green2"
                      : "text-white hover:text-green2 hover:bg-white"
                  }`}
                onClick={() => setActiveTab(item as AccountTabKey)}
              >
                { isDesktop ? <span className="relative z-10 ">{item}</span> : <span className="relative z-10 animate-marquee">{item}</span> }
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 bg-gradient-to-br from-green1 h-full overflow-y-auto">
          <ActiveTabView />
        </div>
      </main>
    </div>
  );
};

export default Account;
