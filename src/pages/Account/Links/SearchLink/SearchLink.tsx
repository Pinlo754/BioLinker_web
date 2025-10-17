import { PLATFORM_ICONS } from "../../../../constants/platformIcons";
import useSearchLink from "./useSearchLink";
type SearchLinkProps = {
    visible: boolean;
    onClose: () => void;
    onAddLink: (platform: string) => void;
}

const SearchLink: React.FC<SearchLinkProps> = ({ visible, onClose, onAddLink }) => {
    if (!visible) return null;
    const { platforms } = useSearchLink();
    return (
        <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-3xl py-2 shadow-xl flex flex-col items-center gap-4 w-full max-w-4xl h-[80vh]">
                <header className="w-full px-8 pt-4 gap-4 items-center flex justify-between h-[4.5rem]">
                    <h2 className=" w-full md:text-xl font-semibold tracking-tight text-start text-gray-900">Thêm link mới</h2>
                    <button className="w-7 h-7 flex items-center justify-center shrink-0 bg-[#F1F0EE] hover:bg-[#E6E5E3] active:bg-[#D7D4CE] rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                        onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-5 text-black text-opacity-[0.55]"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </header>
                <hr className="w-full border-chalk "/>
                {/**thanh tim kiem */}
                {/* <div className="w-[90%] flex items-center pb-5 border-b border-tertiary mx-[3rem]">
                    <form className="flex-1 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 256 256" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-primary"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                        <input type="text" placeholder="Tìm kiếm link" className="w-full h-14 pr-4 pl-12 rounded-2xl bg-[#E6E5E3] text-foreground-primary placeholder:text-foreground-secondary focus:outline-1 focus:outline-[rgba(0,0,0,0.9)] focus:outline-offset-0" />
                    </form>
                </div> */}

                <div className="w-[90%] flex-grow pl-3 overflow-y-auto">
                    <p className="mb-4 text-base font-semibold text-foreground-primary">Những nền tảng đang được hổ trợ</p>
                    <div className="grid grid-cols-1">
                        {platforms.map((platform) => (
                            <div>
                                <button className="rounded-[12px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black antialiased w-full overflow-hidden transition-transform duration-75 relative md:[&:hover_.suggested-link-app-chevron]:text-foreground-primary active:scale-[.98] active:duration-0"
                                    onClick={() => onAddLink(platform)}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <span className="flex items-center justify-center w-[2.75rem] h-[2.75rem] shrink-0 rounded-full overflow-hidden bg-chalk border-[1px] border-solid border-black/5">
                                            {PLATFORM_ICONS[platform] || PLATFORM_ICONS['Link']}
                                        </span>
                                        <div className="flex flex-col items-start h-[3.25rem] flex-1 justify-center overflow-hidden min-w-0">
                                            <p className="text-md text-left truncate w-full text-foreground-primary">
                                                {platform}
                                            </p>
                                            <span className="text-xs text-foreground-secondary text-left truncate w-full">
                                                {platform === "Link" ? "Tạo link trên BioLinker" : `Chia sẻ tài khoản ${platform} của bạn trên BioLinker`}
                                            </span>
                                        </div>
                                        <div className="shrink-0 pr-3">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground-tertiary suggested-link-app-chevron -rotate-90 " role="img" aria-hidden="true"><path fill="currentColor" d="m1.7 4 .36.35L7.71 10l5.64-5.65.36-.35.7.7-.35.36-6 6h-.7l-6-6L1 4.71 1.7 4Z"></path></svg>
                                        </div>
                                    </div>
                                </button>
                                <div className="h-4 flex items-center justify-center">
                                    <hr className="w-full border-chalk"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchLink;