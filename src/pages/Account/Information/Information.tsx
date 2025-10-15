import { useEffect, useState } from "react";
import useInformation from "./useInformation";
import { LoadingOverlay } from "../../../components/ui/loading";
const Information = () => {

    const { 
        userData, 
        checkUserData, 
        name, 
        setName, 
        email, 
        setEmail, 
        description, 
        setDescription, 
        plan, 
        handleSaveDetails , 
        username, 
        userImage, 
        loading, 
        error,
        fileInputRef,
        handleChangeImage,
    } = useInformation();
    useEffect(() => {
        checkUserData();
    }, []);
    return (
        <div className="w-full flex flex-col gap-4 bg-[#F3F3F1] pb-10 mt-[3vh] h-full overflow-y-auto">
            <div className="max-w-[55%] mx-auto flex flex-col gap-4 w-full font-roboto text-[#4F4F4F] ">
                {loading && <LoadingOverlay visible={loading} message="Saving details..." />}
                {/* personal information */}
                <div className="w-full gap-10 text-2xl mt-6 text-black">
                    <span className="text-2xl font-bold ">Thông tin cá nhân của tôi</span>
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50  shadow-2xl mt-8 bg-white">

                        {/* input field */}
                        <div className="w-full gap-6 flex flex-col px-4">
                            {/* email input field */}
                            <div className="relative">
                                <input
                                    id="email"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-2 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={true}
                                />
                                <label
                                    htmlFor="email"
                                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 transition-all duration-500 origin-left
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-[65%] peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-[70%] peer-[&:not(:placeholder-shown)]:scale-75"
                                >
                                    Email
                                </label>
                            </div>
                            
                            {/* name input field */}
                            <div className="relative mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    placeholder="Tên hiển thị"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label
                                    htmlFor="name"
                                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 transition-all duration-500 origin-left
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-[65%] peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-[70%] peer-[&:not(:placeholder-shown)]:scale-75"
                                >
                                    Tên hiển thị
                                </label>
                            </div>

                            {/* description input field */}
                            <div className="relative mt-2">
                                <input
                                    id="description"
                                    type="text"
                                    className="peer block w-full border-b border-gray-300 bg-transparent pt-4 pb-2 text-base text-gray-900 placeholder-transparent focus:border-green2 focus:border-b focus:ring-green2 focus:outline-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Mô tả về bản thân"
                                />
                                <label
                                    htmlFor="description"
                                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-500 transition-all duration-500 origin-left
                                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                                    peer-focus:top-0 peer-focus:-translate-y-[65%] peer-focus:scale-75 peer-focus:text-green2
                                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-[70%] peer-[&:not(:placeholder-shown)]:scale-75"
                                >
                                    Mô tả về bản thân
                                </label>
                            </div>
                            
                            <span className="text-base font-medium text-start">Email của bạn không thể được thay đổi vì bạn đã đăng ký bằng tài khoản Google.</span>
                        </div>
                    </div>
                    <button className="bg-[#EBEEF1] rounded-3xl px-6 py-4 h-[65px] font-semibold mt-6 text-[#4F4F4F]"
                            onClick={handleSaveDetails}>
                        Lưu thông tin
                    </button>                   
                </div>
                
                {/* change password */}
                <div className="w-full gap-10 text-2xl mt-6">
                    <span className="text-2xl font-bold">Bảo mật và Quyền riêng tư</span>
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-8">
                        <span className="text-xl font-medium text-start">
                            Thay đổi mật khẩu
                        </span>
                        <span className="text-base text-start mt-2">
                            Bạn có thể thay đổi mật khẩu bằng cách nhấn nút bên dưới.
                        </span>
                        <button className="rounded-3xl border px-6 py-4 h-[65px] font-semibold mt-6 text-[#4F4F4F] hover:bg-[#EBEEF1]">
                            Thay đổi mật khẩu
                        </button>
                    </div>
                </div>

                {/*Account management*/}
                <div className="w-full gap-10 text-2xl mt-6">
                    <div className="text-2xl font-bold">Quản lý tài khoản</div>
                    <span className="text-xl font-medium text-start mt-2">BioLinker là tài khoản của bạn</span>
                    <div className="flex flex-row rounded-3xl py-8 px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-8">
                        {/* side bar image */}
                        <button className="border-r border-black pr-6 w-[20%] flex items-start justify-center" onClick={() => fileInputRef.current?.click()}>
                            <img src={userImage} alt="avatar" className="w-20 h-20 object-cover rounded-full" />
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
                        {/* side bar content */}
                        <div className="flex flex-1 flex-col w-[70%]">
                            <div className="px-4 pb-4 border-b border-black items-start ">
                                <span className="text-base text-start">{username}</span>
                            </div>
                            <div className="px-6 py-8 border-b border-black gap-4 text-base text-start font-bold">
                                <div className="">Gói dịch vụ:</div>
                                <span className="text-green2">{plan === "FreeUser" ? "Miễn phí" : "Nâng cao"}</span>
                            </div>
                            <div className="px-6 py-10 text-center text-base font-bold border-black flex flex-col items-center justify-center">
                                <span className="">Nâng cấp lên gói Nâng cao để mở khóa thêm chức năng trong BioLinker</span>
                                <button className="align-center gap-4 justify-center flex flex-row rounded-3xl border px-6 py-4 w-[70%] font-semibold mt-2 text-[#4F4F4F]  bg-gradient-to-r from-green1 to-green2 text-white">
                                    <span className="text-base text-white font-semibold">Upgrade to Pro</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* delete account */}
                <div className="w-full gap-10 text-2xl mt-6">       
                    <div className="flex flex-col rounded-3xl py-8 px-6 shadow-emerald-500/50 bg-white shadow-2xl mt-8">
                        <span className="text-xl font-medium text-start">
                        Xóa tài khoản
                        </span>
                        <span className="text-base text-start mt-2">
                            Xóa tài khoản của bạn và tất cả các liên kết trong BioLinker.
                        </span>
                        <button className="rounded-3xl border border-red-500/80 px-6 py-4 h-[65px] font-semibold mt-6 text-red-500/80 hover:bg-red-500/10">
                            Xóa tài khoản
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;