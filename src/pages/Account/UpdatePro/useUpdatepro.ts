import { fetcherWithParams } from "../../../api/fetchers";
import { useEffect, useState } from "react";
 const useUpdatePro = () => {
    const description = "Chọn gói Biolinker phù hợp nhất với nhu cầu và quy mô doanh nghiệp của bạn — tất cả các gói đều bao gồm tính năng theo dõi liên kết nâng cao và phân tích hiệu suất."
    const plan = [
        {
            title: "Free",
            price: 0,
            description: "Gói cơ bản",
            action: "Đăng kí",
            features: [
                "Mẫu cơ bản dành riêng cho ngành",
                "Tùy chỉnh ảnh đại diện và tiểu sử",
                // "Phân tích cơ bản"
            ]
        },
        {
            title: "Standard",
            price: 49000,
            description: "Lựa chọn tiết kiệm cho cá nhân và doanh nghiệp nhỏ.",
            action: "Đăng kí",
            features: [
                "Tất cả tính năng của gói miễn phí",
                "Tạo mã QR miễn phí",
                "Không bao gồm watermark",
                "Đánh dấu các template miễn phí",
                "Theo dõi và phân tích lượt truy cập",
                //"Gợi ý tiểu sử do AI tạo ra"
            ]
        },
        {
            title: "Premium",
            price: 199000,
            description: "Chọn gói Premium để nâng cấp tính năng và khả năng của bạn.",
            action: "Đăng kí",
            features: [
                "Tất cả tính năng của gói tiêu chuẩn",
                "Thay đổi tên miền miễn phí",
                //"Xuất template miễn phí",
                //"Đăng kí và xem bio của người khác",
                "Đánh dấu tất cả các template",
                "AI phân tích thông số của bio của bạn",
            ]
        }
    ]

    const [userPlan, setUserPlan] = useState("Free");
    const checkUserData = async () => {
      const userId = localStorage.getItem("userId");
      const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
      console.log(user)
      setUserPlan(user?.currentPlanId);
    };
    useEffect(() => {
      checkUserData();
      console.log(userPlan);
    }, []);
  
    const checkPlan = (userPlan: string, title: string) => {
      if (userPlan === "FREE-PLAN" && title === "Free") return "Gói hiện tại";
      else if (userPlan === "PRO-PLAN" && title === "Standard")
        return "Gói hiện tại";
      else if (userPlan === "BUSINESS-PLAN" && title === "Bussiness")
        return "Gói hiện tại";
      else return "Đăng ký"
    };
    return {
      description,
      plan,
      userPlan,
      checkPlan
    };
  };
  export default useUpdatePro;
