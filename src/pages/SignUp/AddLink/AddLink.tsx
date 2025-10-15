import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAddLink from "./useAddLink";
import { PLATFORM_ICONS } from "../../../constants/platformIcons";
import { Button } from "../../../components/ui/button";
const AddLink = () => {
    const navigate = useNavigate();
    const { 
        username,  
        platforms = [], 
        platformLink,
        updatePlatformValue,
        clearPlatformValue,
        additionalLinks,
        updateAdditionalLink,
        handleContinue,
        handleSkip,
        handleBack,
    } = useAddLink();
    return (
        <div className="min-h-screen bg-white ">
            {/* Header Section */}
            <div className="flex justify-between items-center px-6 pb-4">
                {/* Logo */}
                <button className="flex justify-center items-center h-full">
                    <img
                      src={logo}
                      className="h-[49px]"
                      alt="logo"
                      onClick={() => navigate("/")}
                    />
                </button>

                
                
                {/* Welcome Message */}
                <div className="text-gray-600 font-medium">
                    Welcome, {username}!
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center px-6 py-8 h-[80vh] overflow-y-auto pr-2 scrollbar-hide animate-fadeInUp">
                <div className="text-center mb-8 ">
                    <h1 className="text-3xl font-bold text-black mb-2">Thêm liên kết của bạn</h1>
                    <p className="text-gray-600">Hoàn thành các trường bên dưới để thêm nội dung của bạn vào hồ sơ mới của bạn.</p>
                </div>

                {/* Your selections */}
                {platforms.length > 0 && (  
                <div className="w-full max-w-2xl mb-8">
                    <h2 className="text-base font-semibold text-black mb-3">Các nền tảng mà bạn đang sử dụng</h2>
                    <div className="space-y-4">
                        {platforms.map((name: string) => (
                            <div key={name} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                                <div className="w-10 h-10 flex items-center justify-center text-2xl">
                                    {PLATFORM_ICONS[name] || PLATFORM_ICONS['Link']}
                                </div>
                                <div className="flex-1">
                                    <input
                                        className="w-full outline-none"
                                        placeholder={`${name}.com/username`}
                                        value={platformLink?.[name] ?? ''}
                                        onChange={(e) => updatePlatformValue(name, e.target.value)}
                                    />
                                    <div className="text-xs text-gray-400">
                                        { `${name.toLowerCase()}.com/username`}
                                    </div>
                                </div>
                                {platformLink?.[name] && (
                                    <button
                                        className="text-gray-400 hover:text-black"
                                        onClick={() => clearPlatformValue(name)}
                                        aria-label={`Clear ${name}`}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional links */}
                <div className="w-full max-w-2xl">
                    <h2 className="text-base font-semibold text-black mb-3">Các liên kết thêm</h2>
                    <div className="space-y-3">
                        {additionalLinks.map((val, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                                <div className="w-10 h-10 flex items-center justify-center text-xl">{PLATFORM_ICONS['Link']}</div>
                                <input
                                    className="flex-1 outline-none"
                                    placeholder="url"
                                    value={val}
                                    onChange={(e) => updateAdditionalLink(idx, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Progress Bar */}
                <div className="w-full max-w-md mx-auto px-6 align-middle">
                    <div className="flex space-x-2">
                        {/* Step 1 - Completed */}
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
                        {/* Step 2 - Current */}
                    </div>
                </div>
            {/* Bottom Navigation */}
            <div className="flex justify-between items-center px-6 py-4">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium w-40% h-14"
                >
                    Quay lại
                </button>
                <Button
                    onClick={handleContinue}
                    className="w-[50%] h-14 bg-gradient-to-r from-green1 to-green2 text-white rounded-full"
                    disabled={Object.values(platformLink || {}).some((value) => value === '') || additionalLinks.length === 0}
                >
                    Tiếp tục
                </Button>
                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium w-40% h-14"
                >
                    Bỏ qua
                </button>
            </div>
        </div>
    );
};

export default AddLink;