import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const useGetStarted = () => {
    const navigate = useNavigate(); 
    const { username, email, password } = useLocation().state || {};
    const options = [
        {
          title: "Nghệ sĩ",
          description:
            "Trưng bày nghệ thuật, tăng độ phủ sóng, và kết nối với khách hàng hoặc khách hàng.",
        },
        {
          title: "Lập trình viên",
          description:
            "Trưng bày dự án, quản lý phân phối nội dung, và tìm các cách mới để kết nối với khách hàng và đối tác.",
        },
        {
          title: "Nhà sản xuất âm nhạc",
          description:
            "Trưng bày dịch vụ, thu hút khách hàng mới, và quản lý sự hiện diện trực tuyến của tôi trong một liên kết dễ chia sẻ.",
        },
        {
          title: "Nhà sáng tạo nội dung",
          description:
            "Xây dựng và tương tác với khách hàng trong khi khai phá các công cụ mới để chia sẻ nội dung, phát triển thương hiệu của tôi, và tạo ra thu nhập từ công việc sáng tạo.",
        },
        {
          title: "Chủ doanh nghiệp",
          description:
            "Thúc đẩy doanh nghiệp, chia sẻ đến các nền tảng quan trọng, và mở rộng phạm vi nhận diện của thương hiệu.",
        },
        {
          title: "Cá nhân",
          description:
            "Chia sẻ mọi thứ quan trọng — từ mậng xã hội đến sở thích — tất cả trong một liên kết đơn giản, cá nhân hóa.",
        },
      ];

    const handleBack = () => {
      navigate('/signup')
    }

    const handleContinue = (choose: string) => {
      navigate('/signup/add-domain', { 
        state: { 
            username: username,
            job: choose,
            email: email, password: password
          } 
      });
    }

    const handleSkip = () => {
      navigate('/signup/add-domain', { 
        state: { 
          username: username,
          job: "",
          email: email, password: password
        } 
      });
    }
  
    return {
        options,
        handleBack,
        handleContinue,
        handleSkip,
    }
}
export default useGetStarted;