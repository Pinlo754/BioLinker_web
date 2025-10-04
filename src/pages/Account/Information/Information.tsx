import { useState } from "react";

const Information = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const avatar = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
    const [plan, setPlan] = useState("Free");
    const [username, setUsername] = useState("@ocschos455");
    return (
        <div className="w-full flex flex-col gap-4 mt-[3px] bg-[#F3F3F1] pb-10">
            <div className="max-w-[50%] mx-auto flex flex-col gap-4 w-full font-roboto text-[#4F4F4F] ">

                {/* personal information */}
                <div className="w-full gap-10 text-2xl mt-6 ">
                    <h1 className="text-2xl font-bold">My Information</h1>
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50  shadow-2xl mt-8 bg-white">

                        {/* input field */}
                        <div className="w-full gap-6 flex flex-col px-4">
                            {/* email input field */}
                            <div className="relative">
                                <input
                                    id="email"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 transition-all duration-500
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:scale-75"
                                >
                                    Email
                                </label>
                            </div>
                            
                            {/* name input field */}
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label
                                    htmlFor="name"
                                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 transition-all duration-500
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:scale-75"
                                >
                                    Name
                                </label>
                            </div>

                            {/* description input field */}
                            <div className="relative">
                                <input
                                    id="description"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
                                <label
                                    htmlFor="description"
                                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 transition-all duration-500
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:scale-75"
                                >
                                    Description
                                </label>
                            </div>
                            
                            <h2 className="text-base font-medium text-start">Your email can`t be changed as you signed up using your Google account.</h2>
                        </div>
                    </div>
                    <button className="bg-[#EBEEF1] rounded-3xl px-6 py-4 h-[65px] font-semibold mt-6 text-[#4F4F4F]">
                        Save Details
                    </button>                   
                </div>
                
                {/* change password */}
                <div className="w-full gap-10 text-2xl mt-6">
                    <h1 className="text-2xl font-bold">Security and Privacy</h1>
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-8">
                        <h2 className="text-xl font-medium text-start">
                            Change your password
                        </h2>
                        <p className="text-base text-start mt-2">
                            You can change your password by clicking the button below.
                        </p>
                        <button className="rounded-3xl border px-6 py-4 h-[65px] font-semibold mt-6 text-[#4F4F4F] hover:bg-[#EBEEF1]">
                            Change Password
                        </button>
                    </div>
                </div>

                {/*Account management*/}
                <div className="w-full gap-10 text-2xl mt-6">
                    <h1 className="text-2xl font-bold">Account management</h1>
                    <h2 className="text-xl font-medium text-start mt-2">BioLinker you own</h2>
                    <div className="flex flex-row rounded-3xl py-8 px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-8">
                        {/* side bar image */}
                        <div className="border-r border-black pr-6">
                            <img src={avatar} alt="avatar" className="w-[45px] object-cover rounded-full" />
                        </div>

                        {/* side bar content */}
                        <div className="flex flex-1 flex-col">
                            <div className="px-6 py-8 border-b border-black">
                                <h2 className="text-base text-start">{username}</h2>
                            </div>
                            <div className="px-6 py-8 border-b border-black gap-4 text-base text-start font-bold">
                                <h2 className="">Plan</h2>
                                <h2 className="">{plan}</h2>
                            </div>
                            <div className="px-6 py-10 text-center text-base font-bold border-black flex flex-col items-center justify-center">
                                <h2 className="">Upgrade to Pro to unlock more function in BioLinker</h2>
                                <button className="align-center gap-4 justify-center flex flex-row rounded-3xl border px-6 py-4 w-[70%] font-semibold mt-2 text-[#4F4F4F]  bg-gradient-to-r from-green1 to-green2 text-white">
                                    <div className="flex items-center justify-center">
                                    <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                        <path d="M5.49296 14.1061H0.455078L7.50811 0V8.06061H12.546L5.49296 22.1667V14.1061Z" fill="#FBFBFB"/>
                                    </svg>
                                    </div>
                                    <p className="text-base text-white font-semibold">Upgrade to Pro</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* delete account */}
                <div className="w-full gap-10 text-2xl mt-6">       
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-8">
                        <h2 className="text-xl font-medium text-start">
                        Delete forever
                        </h2>
                        <p className="text-base text-start mt-2">
                            Permanently delete your account and all your link-in-bio.
                        </p>
                        <button className="rounded-3xl border border-red-500/80 px-6 py-4 h-[65px] font-semibold mt-6 text-red-500/80 hover:bg-red-500/10">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;