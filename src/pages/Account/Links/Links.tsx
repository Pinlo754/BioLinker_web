import { LoadingOverlay } from "../../../components/ui/loading";
import useLinks from "./useLinks";
import useInformation from "../Information/useInformation";
import SearchLink from "./SearchLink/SearchLink";
import ErrorOverlay from "../../../components/ui/error";
import { useEffect } from "react";

const Links = () => {
    const { 
        loading, 
        avatar,
        displayName,
        bio,
        domain,
        title,
        setTitle,
        url,
        setUrl,
        editingTitleId,
        editingUrlId,
        toggleEditTitle,
        toggleEditUrl,
        addLinkModal,
        setAddLinkModal,
        handleAddLink,
        error,
        getAllLinks,
        links,
        changeLinkTitle,
        changeLinkUrl,
        changeLinkStatus,
        getUserInfo,
        setLoading,
        image,
    } = useLinks();

    const { 
        fileInputRef,
        handleChangeImage,
    } = useInformation();


    useEffect(() => {
        const render = async () => {
            setLoading(true);
            await getAllLinks();
            await getUserInfo();
            setLoading(false);
        }
        render();
    }, []);
    return (
        <div className="w-full flex flex-col gap-4 bg-[#F3F3F1] py-4 mt-[3vh] h-full overflow-y-auto pb-20">
            <h1 className="text-2xl font-bold ml-6">Links của bạn</h1>
            <div className="max-w-[52%] min-w-min mx-auto flex flex-col gap-4 w-full font-roboto text-[#4F4F4F] ">
                <SearchLink visible={addLinkModal} onClose={() => setAddLinkModal(false)} onAddLink={(platform)=>handleAddLink(platform)}/>
                <LoadingOverlay visible={loading}/>
                <ErrorOverlay visible={error}/>
                {/**personal information */}
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-row gap-4 text-black">
                        {/**personal image */}
                        <button className="w-[11%] h-full self-center" onClick={() => fileInputRef.current?.click()}>
                            <img src={image || avatar} alt="personal image" className="w-[64px] h-[64px] object-cover rounded-full" />
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
                            <p className="text-base text-green1"><a href={`https://links.biolinker.io.vn/${domain}`} className="hover:underline" target="_blank" rel="noopener noreferrer">https://links.biolinker.io.vn/{domain}</a></p>
                            </div>
                    </div>
                    <button className="rounded-3xl border  bg-gradient-to-r from-green1 to-green2 h-[65px] font-semibold mt-2 text-[#ffffff] hover:bg-[#33D08D] "
                        onClick={() => setAddLinkModal(true)}>
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
                <div className="w-full flex flex-col gap-8 mt-10 justify-center ">
                    {/**link item */}
                    {links.map((link) => (
                    <div className="w-[100%] flex flex-1 flex-row gap-4 border rounded-3xl shadow-emerald-500/50 pl-14 shadow-2xl pr-10 py-6 justify-between bg-[#ffffff]" key={link.staticLinkId}>
                        {/**information */}
                        <div className="flex flex-col gap-4 w-[70%]">
                            {/* Title row */}
                            {editingTitleId === link.staticLinkId ? (
                                <input
                                    type="text"
                                    value={title}
                                    placeholder="Tiêu đề"
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={() => { changeLinkTitle(link.staticLinkId, title); toggleEditTitle(null); }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') { changeLinkTitle(link.staticLinkId, title); toggleEditTitle(null); }
                                        if (e.key === 'Escape') { toggleEditTitle(null); }
                                    }}
                                    autoFocus
                                    className="text-black text-base max-w-full w-full whitespace-nowrap border-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent p-0 overflow-hidden font-semibold"
                                />
                            ) : (
                                <button
                                    className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2 focus-visible:outline"
                                    onClick={() => toggleEditTitle(link.staticLinkId, link.title)}
                                >
                                   <p className="text-black text-base max-w-full whitespace-nowrap font-semibold text-concrete text-ellipsis overflow-hidden">
                                        {link.title !== "" ? link.title : "Tiêu đề"}
                                    </p>
                                    <span className="flex  ml-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  role="img" aria-hidden="true"><path fill-rule="evenodd" d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z" fill="currentColor"></path></svg>
                                    </span>
                                </button>
                            )}

                            {/* URL row */}
                            {editingUrlId === link.staticLinkId ? (
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onBlur={() => { changeLinkUrl(link.staticLinkId, url); toggleEditUrl(null); }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') { changeLinkUrl(link.staticLinkId, url); toggleEditUrl(null); }
                                        if (e.key === 'Escape') { toggleEditUrl(null); }
                                    }}
                                    placeholder="URL"
                                    autoFocus
                                    className=" text-black text-base max-w-full w-full whitespace-nowrap border-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent p-0 overflow-hidden"
                                />
                            ) : (
                                <button
                                    className="flex items-center max-w-full rounded-[2px] outline-offset-2 outline-2 focus-visible:outline"
                                    onClick={() => toggleEditUrl(link.staticLinkId, link.defaultUrl)}
                                >
                                   <p className="text-black text-base max-w-full whitespace-nowrap text-ellipsis overflow-hidden">
                                        {link.defaultUrl === "" ? "URL" : link.defaultUrl}
                                    </p>
                                    <span className="flex  ml-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"  role="img" aria-hidden="true"><path fill-rule="evenodd" d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z" fill="currentColor"></path></svg>
                                    </span>
                                </button>
                            )}
                            {/* <div className="bg-[#BF000B] w-[50%] rounded-[2px] relative p-1">
                                <div className="absolute w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-[#BF000B] bottom-full"></div>
                                <p className="text-black text-xs text-white font-semibold">Vui lòng nhập đúng định dạng URL</p>
                            </div> */}
                        </div>
                        {/**button */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-4">
                                {/* Upload Icon */}
                                <button className="flex items-center justify-center w-10 h-10 rounded-lg  hover:border-gray-400 transition-colors duration-200">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                                        <path fill="currentColor" d="m10.65 3.85.35.36.7-.71-.35-.35-3-3h-.7l-3 3-.36.35.71.7.35-.35L7.5 1.71V10h1V1.7l2.15 2.15ZM1 5.5l.5-.5H4v1H2v9h12V6h-2V5h2.5l.5.5v10l-.5.5h-13l-.5-.5v-10Z"></path>
                                    </svg>
                                </button>
                                
                                {/* Toggle Switch */}
                                <div className="flex items-center gap-2">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={link.status === "public"} onChange={(e) => changeLinkStatus(link.staticLinkId, e.target.checked ? "public" : "private")}/>
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016E1A]">
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="self-end pr-2 pb-2">
                                <button>
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fill-rule="evenodd" d="m6.83 0-.35.15-1.33 1.33-.15.35V3H0v1h2v11.5l.5.5h11l.5-.5V4h2V3h-5V1.83l-.15-.35L9.52.15 9.17 0H6.83ZM10 3v-.96L8.96 1H7.04L6 2.04V3h4ZM5 4H3v11h10V4H5Zm2 3v5H6V7h1Zm3 .5V7H9v5h1V7.5Z" fill="currentColor"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Links;