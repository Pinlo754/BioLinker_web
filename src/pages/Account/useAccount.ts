import { useState } from "react";

const useAccount = () => {
    const menuComponent = ["BioLinker", "Thông tin cá nhân", "Nâng cấp", "QR của tôi", 
        // "Hướng dẫn", 
        "Đăng xuất"];
    return {
        menuComponent,
    };
};

export default useAccount;