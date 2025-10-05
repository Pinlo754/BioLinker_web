import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAddLink from "./useAddLink";
import { PLATFORM_ICONS } from "../../../constants/platformIcons";
import Button from "../../../components/ui/button";
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
            <div className="flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <button className="flex justify-center items-center h-full">
                    <img
                      src={logo}
                      className="h-[49px]"
                      alt="logo"
                      onClick={() => navigate("/")}
                    />
                </button>

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
                
                {/* Welcome Message */}
                <div className="text-gray-600 font-medium">
                    Welcome, {username}!
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center px-6 py-8 h-[80vh] overflow-y-auto pr-2 scrollbar-hide animate-fadeInUp">
                <div className="text-center mb-8 ">
                    <h1 className="text-3xl font-bold text-black mb-2">Add your links</h1>
                    <p className="text-gray-600">Complete the fields below to add your content to your new bio.</p>
                </div>

                {/* Your selections */}
                {platforms.length > 0 && (  
                <div className="w-full max-w-2xl mb-8">
                    <h2 className="text-base font-semibold text-black mb-3">Your selections</h2>
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
                    <h2 className="text-base font-semibold text-black mb-3">Additional links</h2>
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

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center px-6 py-4">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium"
                >
                    Back
                </button>
                <Button
                    onClick={handleContinue}
                    text="Continue"
                    width="40%"
                    height="56px"
                    disabled={Object.values(platformLink || {}).some((value) => value === '') || additionalLinks.length === 0}
                />
                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium"
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default AddLink;