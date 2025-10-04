import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const SelectPlatform = () => {
    const navigate = useNavigate(); 
    return (
        <div className="min-h-screen bg-white ">
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
                    Welcome
                </div>
            </div>
        </div>
    );
};

export default SelectPlatform;