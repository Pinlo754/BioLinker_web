import { useRef, useState } from "react";
import useCreateName from "./useCreateName";
import logo from "../../../assets/logo.png";
import {Button} from "../../../components/ui/button";
import avatar from "../../../assets/avatar.png";
import ErrorOverlay from "../../../components/ui/error";
const CreateNameBio = () => {
    const { 
        username, 
        navigate, 
        handleBack, 
        handleContinue, 
        displayName, 
        setDisplayName, 
        bio, 
        setBio,
        avatarUrl, 
        setAvatarUrl, 
        fileInputRef,
        error
    } = useCreateName();

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
                        <div className="flex-1 h-2 bg-gradient-to-r from-green1 to-green2 rounded-full"></div>
                        {/* Step 2 - Current */}
                    </div>
                </div>
                
                {/* Welcome Message */}
                <div className="text-gray-600 font-medium">
                    Welcome, {username}!
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex flex-col items-center px-6 py-8 animate-fadeInUp h-[80vh] ">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-black mb-2">Add profile details</h1>
                    <p className="text-gray-600">Add your profile image, name, and bio.</p>
                </div>

                {/* Avatar uploader */}
                <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">
                        {avatarUrl ? (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img src={avatarUrl} className="w-full h-full object-cover" />
                        ) : (
                            <img width="100%" height="100%" src={avatar} alt="user-male-circle"/>
                        )}
                    </div>
                    <button
                        type="button"
                        className="absolute bottom-0 right-2 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Upload avatar"
                    >
                        +
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = URL.createObjectURL(file);
                            setAvatarUrl(url);
                        }}
                        className="hidden"
                    />
                </div>

                {/* Display Name */}
                <div className="w-full max-w-2xl mb-4">
                    <div className="p-3 border border-gray-200 rounded-xl">
                        <input
                            className="w-full outline-none"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="w-full max-w-2xl">
                    <div className="p-3 border border-gray-200 rounded-xl">
                        <textarea
                            className="w-full outline-none resize-none"
                            placeholder="Describe yourself in 160 characters or less"
                            rows={4}
                            maxLength={160}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <div className="text-xs text-gray-400 text-right">{bio.length}/160</div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center px-6 py-4">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium w-40% h-14"
                >
                    Back
                </button>
                <Button
                    onClick={handleContinue}
                    className="w-[50%] h-14 bg-gradient-to-r from-green1 to-green2 text-white rounded-full"
                    disabled={!displayName}
                >
                    Continue
                </Button>
                {/* Skip Button */}
                <button
                    onClick={handleContinue}
                    className="px-6 py-3 text-lg hover:text-green-500 font-medium"
                >
                    Skip
                </button>
            </div>
            {error && <ErrorOverlay visible={error} />}
        </div>
    );
};

export default CreateNameBio;