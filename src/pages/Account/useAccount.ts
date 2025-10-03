import { useState } from "react";

const useAccount = () => {
    const menuComponent = ["BioLinker", "Personal Information", "Setting", "My QR", "Support", "Logout"];
    return {
        menuComponent,
    };
};

export default useAccount;