import { Button } from '../../../components/ui/button';
import logo from "../../../assets/logo.png";
import useAddDomain from './useAddDomain';
const AddDomain = () => {

const { domain, showError, navigate, handleContinue, handleBack, handleSkip,  setDomain, setShowError, username } = useAddDomain();
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
                        <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
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
            <div className="flex flex-col items-center justify-center px-6 ">
                <div className="w-full max-w-xl space-y-8 animate-fadeInUp">
                    {/* Title */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Your BioLinker Username
                        </h1>
                        <p className="text-xl">
                            Advice: Use at the same time like on your Network
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4 items-center">
                        <div className="flex items-center space-x-0 gap-4">
                            {/* Prefix */}
                            <div className="bg-white border border-green-500 rounded-full px-6 py-2 text-xl  text-green-500">
                                biolinker/
                            </div>
                            {/* Username Input */}
                             <div className="flex-1">
                                 <input
                                 type="text"
                                 placeholder="Domain"
                                 value={domain}
                                 onChange={(e) => {
                                     setDomain(e.target.value);
                                     if (showError && e.target.value.trim() !== '') {
                                         setShowError(false);
                                     }
                                 }}
                                 className={`flex-1 w-full bg-white border rounded-full px-4 py-2 text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green1 focus:border-green1 ${showError ? 'border-red-500' : 'border-green-500'}`}
                                 />
                            </div>
                        </div>
                        {showError && (
                            <span className="text-red-500 text-base text-center mt-1 block">
                                This domain is already in use. Please try another one.
                            </span>
                        )}
                     </div>

                    {/* Continue Button */}
                    <div className="">
                        <Button
                            onClick={handleContinue}
                            className="w-full h-14 bg-gradient-to-r from-green1 to-green2 text-white rounded-full"
                            disabled={domain.trim() === ''}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium "
                >
                    Back
                </button>
                
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

export default AddDomain;