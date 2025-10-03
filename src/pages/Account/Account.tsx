import Header from "../../components/sections/Header";
import useAccount from "./useAccount";
import PageNotFound from "../NotFound/NotFoundScreen";
import Information from "./Information/Information";
import { useState } from "react";

type AccountTabKey = "BioLinker" | "Personal Information" | "Setting" | "My QR" | "Support" | "Logout";
const Account = () => {
    const { menuComponent } = useAccount();
    const [activeTab, setActiveTab] = useState<AccountTabKey>("BioLinker");
    const tabViewByKey: Record<AccountTabKey, React.ComponentType<any>> = {
        "BioLinker": PageNotFound,
        "Personal Information": Information,
        "Setting": PageNotFound,
        "My QR": PageNotFound,
        "Support": PageNotFound,
        "Logout": PageNotFound,
      };
    const ActiveTabView = tabViewByKey[activeTab];
    return (
        <div className=" min-h-screen flex flex-col font-roboto">
            <Header/>
            <main className="flex-1 w-full  flex">
                {/* Left sidebar */}
                <aside className="w-full max-w-xs bg-gradient-to-b from-green1 to-green2 min-h-screen pt-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        {menuComponent.map((item) => (
                            <button
                                key={item}
                                className={`relative overflow-hidden text-xl font-medium text-start py-4 px-4 transition-all duration-500 
                                before:content-[""] before:absolute before:inset-0 before:bg-white before:transform before:origin-left before:scale-x-0 before:transition-transform before:duration-1000 
                                [&.is-active]:before:scale-x-100 
                                ${activeTab === (item as typeof activeTab) ? "is-active text-green2" : "text-white hover:text-green2 hover:bg-white"}`}
                                onClick={() => setActiveTab(item as AccountTabKey)}
                            >
                                <span className="relative z-10">{item}</span>
                            </button>
                        ))}
                    </div>
                </aside>
                {/* Main content */}
                <div className="w-full ">
                    <ActiveTabView />
                </div>
            </main>
        </div>
    );
};

export default Account;