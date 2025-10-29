import { fetcherWithParams, postData } from "../../../api/fetchers";
import { useEffect, useState } from "react";
const useUpdatePro = () => {
  const description =
    "Chọn gói Biolinker phù hợp nhất với nhu cầu và quy mô doanh nghiệp của bạn — tất cả các gói đều bao gồm tính năng theo dõi liên kết nâng cao và phân tích hiệu suất.";
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
      ],
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
      ],
    },
    {
      title: "Bussiness",
      price: 199000,
      description:
        "Chọn gói Bussiness để nâng cấp tính năng và khả năng của bạn.",
      action: "Đăng kí",
      features: [
        "Tất cả tính năng của gói tiêu chuẩn",
        "Thay đổi tên miền miễn phí",
        //"Xuất template miễn phí",
        //"Đăng kí và xem bio của người khác",
        "Đánh dấu tất cả các template",
        "AI phân tích thông số của bio của bạn",
      ],
    },
  ];

  const [userPlan, setUserPlan] = useState("Free");
  const checkUserData = async () => {
    const userId = localStorage.getItem("userId");
    const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
    console.log(user);
    setUserPlan(user?.currentPlanId);
  };
  useEffect(() => {
    checkUserData();
    console.log(userPlan);
  }, []);

  const planOrder = {
    Free: 1,
    Standard: 2,
    Bussiness: 3,
  };

  const checkPlan = (userPlan: string, title: string) => {
    if (userPlan === "FREE-PLAN" && title === "Free") return "Gói hiện tại";
    else if (userPlan === "PRO-PLAN" && title === "Standard")
      return "Gói hiện tại";
    else if (userPlan === "BUSINESS-PLAN" && title === "Bussiness")
      return "Gói hiện tại";
    else return "Đăng ký";
  };

  const canClick = (userPlan: string, title: string) => {
  const userLevel =
    userPlan === "FREE-PLAN"
      ? planOrder["Free"]
      : userPlan === "PRO-PLAN"
      ? planOrder["Standard"]
      : userPlan === "BUSINESS-PLAN"
      ? planOrder["Bussiness"]
      : 0;

  const currentLevel = planOrder[title as keyof typeof planOrder];

  // Nếu gói hiện tại hoặc gói nhỏ hơn → không cho click
  if (currentLevel <= userLevel) return false;
  return true;
};

  const handleRegisterPlan = (title: string) => {
    const userId = localStorage.getItem("userId");
    const res = postData("https://biolinker.onrender.com/api/PayOS/create", {
      amount: title === "Standard" ? 19000 : 199000,
      description:
        title === "Standard"
          ? "Standard Plan Biolinker"
          : "Premium Plan Biolinker",
      userId: userId,
      planId: title === "Standard" ? "PRO-PLAN" : "BUSINESS-PLAN",
      itemName:
        title === "Standard"
          ? "Standard Plan Biolinker"
          : "Premium Plan Biolinker",
    })
      .then((data) => {
        if (data && data.paymentLink) {
          window.location.href = data.paymentLink;
        } else {
          alert("Đăng ký thất bại, vui lòng thử lại sau!");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi đăng ký gói:", error);
        alert("Đăng ký thất bại, vui lòng thử lại sau!");
      });
  };

  return {
    description,
    plan,
    userPlan,
    checkPlan,
    handleRegisterPlan,
    canClick
  };
};
export default useUpdatePro;
