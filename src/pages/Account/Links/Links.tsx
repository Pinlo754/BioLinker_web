import { LoadingOverlay } from "../../../components/ui/loading";
import useLinks from "./useLinks";
import useInformation from "../Information/useInformation";
import { Line } from "recharts";

const Links = () => {
    const { 
        loading, 
        avatar,
        displayName,
        bio,
        domain,
    } = useLinks();
    const { 
        fileInputRef,
        handleChangeImage,
    } = useInformation();
    return (
        <div className="w-full flex flex-col gap-4 bg-[#F3F3F1] pb-10 mt-[3vh] h-full">
            <h1 className="text-2xl font-bold ml-6">Links của bạn</h1>
            <div className="max-w-[52%] mx-auto flex flex-col gap-4 w-full font-roboto text-[#4F4F4F]">
                <LoadingOverlay visible={loading}/>
                {/**personal information */}
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-row gap-4 text-black">
                        {/**personal image */}
                        <button className="min-w-[64px]  max-w-[64px] self-center" onClick={() => fileInputRef.current?.click()}>
                            <img src={avatar} alt="personal image" className="w-full object-cover" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleChangeImage(file);
                                }
                            }}
                        />
                        <div className="flex flex-col gap-2 ">
                            <p className="text-base font-bold">{displayName}</p>
                            <p className="text-base">{bio}</p>
                            <p className="text-base">{domain}</p>
                        </div>
                    </div>
                    <button className="rounded-3xl border  bg-gradient-to-r from-green1 to-green2 h-[65px] font-semibold mt-2 text-[#ffffff] hover:bg-[#33D08D] ">
                        <span className="flex items-center justify-center gap-2">
                            <span className="icon block pr-xs">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                                    <path d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z" fill="currentColor">
                                    </path>
                                </svg>
                            </span>
                            <span className="text-base label block font-semibold">Thêm link mới</span>
                        </span>
                    </button>
                </div>

                {/**link list */}
                <div className="w-full flex flex- gap-4 mt-10">
                    <div className="w-full flex flex-row gap-4 border rounded-3xl shadow-emerald-500/50 pl-14 shadow-2xl pr-10 py-10 justify-between bg-[#ffffff]">
                        {/**information */}
                        <div className="flex flex-col gap-4">
                            <button className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2 focus-visible:outline">
                               <p className="text-black text-sm max-w-full whitespace-nowrap font-semibold text-concrete text-ellipsis overflow-hidden">
                                Tiêu đề
                                </p>                                    
                                <span className="flex  ml-2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  role="img" aria-hidden="true"><path fill-rule="evenodd" d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                            </button>
                            <button className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2 focus-visible:outline">
                               <p className="text-black text-sm max-w-full whitespace-nowrap font-semibold text-concrete text-ellipsis overflow-hidden">
                                URL
                                </p>                                    
                                <span className="flex  ml-2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  role="img" aria-hidden="true"><path fill-rule="evenodd" d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <Line/>
                        {/**button */}
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <p>share</p>
                                <p>open</p>
                            </div>
                            <div className="self-end">
                            <p>y</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Links;