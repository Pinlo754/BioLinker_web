import { useState } from "react";

const useAccount = () => {
    const menuComponent = ["BioLinker", "Thông tin cá nhân", "Cài đặt", "QR của tôi", "Hỗ trợ", "Đăng xuất"];
    return {
        menuComponent,
    };
};

export default useAccount;