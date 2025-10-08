import { useNavigate } from "react-router-dom";
import useSelectPlatform from "./useSelectplatform";
import { PLATFORM_ICONS } from "../../../constants/platformIcons";
import logo from "../../../assets/logo.png";
import {Button} from "../../../components/ui/button";

const SelectPlatform = () => {
    const { 
        username, 
        platforms, 
        selectedPlatforms, 
        togglePlatform, 
        handleContinue, 
        handleSkip,
        maxSelectedPlatforms,
        handleBack
    } = useSelectPlatform();
    const navigate = useNavigate(); 
    ;
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header Section */}
            <div className="flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <div className="flex justify-center items-center h-full">
                    <img
                      src={logo}
                      className="h-[49px]"
                      alt="logo"
                    />
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mx-auto px-6 align-middle">
                    <div className="flex space-x-2">
                        {/* Step 1 - Completed */}
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
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
            <div className="flex-1 flex flex-col items-center max-h-[79vh] justify-start px-6 py-2 ">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black mb-4">
                        Những nền tảng mà bạn đang sử dụng?
                    </h1>
                    <p className="text-lg text-gray-600">
                        Chọn tối đa {maxSelectedPlatforms} để bắt đầu. Bạn có thể cập nhật bất cứ lúc nào.
                    </p>
                </div>

                {/* Platform Grid */}
                <div className="w-full max-w-2xl mb-8 h-full overflow-y-auto pr-2 scrollbar-hide">
                    <div className="grid grid-cols-3 gap-4 animate-fadeInUp">
                        {platforms.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => togglePlatform(platform)}
                                className={`
                                    flex flex-col items-center justify-center px-6 py-2 rounded-xl border-2 transition-all duration-200
                                    ${selectedPlatforms.includes(platform)
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                    }
                                    ${selectedPlatforms.length >= maxSelectedPlatforms && !selectedPlatforms.includes(platform)
                                        ? 'opacity-50'
                                        : 'cursor-pointer'
                                    }
                                `}
                                disabled={selectedPlatforms.length >= maxSelectedPlatforms && !selectedPlatforms.includes(platform)}
                            >
                                <div className="text-4xl w-[60%] h-[70%] items-center justify-center">
                                    {PLATFORM_ICONS[platform] || 'Link'}
                                </div>
                                <span className="text-sm font-medium text-black text-center">
                                    {platform}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selection Counter */}
                <div className="text-sm text-gray-500 ">
                    {selectedPlatforms.length} của {maxSelectedPlatforms} nền tảng đã chọn
                </div>

                {/* Continue Button */}

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
                    className="w-[50%] h-14 bg-gradient-to-r from-green1 to-green2 text-white rounded-full text-white text-xl"
                    disabled={selectedPlatforms.length === 0}
                >
                    Tiếp tục
                </Button>
                {/* Skip Button */}
                <button
                    onClick={handleSkip}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium  "
                >
                    Bỏ qua
                </button>
            </div>
        </div>
    );
};

export default SelectPlatform;