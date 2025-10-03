import { useState } from "react";

const Information = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div className="w-full flex flex-col gap-4 mt-[3px] bg-white h-full">
            <div className="max-w-[50%] mx-auto flex flex-col gap-4 w-full font-roboto">
                <div className="w-full gap-10 text-2xl mt-6">
                    <h1 className="text-2xl font-bold">BioLinker you own</h1>
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50  shadow-2xl mt-8">

                        {/* input field */}
                        <div className="w-full gap-6 flex flex-col px-4">
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

                            {/* email input field */}
                            <div className="relative">
                                <input
                                    id="email"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    value={email}
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

                            {/* description input field */}
                            <div className="relative">
                                <input
                                    id="description"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
                    <button className="bg-[#f2f2f2] rounded-3xl px-4 py-2 w-[22%] h-[65px] font-semibold mt-6">
                        Save Details
                    </button>                   
                </div>
               
            </div>
        </div>
    );
};

export default Information;