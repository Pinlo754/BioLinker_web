import Header from "../../components/sections/Header";
import useAccount from "./useAccount";
import PageNotFound from "../NotFound/NotFoundScreen";
import Information from "./Information/Information";
import { useState } from "react";
import LogOut from "../LogOut/LogOut";
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
        "Logout": LogOut,
      };
    const ActiveTabView = tabViewByKey[activeTab];
    return (
        <div className="h-screen overflow-hidden flex flex-col font-roboto mt-[8vh]">
            <Header/>
            <main className="w-full flex flex-1 overflow-hidden">
                {/* Left sidebar */}
                <aside className="w-full max-w-xs bg-gradient-to-br from-green1 to-green2 pt-5 flex flex-col gap-4 sticky top-0 self-start h-screen">
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
                <div className="flex-1 bg-gradient-to-br from-green1 h-full overflow-y-auto">
                    <ActiveTabView />
                </div>
            </main>
        </div>
    );
};

export default Account;